import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IsabellaChatButton from '@/components/IsabellaChatButton';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, Users, Award, Microscope, GraduationCap, Globe, ShieldCheck, 
  BarChart3, Brain, Target, ChevronRight, Building2, TrendingUp, 
  Briefcase, BookOpenCheck
} from 'lucide-react';
import utamvLogo from '@/assets/utamv-logo-campus.png';
import edwinCastillo from '@/assets/edwin-castillo.jpg';
import renataJazmin from '@/assets/renata-jazmin.jpg';

const Index = () => {
  const academicAreas = [
    { icon: BarChart3, title: 'Marketing Digital Avanzado', description: 'SEO, AEO, metadatos y posicionamiento estratégico en buscadores e inteligencia artificial.' },
    { icon: Brain, title: 'Inteligencia Artificial Aplicada', description: 'Automatización, análisis predictivo y herramientas de IA para estrategia empresarial.' },
    { icon: Target, title: 'Estrategia y Gestión Digital', description: 'Planificación omnicanal, analítica de datos y toma de decisiones basada en evidencia.' },
    { icon: Globe, title: 'Comunicación y Medios Digitales', description: 'Narrativa digital, producción de contenido y gestión de comunidades en línea.' },
  ];

  const academicLevels = [
    { 
      icon: BookOpenCheck, 
      title: 'Maestrías', 
      description: 'Programas avanzados para desarrollo profesional y académico con profundización en áreas especializadas.',
      duration: '12-18 meses',
      level: 'Posgrado'
    },
    { 
      icon: Briefcase, 
      title: 'Máster Profesional', 
      description: 'Formación práctica y estratégica para profesionales que buscan liderar en entornos digitales.',
      duration: '6-12 meses',
      level: 'Especialización'
    },
    { 
      icon: TrendingUp, 
      title: 'Diplomados', 
      description: 'Programas intensivos para actualización profesional en áreas específicas del marketing digital.',
      duration: '3-6 meses',
      level: 'Especialización'
    },
    { 
      icon: Building2, 
      title: 'Certificaciones', 
      description: 'Programas de formación corta para desarrollo de competencias específicas y verificación de conocimientos.',
      duration: '1-3 meses',
      level: 'Certificación'
    },
  ];

  const featuredPrograms = [
    {
      type: 'Certificado Profesional',
      title: 'Fundamentos de Marketing Digital',
      hours: '5 horas',
      duration: '1 semana',
      level: 'Introductorio',
      slug: 'fundamentos-marketing-digital',
    },
    {
      type: 'Máster Profesional',
      title: 'Marketing Digital 2026',
      hours: '50+ horas',
      duration: '6 meses',
      level: 'Avanzado',
      slug: 'master-marketing-digital-2026',
      featured: true,
    },
    {
      type: 'Doctorado Profesional',
      title: 'Inteligencia Estratégica Digital',
      hours: '120+ horas',
      duration: '12 meses',
      level: 'Especialización',
      slug: 'doctorado-inteligencia-estrategica',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero institucional */}
        <section className="relative pt-32 pb-32 overflow-hidden bg-gradient-to-br from-[#0A1128] via-[#1A365D] to-[#0A1128]">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/50 via-[#0A1128]/80 to-[#0A1128]" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-28 h-28 mx-auto mb-8 rounded-2xl overflow-hidden shadow-platinum animate-float">
                <img src={utamvLogo} alt="UTAMV" className="w-full h-full object-contain" />
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                UTAMV
              </h1>
              <p className="text-xl md:text-2xl text-platinum/90 max-w-2xl mx-auto mb-4 leading-relaxed font-serif">
                Universidad Tecnológica Avanzada del Marketing Virtual
              </p>
              <p className="text-lg text-white/70 max-w-xl mx-auto mb-12 leading-relaxed">
                Formación académica de excelencia en marketing digital, inteligencia artificial 
                y estrategia empresarial. Nacida en Latinoamérica, con reconocimiento global.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  variant="outline" 
                  size="lg" 
                  asChild
                  className="px-8 py-6 border-2 border-platinum text-platinum hover:bg-platinum/10 hover:border-platinum/80 text-lg font-semibold tracking-wider"
                >
                  <Link to="/programas">EXPLORAR PROGRAMAS</Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  asChild
                  className="px-8 py-6 text-white/80 hover:text-platinum hover:bg-white/5 border border-transparent hover:border-platinum/30 text-lg font-semibold tracking-wider"
                >
                  <Link to="/admisiones">ADMISIONES</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </section>

        {/* DOCUMENTACIÓN INSTITUCIONAL OFICIAL UTAMV */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center tracking-wide">
                DOCUMENTACIÓN INSTITUCIONAL OFICIAL UTAMV
              </h2>

              {/* Naturaleza Institucional */}
              <div className="mb-12 p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 tracking-wider uppercase text-center">
                  Naturaleza Institucional
                </h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                    <strong>IMPORTANTE:</strong> La Universidad de Tecnología Avanzada, Marketing y Versatilidad (UTAMV) es una institución particular de educación superior de carácter privado. Opera bajo un modelo educativo propio y se encuentra en <strong>fase de preparación y, en su caso, solicitud de Reconocimiento de Validez Oficial de Estudios (RVOE)</strong> ante las autoridades educativas competentes.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Los estudios impartidos actualmente tienen <strong>carácter institucional</strong> y <strong>no cuentan con reconocimiento de validez oficial</strong>, salvo que exista resolución expresa y vigente emitida por la autoridad educativa correspondiente para un programa específico.
                </p>
              </div>

              {/* Denominación Oficial */}
              <div className="mb-12 p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 tracking-wider uppercase text-center">
                  Denominación Oficial
                </h3>
                <div className="text-center">
                  <p className="text-2xl font-bold text-platinum mb-2">UNIVERSIDAD DE TECNOLOGÍA AVANZADA, MARKETING Y VERSATILIDAD</p>
                  <p className="text-lg text-foreground mb-4">Acrónimo: UTAMV</p>
                  <p className="text-sm text-muted-foreground">Nombre comercial: UTAMV Campus Online</p>
                </div>
              </div>

              {/* Estatuto Orgánico */}
              <div className="mb-12 p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-6 tracking-wider uppercase text-center">
                  Estatuto Orgánico UTAMV
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Naturaleza Jurídica</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      UTAMV es una institución particular de educación superior de carácter privado, con personalidad jurídica y patrimonio propios, que se rige por la legislación educativa aplicable en los Estados Unidos Mexicanos.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Fines Institucionales</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Impartir educación superior de calidad mediante modelos pedagógicos basados en competencias, desarrollar conocimiento aplicado e innovación tecnológica, y contribuir al desarrollo social.
                    </p>
                  </div>
                </div>
              </div>

              {/* Modelo Educativo NextGen 2026 */}
              <div className="mb-12 p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-6 tracking-wider uppercase text-center">
                  Modelo Educativo UTAMV NextGen 2026
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'OBE', desc: 'Educación basada en resultados' },
                    { name: 'Aprendizaje Centrado', desc: 'Estudiante como protagonista' },
                    { name: 'Innovación Digital', desc: 'Tecnología avanzada' },
                    { name: 'Evaluación Formativa', desc: 'Evidencias verificables' },
                  ].map((eje, i) => (
                    <div key={i} className="p-4 rounded-xl bg-muted/30 text-center">
                      <h4 className="text-sm font-semibold text-foreground mb-2">{eje.name}</h4>
                      <p className="text-xs text-muted-foreground">{eje.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Misión y Visión */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4 tracking-wider uppercase text-center">
                    Visión Institucional
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-center">
                    Consolidarse como una universidad de referencia internacional en educación digital y tecnológica, reconocida por la calidad académica de sus programas, su capacidad de innovación, su impacto social y su contribución al desarrollo profesional, económico y tecnológico a nivel global.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4 tracking-wider uppercase text-center">
                    Misión Institucional
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-center">
                    Formar profesionales íntegros, innovadores y versátiles, mediante un modelo educativo basado en tecnología avanzada, marketing estratégico y excelencia académica, promoviendo el pensamiento crítico, la ética profesional, la innovación y la adaptación permanente a los desafíos del entorno global.
                  </p>
                </div>
              </div>

              {/* Valores Institucionales */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-6 tracking-wider uppercase text-center">
                  Valores Institucionales
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Excelencia Académica', desc: 'Compromiso con la calidad y rigor científico' },
                    { name: 'Innovación', desc: 'Creatividad y desarrollo tecnológico' },
                    { name: 'Ética y Responsabilidad', desc: 'Actuación íntegra y transparente' },
                    { name: 'Versatilidad', desc: 'Adaptación y multidisciplinariedad' },
                    { name: 'Pensamiento Crítico', desc: 'Análisis reflexivo y propositivo' },
                    { name: 'Compromiso Global', desc: 'Visión internacional y diversidad' },
                  ].map((valor, i) => (
                    <div key={i} className="p-4 rounded-xl bg-muted/30 text-center">
                      <h4 className="text-sm font-semibold text-foreground mb-2">{valor.name}</h4>
                      <p className="text-xs text-muted-foreground">{valor.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eslogan */}
              <div className="mt-12 text-center">
                <p className="text-xl font-bold text-platinum italic">
                  "Innovación, conocimiento y versatilidad para el futuro."
                </p>
                <p className="text-sm text-muted-foreground mt-2">Eslogan Institucional Oficial</p>
              </div>


            </div>
          </div>
        </section>

        {/* Niveles académicos */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-center tracking-wide">
              NIVELES ACADÉMICOS
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Oferta educativa estructurada para profesionales de diferentes niveles de experiencia, 
              desde certificaciones iniciales hasta programas de posgrado de alta especialización.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {academicLevels.map((level, i) => (
                <div key={i} className="p-6 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors duration-300">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                    <level.icon className="w-5 h-5 text-silver" />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-foreground mb-2">{level.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{level.description}</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Duración</span>
                      <span className="text-foreground">{level.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nivel</span>
                      <span className="text-foreground">{level.level}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Áreas académicas */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-center tracking-wide">
              ÁREAS ACADÉMICAS
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Líneas de formación diseñadas para cubrir las competencias profesionales 
              más demandadas en el entorno digital actual.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {academicAreas.map((area, i) => (
                <div key={i} className="p-6 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors duration-300">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                    <area.icon className="w-5 h-5 text-silver" />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-foreground mb-2">{area.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programas destacados */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-center tracking-wide">
              PROGRAMAS DESTACADOS
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Oferta académica estructurada por niveles de formación, 
              desde certificaciones introductorias hasta programas de investigación aplicada.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {featuredPrograms.map((prog, i) => (
                <Link
                  key={i}
                  to={`/programas/${prog.slug}`}
                  className={`group block rounded-xl border bg-card/50 hover:bg-card transition-all duration-300 overflow-hidden ${
                    prog.featured ? 'border-silver/40 ring-1 ring-silver/20' : 'border-border'
                  }`}
                >
                  {prog.featured && (
                    <div className="bg-silver/10 text-silver text-[10px] font-bold tracking-[0.2em] text-center py-1.5 uppercase">
                      Programa insignia
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                      {prog.type}
                    </span>
                    <h3 className="font-display text-lg font-bold text-foreground mt-2 mb-4 group-hover:text-silver transition-colors">
                      {prog.title}
                    </h3>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Duración</span>
                        <span className="text-foreground">{prog.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Horas totales</span>
                        <span className="text-foreground">{prog.hours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nivel</span>
                        <span className="text-foreground">{prog.level}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-[10px]">DOI ready</Badge>
                      <Badge variant="outline" className="text-[10px]">OpenAIRE</Badge>
                    </div>
                    <div className="mt-5 text-xs font-semibold text-silver tracking-wider group-hover:translate-x-1 transition-transform">
                      Ver ficha académica →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <Link to="/programas">Ver todos los programas <ChevronRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Modelo académico */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-center tracking-wide">
                MODELO ACADÉMICO UTAMV
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Un sistema de formación diseñado para maximizar el aprendizaje aplicado 
                y la adquisición de competencias profesionales verificables.
              </p>
              <div className="grid sm:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-xl border border-border bg-card/30">
                  <GraduationCap className="w-8 h-8 text-silver mx-auto mb-4" />
                  <h3 className="font-display text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">Enseñanza</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Contenido multimedia estructurado: lecciones teóricas, casos de estudio, 
                    ejercicios prácticos y proyectos aplicados con datos reales.
                  </p>
                </div>
                <div className="text-center p-6 rounded-xl border border-border bg-card/30">
                  <ShieldCheck className="w-8 h-8 text-silver mx-auto mb-4" />
                  <h3 className="font-display text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">Evaluación</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Sistema de evaluación continua con exámenes por módulo, 
                    proyecto integrador final y criterios de aprobación transparentes.
                  </p>
                </div>
                <div className="text-center p-6 rounded-xl border border-border bg-card/30">
                  <Award className="w-8 h-8 text-silver mx-auto mb-4" />
                  <h3 className="font-display text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">Certificación</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Certificado UTAMV con verificación digital, detalle de competencias 
                    desarrolladas, horas acreditadas y sello institucional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cuerpo docente preview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-center tracking-wide">
              CUERPO DOCENTE
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Profesionales con experiencia aplicada en marketing digital, 
              tecnología e inteligencia artificial.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center max-w-3xl mx-auto">
              {[
                { img: edwinCastillo, name: 'Edwin Oswaldo Castillo Trejo', role: 'Rector del Campus', company: 'Universidad UTAMV' },
                { img: renataJazmin, name: 'Renata Jazmin', role: 'Vicerrectora Académica', company: 'Universidad UTAMV' },
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/30 w-full sm:w-auto sm:min-w-[300px]">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-border shrink-0">
                    <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-foreground">{doc.name}</p>
                    <p className="text-xs text-silver">{doc.role}</p>
                    <p className="text-xs text-muted-foreground">{doc.company}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/docentes" className="text-xs tracking-wider">VER EQUIPO COMPLETO →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Estadísticas Institucionales */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-foreground mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Países</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-foreground mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Alumnos</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-foreground mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Tasa de empleo</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-foreground mb-2">4.9/5</div>
                <div className="text-sm text-muted-foreground">Calificación</div>
              </div>
            </div>
          </div>
        </section>

        {/* Institutional footer CTA */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-6">
                Plataforma creada con Tecnología TAMV ONLINE
              </p>
              <p className="font-display text-lg text-foreground/80 italic leading-relaxed mb-2">
                «No imitamos el futuro. Nosotros somos el futuro, lo soñamos, 
                lo creamos, lo sentimos y definitivamente lo vivimos.»
              </p>
              <p className="text-xs text-muted-foreground tracking-wider uppercase mt-4">
                Orgullosamente Realmontenses
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <IsabellaChatButton />
    </div>
  );
};

export default Index;
