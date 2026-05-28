import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShieldCheck, Users, BookOpen, FileCheck2, UploadCloud, Database, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { doiUrl, invokeScholarlyIntegration, type AcademicPublicationStatus } from "@/lib/scholarly";

interface AdminEnrollment {
  id: string;
  enrolled_at: string;
  status: string;
  user_id: string;
  course_id: string;
  completed_at: string | null;
  amount_paid_mxn: number | null;
  courses: { title: string; level: string | null } | null;
}

interface AdminCourse {
  id: string;
  title: string;
  slug: string | null;
  level: string | null;
  zenodo_record_id: string | null;
  zenodo_doi: string | null;
  figshare_article_id: string | null;
  figshare_doi: string | null;
  openaire_project_id: string | null;
  openaire_badge_url: string | null;
  academic_publication_status: AcademicPublicationStatus;
  academic_publication_notes: string | null;
}

async function fetchAdminEnrollments() {
  const { data, error } = await supabase
    .from("enrollments")
    .select("id,enrolled_at,status,user_id,course_id,completed_at,amount_paid_mxn,courses:course_id(title,level)")
    .order("enrolled_at", { ascending: false })
    .limit(200);
  if (error) throw error;
  return (data ?? []) as unknown as AdminEnrollment[];
}

async function fetchAdminCourses() {
  const { data, error } = await (supabase as any)
    .from("courses")
    .select("id,title,slug,level,zenodo_record_id,zenodo_doi,figshare_article_id,figshare_doi,openaire_project_id,openaire_badge_url,academic_publication_status,academic_publication_notes")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data ?? []) as AdminCourse[];
}

async function fetchProfileMap(userIds: string[]) {
  if (userIds.length === 0) return new Map<string, { display_name: string | null; email: string | null }>();
  const { data, error } = await supabase
    .from("profiles")
    .select("user_id,display_name,full_name,email")
    .in("user_id", userIds);
  if (error) throw error;
  const m = new Map<string, { display_name: string | null; email: string | null }>();
  (data ?? []).forEach((p: any) => m.set(p.user_id, { display_name: p.display_name ?? p.full_name, email: p.email }));
  return m;
}

const ControlEscolar = () => {
  const { user, profile, isAdmin, loading } = useAuth();
  const queryClient = useQueryClient();
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [publicationNotes, setPublicationNotes] = useState("Curso auditado por Control Escolar y listo para depósito académico.");
  const [openaireProjectId, setOpenaireProjectId] = useState("utamv-campus");

  const { data: enrollments = [], isLoading, error } = useQuery({
    queryKey: ["control-escolar-enrollments"],
    queryFn: fetchAdminEnrollments,
    enabled: isAdmin,
  });

  const userIds = Array.from(new Set(enrollments.map((e) => e.user_id)));
  const { data: profileMap } = useQuery({
    queryKey: ["control-escolar-profiles", userIds],
    queryFn: () => fetchProfileMap(userIds),
    enabled: isAdmin && userIds.length > 0,
  });

  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ["control-escolar-academic-courses"],
    queryFn: fetchAdminCourses,
    enabled: isAdmin,
  });

  const selectedCourse = useMemo(
    () => courses.find((course) => course.id === selectedCourseId) ?? courses[0],
    [courses, selectedCourseId],
  );

  const academicMutation = useMutation({
    mutationFn: async (body: Record<string, unknown>) => invokeScholarlyIntegration(body),
    onSuccess: () => {
      toast.success("Pipeline académico actualizado");
      queryClient.invalidateQueries({ queryKey: ["control-escolar-academic-courses"] });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "No se pudo ejecutar la integración académica"),
  });

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Cargando…</div>;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md p-8 text-center space-y-3">
          <ShieldCheck className="w-12 h-12 text-primary mx-auto" />
          <h1 className="font-display text-2xl font-bold">Acceso restringido</h1>
          <p className="text-muted-foreground">Control Escolar está limitado a personal autorizado. Contacta a rectoría si necesitas acceso.</p>
        </Card>
      </div>
    );
  }

  const total = enrollments.length;
  const completed = enrollments.filter((e) => e.completed_at).length;
  const revenue = enrollments.reduce((s, e) => s + Number(e.amount_paid_mxn ?? 0), 0);
  const publishedCourses = courses.filter((course) => course.academic_publication_status === "published" || course.zenodo_doi || course.figshare_doi).length;

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4 max-w-7xl space-y-8">
        <header>
          <h1 className="font-display text-4xl font-bold flex items-center gap-3">
            <ShieldCheck className="w-9 h-9 text-primary" /> Control Escolar
          </h1>
          <p className="text-muted-foreground mt-2">
            Vista operativa de inscripciones, progreso académico y certificación.
            {profile?.display_name && <span className="ml-2">· Sesión: {profile.display_name}</span>}
          </p>
        </header>

        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-5"><p className="text-xs uppercase text-muted-foreground">Inscripciones</p><p className="text-3xl font-bold mt-2 flex items-center gap-2"><Users className="w-6 h-6 text-primary" /> {total}</p></Card>
          <Card className="p-5"><p className="text-xs uppercase text-muted-foreground">Completados</p><p className="text-3xl font-bold mt-2 flex items-center gap-2"><BookOpen className="w-6 h-6 text-primary" /> {completed}</p></Card>
          <Card className="p-5"><p className="text-xs uppercase text-muted-foreground">Ingresos MXN</p><p className="text-3xl font-bold mt-2">${revenue.toLocaleString()}</p></Card>
          <Card className="p-5"><p className="text-xs uppercase text-muted-foreground">Publicación académica</p><p className="text-3xl font-bold mt-2 flex items-center gap-2"><FileCheck2 className="w-6 h-6 text-primary" /> {publishedCourses}</p></Card>
        </div>

        <Card className="p-5 space-y-5">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold">Pipeline académico internacional</h2>
              <p className="text-sm text-muted-foreground mt-1">ORCID, Zenodo, Figshare, ISNI y OpenAIRE operan desde backend con Secrets; el cliente solo ejecuta operaciones de alto nivel.</p>
            </div>
            <Badge variant="outline" className="w-fit">Producción controlada</Badge>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">Programa</label>
                <Select value={selectedCourse?.id ?? ""} onValueChange={setSelectedCourseId} disabled={coursesLoading || courses.length === 0}>
                  <SelectTrigger className="mt-2"><SelectValue placeholder="Seleccionar programa" /></SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">Notas de revisión</label>
                <Textarea value={publicationNotes} onChange={(event) => setPublicationNotes(event.target.value)} className="mt-2" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">OpenAIRE Project ID</label>
                <Input value={openaireProjectId} onChange={(event) => setOpenaireProjectId(event.target.value)} className="mt-2" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button disabled={!selectedCourse || academicMutation.isPending} onClick={() => academicMutation.mutate({ operation: "prepare_course", courseId: selectedCourse?.id, notes: publicationNotes })}>
                  <FileCheck2 className="w-4 h-4 mr-2" /> Listo para publicación académica
                </Button>
                <Button variant="outline" disabled={!selectedCourse || academicMutation.isPending} onClick={() => academicMutation.mutate({ operation: "publish_zenodo", courseId: selectedCourse?.id, publish: false })}>
                  <UploadCloud className="w-4 h-4 mr-2" /> Publicar en Zenodo sandbox
                </Button>
                <Button variant="outline" disabled={!selectedCourse || academicMutation.isPending} onClick={() => academicMutation.mutate({ operation: "sync_figshare", courseId: selectedCourse?.id })}>
                  <Database className="w-4 h-4 mr-2" /> Sincronizar Figshare
                </Button>
                <Button variant="ghost" disabled={!selectedCourse || !openaireProjectId || academicMutation.isPending} onClick={() => academicMutation.mutate({ operation: "link_openaire", courseId: selectedCourse?.id, projectId: openaireProjectId })}>
                  Vincular OpenAIRE
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
              <p className="text-xs uppercase text-muted-foreground">Estado del programa</p>
              <h3 className="font-display text-lg font-semibold">{selectedCourse?.title ?? "Sin programa"}</h3>
              <Badge variant={selectedCourse?.academic_publication_status === "published" ? "default" : "secondary"}>{selectedCourse?.academic_publication_status ?? "draft"}</Badge>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Zenodo record: <span className="text-foreground">{selectedCourse?.zenodo_record_id ?? "—"}</span></p>
                <p>Figshare article: <span className="text-foreground">{selectedCourse?.figshare_article_id ?? "—"}</span></p>
                <p>OpenAIRE: <span className="text-foreground">{selectedCourse?.openaire_project_id ?? "—"}</span></p>
                {selectedCourse?.zenodo_doi && <a className="inline-flex items-center gap-1 text-primary hover:underline" href={doiUrl(selectedCourse.zenodo_doi)} target="_blank" rel="noreferrer">DOI Zenodo <ExternalLink className="w-3 h-3" /></a>}
                {selectedCourse?.figshare_doi && <a className="inline-flex items-center gap-1 text-primary hover:underline" href={doiUrl(selectedCourse.figshare_doi)} target="_blank" rel="noreferrer">DOI Figshare <ExternalLink className="w-3 h-3" /></a>}
              </div>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="font-display text-xl font-semibold">Inscripciones recientes</h2>
          </div>
          {isLoading && <p className="p-5 text-muted-foreground">Cargando datos…</p>}
          {error && <p className="p-5 text-destructive">No se pudo cargar la información.</p>}
          {!isLoading && enrollments.length === 0 && !error && <p className="p-5 text-muted-foreground">No hay inscripciones registradas.</p>}
          {enrollments.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Programa</TableHead>
                  <TableHead>Nivel</TableHead>
                  <TableHead>Estatus</TableHead>
                  <TableHead className="text-right">Pago MXN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrollments.map((row) => {
                  const p = profileMap?.get(row.user_id);
                  return (
                    <TableRow key={row.id}>
                      <TableCell className="text-xs">{new Date(row.enrolled_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <p className="font-medium">{p?.display_name ?? "Estudiante"}</p>
                        <p className="text-xs text-muted-foreground">{p?.email ?? row.user_id.slice(0, 8)}</p>
                      </TableCell>
                      <TableCell>{row.courses?.title ?? "—"}</TableCell>
                      <TableCell><Badge variant="outline">{row.courses?.level ?? "N/A"}</Badge></TableCell>
                      <TableCell>
                        {row.completed_at ? <Badge variant="default">Completado</Badge> : <Badge variant="secondary">{row.status}</Badge>}
                      </TableCell>
                      <TableCell className="text-right">${Number(row.amount_paid_mxn ?? 0).toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ControlEscolar;
