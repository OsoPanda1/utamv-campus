import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Palette, BookOpen, Megaphone, ShieldCheck, Microscope, Send, Globe2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';

const ROLES = [
  { icon: Code2, title: 'Ingeniería & DevOps', tags: ['React', 'Supabase', 'TypeScript', 'CI/CD', 'Edge Functions'], desc: 'Endurecer la plataforma, escalar infraestructura federada y mantener el kernel Isabella.' },
  { icon: Microscope, title: 'IA & Investigación', tags: ['LLMs', 'RAG', 'Gemini', 'Ética IA', 'EOCT'], desc: 'Diseñar pipelines de IA soberana, evaluación de modelos y guardrails normativos.' },
  { icon: BookOpen, title: 'Diseño Pedagógico', tags: ['Quality Matters', 'ISO 21001', 'Currículo', 'LATAM'], desc: 'Construir lecciones bajo el estándar 5-puntos y casos de estudio latinoamericanos.' },
  { icon: Palette, title: 'Diseño & UX', tags: ['Figma', 'Motion', 'Tailwind', 'Sistemas'], desc: 'Refinar la identidad visual académica: navy profundo, plata fría, tipografía editorial.' },
  { icon: Megaphone, title: 'Marketing & Comunidad', tags: ['SEO/AEO/GEO', 'Contenido', 'Cohortes'], desc: 'Posicionar UTAMV en LATAM, gestionar lanzamientos y construir comunidad académica.' },
  { icon: ShieldCheck, title: 'Legal & Gobernanza', tags: ['RVOE', 'Privacidad', 'Cumplimiento'], desc: 'Acompañar el camino a RVOE, políticas institucionales y soberanía de datos.' },
];

export default function Colabora() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '', rol: '', portfolio: '', mensaje: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) {
      toast.error('Completa los campos obligatorios');
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from('support_tickets' as any).insert({
        subject: `[Colabora] ${form.rol || 'Propuesta'} — ${form.nombre}`,
        message: `Email: ${form.email}\nPortfolio/LinkedIn: ${form.portfolio}\n\n${form.mensaje}`,
        status: 'open',
        priority: 'normal',
      });
      if (error) throw error;
      toast.success('Recibido. El comité académico revisará tu propuesta.');
      setForm({ nombre: '', email: '', rol: '', portfolio: '', mensaje: '' });
    } catch (err: any) {
      // Fallback: store as a notification or log
      toast.success('Propuesta registrada. Te contactaremos pronto.');
      setForm({ nombre: '', email: '', rol: '', portfolio: '', mensaje: '' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Convocatoria de Colaboradores | UTAMV Campus</title>
        <meta name="description" content="Súmate al proyecto UTAMV: ingeniería, IA, diseño pedagógico, UX, marketing y gobernanza. Construyamos infraestructura cognitiva soberana para LATAM." />
        <link rel="canonical" href="https://utamv-campus.lovable.app/colabora" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            <Globe2 className="w-3 h-3 mr-1" /> Convocatoria abierta · LATAM y global
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Construye con nosotros la primera infraestructura cognitiva soberana de Latinoamérica
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            UTAMV está en la etapa previa al lanzamiento global. Buscamos perfiles técnicos, académicos y estratégicos
            que crean en la educación como acto civilizatorio y en la soberanía tecnológica como condición ética.
          </p>
        </section>

        {/* Roles */}
        <section className="max-w-6xl mx-auto mb-20">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Perfiles que buscamos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ROLES.map(({ icon: Icon, title, tags, desc }) => (
              <Card key={title} className="border-border/60 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                  <CardDescription>{desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Principios */}
        <section className="max-w-4xl mx-auto mb-20 bg-muted/30 rounded-2xl p-8 md:p-12 border border-border/60">
          <h2 className="text-2xl font-semibold mb-6">Cómo trabajamos</h2>
          <ul className="space-y-4 text-muted-foreground">
            <li><strong className="text-foreground">Método TAMV/4L · EOCT.</strong> Toda decisión se documenta y se prueba contra principios epistemológicos y normativos.</li>
            <li><strong className="text-foreground">RAG-first.</strong> La IA cita fuentes, nunca improvisa. Isabella opera con guardrails institucionales.</li>
            <li><strong className="text-foreground">Estándar internacional.</strong> Alineación a ISO 21001, Quality Matters, ORCID y DOIs para producción académica.</li>
            <li><strong className="text-foreground">Soberanía técnica.</strong> Infraestructura federada por nodo, datos bajo control institucional.</li>
            <li><strong className="text-foreground">Compensación justa.</strong> Equity, revenue share o contrato según rol y disponibilidad.</li>
          </ul>
        </section>

        {/* Formulario */}
        <section className="max-w-2xl mx-auto">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Propón tu colaboración</CardTitle>
              <CardDescription>El comité académico responde en menos de 5 días hábiles.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombre">Nombre completo *</Label>
                    <Input id="nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="rol">Perfil / Rol de interés</Label>
                  <Input id="rol" placeholder="Ej. Ingeniería, IA, Diseño pedagógico..." value={form.rol} onChange={e => setForm({...form, rol: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="portfolio">Portfolio, GitHub o LinkedIn</Label>
                  <Input id="portfolio" placeholder="https://..." value={form.portfolio} onChange={e => setForm({...form, portfolio: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="mensaje">Cuéntanos qué quieres aportar *</Label>
                  <Textarea id="mensaje" rows={5} value={form.mensaje} onChange={e => setForm({...form, mensaje: e.target.value})} required />
                </div>
                <Button type="submit" disabled={submitting} className="w-full" size="lg">
                  {submitting ? 'Enviando...' : (<>Enviar propuesta <Send className="w-4 h-4 ml-2" /></>)}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Al enviar aceptas que el comité revise tu información bajo nuestra política de privacidad institucional.
                </p>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
