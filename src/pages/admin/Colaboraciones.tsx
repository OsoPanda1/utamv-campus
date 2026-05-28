import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Inbox, Search, Filter, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type TicketStatus =
  | "pending"
  | "in_review"
  | "contacted"
  | "accepted"
  | "rejected"
  | "closed";
type TicketPriority = "low" | "normal" | "high" | "urgent";

interface Ticket {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  status: TicketStatus;
  priority: TicketPriority;
  admin_notes: string | null;
  created_at: string;
  updated_at: string | null;
}

const STATUS_LABELS: Record<TicketStatus, string> = {
  pending: "Pendiente",
  in_review: "En revisión",
  contacted: "Contactado",
  accepted: "Aceptado",
  rejected: "Rechazado",
  closed: "Cerrado",
};

const STATUS_VARIANTS: Record<
  TicketStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  pending: "secondary",
  in_review: "outline",
  contacted: "outline",
  accepted: "default",
  rejected: "destructive",
  closed: "secondary",
};

const PRIORITY_LABELS: Record<TicketPriority, string> = {
  low: "Baja",
  normal: "Normal",
  high: "Alta",
  urgent: "Urgente",
};

const PRIORITY_COLORS: Record<TicketPriority, string> = {
  low: "bg-muted text-muted-foreground",
  normal: "bg-primary/10 text-primary",
  high: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  urgent: "bg-destructive/15 text-destructive",
};

async function fetchTickets(): Promise<Ticket[]> {
  const { data, error } = await supabase
    .from("support_tickets")
    .select("id,user_id,subject,message,status,priority,admin_notes,created_at,updated_at")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw error;
  return (data ?? []) as unknown as Ticket[];
}

const Colaboraciones = () => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | "all">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [draftNotes, setDraftNotes] = useState("");

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["admin-support-tickets"],
    queryFn: fetchTickets,
  });

  const updateTicket = useMutation({
    mutationFn: async (patch: { id: string; status?: TicketStatus; priority?: TicketPriority; admin_notes?: string }) => {
      const { id, ...fields } = patch;
      const { error } = await supabase
        .from("support_tickets")
        .update(fields)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-support-tickets"] });
      toast.success("Solicitud actualizada");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const filtered = useMemo(() => {
    return tickets.filter((t) => {
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !t.subject.toLowerCase().includes(q) &&
          !t.message.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [tickets, statusFilter, priorityFilter, search]);

  const stats = useMemo(() => {
    return {
      total: tickets.length,
      pending: tickets.filter((t) => t.status === "pending").length,
      inReview: tickets.filter((t) => t.status === "in_review").length,
      urgent: tickets.filter((t) => t.priority === "urgent").length,
    };
  }, [tickets]);

  const openTicket = (t: Ticket) => {
    setSelected(t);
    setDraftNotes(t.admin_notes ?? "");
  };

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4 max-w-7xl space-y-8">
        <header>
          <h1 className="font-display text-4xl font-bold flex items-center gap-3">
            <Inbox className="w-9 h-9 text-primary" /> Colaboraciones y Solicitudes
          </h1>
          <p className="text-muted-foreground mt-2">
            Gestión de candidaturas recibidas desde <code>/colabora</code> y
            tickets de soporte institucional.
          </p>
        </header>

        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-5">
            <p className="text-xs uppercase text-muted-foreground">Total</p>
            <p className="text-3xl font-bold mt-2">{stats.total}</p>
          </Card>
          <Card className="p-5">
            <p className="text-xs uppercase text-muted-foreground">Pendientes</p>
            <p className="text-3xl font-bold mt-2 text-primary">{stats.pending}</p>
          </Card>
          <Card className="p-5">
            <p className="text-xs uppercase text-muted-foreground">En revisión</p>
            <p className="text-3xl font-bold mt-2">{stats.inReview}</p>
          </Card>
          <Card className="p-5">
            <p className="text-xs uppercase text-muted-foreground">Urgentes</p>
            <p className="text-3xl font-bold mt-2 text-destructive">{stats.urgent}</p>
          </Card>
        </div>

        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por asunto o mensaje…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as TicketStatus | "all")}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                {Object.entries(STATUS_LABELS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={(v) => setPriorityFilter(v as TicketPriority | "all")}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las prioridades</SelectItem>
                {Object.entries(PRIORITY_LABELS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        <Card className="overflow-hidden">
          {isLoading && <p className="p-6 text-muted-foreground">Cargando solicitudes…</p>}
          {!isLoading && filtered.length === 0 && (
            <p className="p-6 text-muted-foreground">No hay solicitudes que coincidan.</p>
          )}
          {filtered.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Asunto</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t) => (
                  <TableRow key={t.id} className="cursor-pointer" onClick={() => openTicket(t)}>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(t.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <p className="font-medium line-clamp-1">{t.subject}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{t.message}</p>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${PRIORITY_COLORS[t.priority]}`}>
                        {PRIORITY_LABELS[t.priority]}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANTS[t.status]}>{STATUS_LABELS[t.status]}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openTicket(t); }}>
                        Abrir <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selected.subject}</DialogTitle>
                <DialogDescription className="text-xs">
                  Recibido el {new Date(selected.created_at).toLocaleString()} · ID: {selected.id.slice(0, 8)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 mt-4">
                <div>
                  <p className="text-xs uppercase text-muted-foreground mb-2">Mensaje</p>
                  <div className="bg-muted/40 p-4 rounded-lg whitespace-pre-wrap text-sm">
                    {selected.message}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground mb-2">Estado</p>
                    <Select
                      value={selected.status}
                      onValueChange={(v) => {
                        const status = v as TicketStatus;
                        setSelected({ ...selected, status });
                        updateTicket.mutate({ id: selected.id, status });
                      }}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(STATUS_LABELS).map(([k, v]) => (
                          <SelectItem key={k} value={k}>{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground mb-2">Prioridad</p>
                    <Select
                      value={selected.priority}
                      onValueChange={(v) => {
                        const priority = v as TicketPriority;
                        setSelected({ ...selected, priority });
                        updateTicket.mutate({ id: selected.id, priority });
                      }}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(PRIORITY_LABELS).map(([k, v]) => (
                          <SelectItem key={k} value={k}>{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase text-muted-foreground mb-2">Notas internas</p>
                  <Textarea
                    value={draftNotes}
                    onChange={(e) => setDraftNotes(e.target.value)}
                    placeholder="Notas internas para el equipo (no visibles al candidato)…"
                    rows={5}
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        updateTicket.mutate(
                          { id: selected.id, admin_notes: draftNotes },
                          { onSuccess: () => setSelected({ ...selected, admin_notes: draftNotes }) },
                        )
                      }
                      disabled={draftNotes === (selected.admin_notes ?? "")}
                    >
                      Guardar notas
                    </Button>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground border-t pt-3">
                  Usuario: <code>{selected.user_id}</code>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Colaboraciones;
