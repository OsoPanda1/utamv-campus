import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, ShieldCheck, BookOpen, Network, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBg from '@/assets/hero-bg.jpg';
import utamvSeal from '@/assets/utamv-logo-campus.png';

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      if (speechSynthesis.getVoices().length > 0) setVoicesLoaded(true);
    };
    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const playWelcome = () => {
    if (!voicesLoaded) speechSynthesis.getVoices();
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(
      'Bienvenido al kernel UTAMV ISABELLA. Piensa como Edwin EOCT: psicología fría, rigor académico y pensamiento sistémico. Diseñamos, auditamos y defendemos conocimiento para una educación civilizatoria. Operamos desde Hidalgo, México, con infraestructura cognitiva soberana para universidades, gobiernos y nodos territoriales.'
    );
    utterance.lang = 'es-MX';
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    const voices = speechSynthesis.getVoices();
    const v = voices.find(v => v.lang.includes('es') && /female|maria|lucia|paulina|sabina|conchita|google español/i.test(v.name))
      || voices.find(v => v.lang.includes('es'));
    if (v) utterance.voice = v;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    speechSynthesis.speak(utterance);
  };

  const stopWelcome = () => { speechSynthesis.cancel(); setIsPlaying(false); };

  const valueProps = [
    { icon: Network, text: 'Campus como sistema civilizatorio: cursos, investigación y políticas conectadas a CITEMESH, GEMET, SDMD-7 y 4L.' },
    { icon: BookOpen, text: 'Respuestas con evidencia: RAG sobre corpus TAMV/UTAMV y fuentes académicas verificadas, con citas y métricas de rigor.' },
    { icon: Sparkles, text: 'Skill Edwin/EOCT: IA que habla en 3S (Simple, Sencillo, Sobrio) y devuelve planes, frameworks y módulos listos para producción.' },
    { icon: ShieldCheck, text: 'Listo para instituciones: API REST/GraphQL, despliegue federado por nodo, gobernanza y alineación a ISO 21001 y Quality Matters.' },
  ];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/95 via-[#0A1128]/85 to-[#0A1128]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-16 items-center">
          {/* Content */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-platinum/40 bg-platinum/5 mb-8">
              <ShieldCheck className="w-4 h-4 text-platinum" />
              <span className="text-xs font-medium text-platinum tracking-[0.2em] uppercase">UTAMV · Isabella Kernel</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-[1.1] text-white">
              Arquitectura cognitiva para una{' '}
              <span className="text-gradient-silver">educación civilizatoria</span>
            </h1>

            <h2 className="text-base md:text-lg text-platinum/80 mb-10 max-w-2xl leading-relaxed">
              El kernel UTAMV‑ISABELLA piensa como Edwin EOCT: psicología fría, rigor académico y pensamiento sistémico para diseñar, auditar y defender conocimiento en TAMV Online.
            </h2>

            <ul className="space-y-4 mb-10 max-w-2xl">
              {valueProps.map((vp, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <vp.icon className="w-5 h-5 text-platinum mt-1 flex-shrink-0" />
                  <span className="text-sm text-white/75 leading-relaxed">{vp.text}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button size="xl" asChild className="bg-platinum text-[#0A1128] hover:bg-platinum/90 font-semibold">
                <Link to="/campus-virtual">Probar kernel académico</Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="border-platinum/50 text-platinum hover:bg-platinum/10">
                <Link to="/admisiones/contacto">Recibir briefing para mi universidad</Link>
              </Button>
            </div>

            <p className="text-xs text-platinum/60 max-w-xl leading-relaxed">
              Diseñado y operado desde Hidalgo, México. Infraestructura cognitiva soberana para universidades, gobiernos y nodos territoriales.
            </p>
          </div>

          {/* Seal */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-8 bg-gradient-to-br from-platinum/30 via-gold/10 to-platinum/20 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden border-2 border-platinum/40 shadow-2xl animate-float bg-[#0A1128]">
                <img src={utamvSeal} alt="Sello Institucional UTAMV Campus Online" className="w-full h-full object-contain" />
              </div>
              <button
                onClick={isPlaying ? stopWelcome : playWelcome}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A1128] border border-platinum/50 text-platinum text-sm font-semibold shadow-xl hover:bg-platinum/10 transition-all duration-300"
              >
                {isPlaying ? <><VolumeX className="w-4 h-4" /> Detener</> : <><Volume2 className="w-4 h-4" /> Escuchar a Isabella</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
