import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Award, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface EnrollmentRow {
  id: string;
  course_id: string;
  status: string;
  enrolled_at: string;
  completed_at: string | null;
  courses: { title: string; slug: string | null; level: string | null; total_lessons: number | null } | null;
}

interface CertRow {
  id: string;
  course_id: string;
  certificate_number: string;
  issued_at: string | null;
}

async function fetchEnrollments(userId: string) {
  const { data, error } = await supabase
    .from("enrollments")
    .select("id,course_id,status,enrolled_at,completed_at,courses:course_id(title,slug,level,total_lessons)")
    .eq("user_id", userId)
    .order("enrolled_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as EnrollmentRow[];
}

async function fetchProgress(userId: string) {
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("course_id,completed")
    .eq("user_id", userId);
  if (error) throw error;
  const map = new Map<string, { done: number; total: number }>();
  (data ?? []).forEach((r: any) => {
    if (!r.course_id) return;
    const entry = map.get(r.course_id) ?? { done: 0, total: 0 };
    entry.total += 1;
    if (r.completed) entry.done += 1;
    map.set(r.course_id, entry);
  });
  return map;
}

async function fetchCerts(userId: string) {
  const { data, error } = await supabase
    .from("certificates")
    .select("id,course_id,certificate_number,issued_at")
    .eq("user_id", userId)
    .order("issued_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as CertRow[];
}

const Campus = () => {
  const { user, profile, loading } = useAuth();

  const { data: enrollments = [], isLoading: lE, error: eE } = useQuery({
    queryKey: ["campus-enrollments", user?.id],
    queryFn: () => fetchEnrollments(user!.id),
    enabled: !!user?.id,
  });

  const { data: progressMap } = useQuery({
    queryKey: ["campus-progress", user?.id],
    queryFn: () => fetchProgress(user!.id),
    enabled: !!user?.id,
  });

  const { data: certs = [] } = useQuery({
    queryKey: ["campus-certs", user?.id],
    queryFn: () => fetchCerts(user!.id),
    enabled: !!user?.id,
  });

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Cargando campus…</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md p-8 text-center space-y-4">
          <GraduationCap className="w-12 h-12 text-primary mx-auto" />
          <h1 className="font-display text-2xl font-bold">Inicia sesión para entrar al Campus</h1>
          <p className="text-muted-foreground">El Campus Virtual UTAMV está disponible para estudiantes registrados.</p>
          <Button asChild><Link to="/auth">Ir a autenticación</Link></Button>
        </Card>
      </div>
    );
  }

  const certByCourse = new Map(certs.map((c) => [c.course_id, c]));

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl space-y-10">
        <header>
          <h1 className="font-display text-4xl font-bold flex items-center gap-3">
            <GraduationCap className="w-9 h-9 text-primary" /> Campus UTAMV
          </h1>
          <p className="text-muted-foreground mt-2">
            Bienvenido{profile?.display_name ? `, ${profile.display_name}` : profile?.full_name ? `, ${profile.full_name}` : ""}.
            Aquí están tus programas activos, tu avance y tus certificaciones.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" /> Tus programas
          </h2>

          {lE && <p className="text-muted-foreground">Cargando tus cursos…</p>}
          {eE && <Card className="p-4 border-destructive/50"><p className="text-destructive text-sm">No se pudieron cargar las inscripciones.</p></Card>}

          {!lE && enrollments.length === 0 && (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground mb-4">Aún no estás inscrito en ningún programa.</p>
              <Button asChild variant="outline"><Link to="/catalogo">Ver catálogo</Link></Button>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {enrollments.map((e) => {
              const p = progressMap?.get(e.course_id);
              const total = p?.total ?? e.courses?.total_lessons ?? 0;
              const pct = p && p.total > 0 ? Math.round((p.done / p.total) * 100) : 0;
              const cert = certByCourse.get(e.course_id);
              return (
                <Card key={e.id} className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-lg">{e.courses?.title ?? "Curso"}</h3>
                      <p className="text-xs text-muted-foreground">Nivel: {e.courses?.level ?? "—"} · {total} lecciones</p>
                    </div>
                    {cert && <Badge variant="secondary" className="gap-1"><Award className="w-3 h-3" /> Certificado</Badge>}
                  </div>
                  <Progress value={pct} />
                  <p className="text-xs text-muted-foreground">Avance: {pct}%</p>
                  {e.courses?.slug && (
                    <Button asChild size="sm" variant="outline" className="w-full">
                      <Link to={`/programas/${e.courses.slug}`}>Ir al programa <ArrowRight className="w-4 h-4 ml-1" /></Link>
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" /> Certificados emitidos
          </h2>
          {certs.length === 0 ? (
            <Card className="p-6 text-center text-muted-foreground">Aún no tienes certificados emitidos.</Card>
          ) : (
            <Card className="divide-y">
              {certs.map((c) => (
                <div key={c.id} className="p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">N.º {c.certificate_number}</p>
                    <p className="text-xs text-muted-foreground">{c.issued_at ? new Date(c.issued_at).toLocaleDateString() : ""}</p>
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link to={`/verificar-certificado/${c.id}`}>Verificar</Link>
                  </Button>
                </div>
              ))}
            </Card>
          )}
        </section>
      </div>
    </div>
  );
};

export default Campus;
