import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Clock, BarChart3, Monitor, GraduationCap, Database, FileCheck2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const allPrograms = [
  // Maestrías
  {
    slug: 'maestria-marketing-digital',
    type: 'Maestría',
    title: 'Maestría en Marketing Digital Estratégico',
    description: 'Programa de posgrado avanzado enfocado en estrategias digitales, analítica de datos y gestión de campañas omnicanal.',
    hours: '200+', duration: '12 meses', modality: 'Híbrido', level: 'Posgrado', area: 'Marketing Digital',
    priceMXN: 11900, featured: true,
  },
  {
    slug: 'maestria-ia-empresarial',
    type: 'Maestría',
    title: 'Maestría en Inteligencia Artificial Aplicada',
    description: 'Formación avanzada en desarrollo y aplicación de IA en entornos empresariales.',
    hours: '180+', duration: '12 meses', modality: '100% en línea', level: 'Posgrado', area: 'Inteligencia Artificial',
    priceMXN: 14900,
  },
  {
    slug: 'maestria-negocios-digitales',
    type: 'Maestría',
    title: 'Maestría en Negocios Digitales',
    description: 'Gestión de empresas en entornos digitales. Estrategia empresarial, innovación tecnológica y liderazgo digital.',
    hours: '160+', duration: '10 meses', modality: 'Híbrido', level: 'Posgrado', area: 'Estrategia Digital',
    priceMXN: 11900,
  },

  // Máster Profesional
  {
    slug: 'master-marketing-digital-2026',
    type: 'Máster Profesional',
    title: 'Máster Profesional en Marketing Digital',
    description: 'Programa insignia: SEO, AEO, metadatos, geo-targeting, IA aplicada y estrategia omnicanal. 10 módulos con evaluación continua.',
    hours: '50+', duration: '6 meses', modality: '100% en línea', level: 'Avanzado', area: 'Marketing Digital',
    priceMXN: 6900, featured: true,
  },
  {
    slug: 'master-analitica-digital',
    type: 'Máster Profesional',
    title: 'Máster Profesional en Analítica Digital',
    description: 'Especialización en análisis de datos, dashboards y toma de decisiones basada en evidencia.',
    hours: '45+', duration: '5 meses', modality: '100% en línea', level: 'Avanzado', area: 'Estrategia Digital',
    priceMXN: 6900,
  },
  {
    slug: 'master-ia-empresarial',
    type: 'Máster Profesional',
    title: 'Máster Profesional en IA para Negocios',
    description: 'Aplicación práctica de IA en automatización, análisis predictivo y optimización de procesos.',
    hours: '55+', duration: '6 meses', modality: '100% en línea', level: 'Avanzado', area: 'Inteligencia Artificial',
    priceMXN: 8900,
  },
  {
    slug: 'master-transformacion-digital',
    type: 'Máster Profesional',
    title: 'Máster Profesional en Transformación Digital',
    description: 'Liderazgo en procesos de transformación digital, innovación tecnológica y adaptación a entornos disruptivos.',
    hours: '50+', duration: '6 meses', modality: '100% en línea', level: 'Avanzado', area: 'Estrategia Digital',
    priceMXN: 6900,
  },
  {
    slug: 'master-python-cs-ia',
    type: 'Máster Profesional',
    title: 'Máster Profesional en Python, CS e Inteligencia Artificial',
    description: 'Programa integrado de 8 módulos: Python, ciencia de datos, algoritmos, ML, deep learning, NLP e ingeniería de software aplicada al ecosistema TAMV.',
    hours: '60+', duration: '8 meses', modality: '100% en línea', level: 'Avanzado', area: 'Tecnología',
    priceMXN: 13900, featured: true,
  },

  // Diplomados
  {
    slug: 'diplomado-seo-avanzado',
    type: 'Diplomado',
    title: 'Diplomado en SEO y AEO Avanzado',
    description: 'Optimización para motores de búsqueda y motores de respuesta con IA.',
    hours: '30', duration: '2 meses', modality: '100% en línea', level: 'Intermedio', area: 'Marketing Digital',
    priceMXN: 4900,
  },
  {
    slug: 'diplomado-ia-marketing',
    type: 'Diplomado',
    title: 'Diplomado en IA para Marketing',
    description: 'Herramientas de IA en automatización de campañas, análisis predictivo y generación de contenido.',
    hours: '25', duration: '2 meses', modality: '100% en línea', level: 'Intermedio', area: 'Inteligencia Artificial',
    priceMXN: 4900,
  },
  {
    slug: 'diplomado-programacion-fullstack',
    type: 'Diplomado',
    title: 'Diplomado en Programación Full Stack',
    description: 'Desarrollo web completo: JavaScript, Python, Node.js. Aplicaciones reales y proyectos profesionales.',
    hours: '40', duration: '3 meses', modality: '100% en línea', level: 'Intermedio', area: 'Tecnología',
    priceMXN: 7900,
  },

  // Certificaciones
  {
    slug: 'certificado-marketing-digital',
    type: 'Certificado Profesional',
    title: 'Certificado Profesional en Marketing Digital',
    description: 'Conceptos esenciales del marketing digital y herramientas de análisis.',
    hours: '5', duration: '1 semana', modality: '100% en línea', level: 'Introductorio', area: 'Marketing Digital',
    priceMXN: 1200,
  },
  {
    slug: 'certificado-analitica-digital',
    type: 'Certificado Profesional',
    title: 'Certificado Profesional en Analítica Digital',
    description: 'Medición de resultados, dashboards y toma de decisiones basada en datos.',
    hours: '8', duration: '2 semanas', modality: '100% en línea', level: 'Introductorio', area: 'Estrategia Digital',
    priceMXN: 1200,
  },
  {
    slug: 'certificado-seguridad-web',
    type: 'Certificado Profesional',
    title: 'Certificado Profesional en Seguridad Web',
    description: 'Protección de datos, ciberseguridad y cumplimiento normativo GDPR/LGPD.',
    hours: '6', duration: '2 semanas', modality: '100% en línea', level: 'Introductorio', area: 'Tecnología',
    priceMXN: 1200,
  },
  {
    slug: 'certificado-ia-basica',
    type: 'Certificado Profesional',
    title: 'Certificado Profesional en IA Básica',
    description: 'Fundamentos de IA, machine learning y aplicaciones para profesionales no técnicos.',
    hours: '5', duration: '1 semana', modality: '100% en línea', level: 'Introductorio', area: 'Inteligencia Artificial',
    priceMXN: 1200,
  },

  // Doctorado
  {
    slug: 'doctorado-inteligencia-estrategica',
    type: 'Doctorado Profesional',
    title: 'Doctorado Profesional en Inteligencia Estratégica Digital',
    description: 'Investigación aplicada a la dirección estratégica digital. Tesis doctoral, mentoría y publicación académica.',
    hours: '120+', duration: '12 meses', modality: '100% en línea', level: 'Especialización', area: 'Inteligencia Artificial',
    priceMXN: 29900,
  },
];

const types = ['Todos', 'Maestría', 'Máster Profesional', 'Doctorado Profesional', 'Diplomado', 'Certificado Profesional'];

const Programas = () => {
  const [filterType, setFilterType] = useState('Todos');

  const filtered = filterType === 'Todos'
    ? allPrograms
    : allPrograms.filter(p => p.type === filterType);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              CATÁLOGO DE PROGRAMAS
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferta académica completa de UTAMV. Programas estructurados por nivel de formación,
              con información clara sobre duración, horas y competencias.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 border-b border-border sticky top-20 bg-background/95 backdrop-blur-sm z-40">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-300 ${
                    filterType === type
                      ? 'bg-foreground text-background'
                      : 'bg-muted text-muted-foreground hover:text-foreground border border-transparent hover:border-border'
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filtered.map((prog) => (
                <Link
                  key={prog.slug}
                  to={`/programas/${prog.slug}`}
                  className={`group block rounded-xl border bg-card/50 hover:bg-card transition-all duration-300 overflow-hidden ${
                    prog.featured ? 'border-platinum/40 ring-1 ring-platinum/20' : 'border-border'
                  }`}
                >
                  {prog.featured && (
                    <div className="bg-platinum/10 text-platinum text-[10px] font-bold tracking-[0.2em] text-center py-1.5 uppercase">
                      Programa destacado
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                      {prog.type}
                    </span>
                    <h3 className="font-display text-lg font-bold text-foreground mt-2 mb-3 group-hover:text-platinum transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                      {prog.description}
                    </p>

                    {/* Price */}
                    <div className="mb-4 flex items-baseline gap-1">
                      <span className="text-lg font-display font-bold text-foreground">
                        ${prog.priceMXN.toLocaleString('es-MX')}
                      </span>
                      <span className="text-xs text-muted-foreground">MXN</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{prog.hours} horas</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>{prog.level}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Monitor className="w-3.5 h-3.5" />
                        <span>{prog.modality}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>{prog.duration}</span>
                      </div>
                    </div>
                    <div className="mt-4 text-xs font-semibold text-platinum tracking-wider group-hover:translate-x-1 transition-transform">
                      Ver ficha académica →
                    </div>
                    {['fundamentos-marketing-digital', 'master-marketing-digital-2026', 'doctorado-inteligencia-estrategica'].includes(prog.slug) && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="outline" className="gap-1 text-[10px]"><FileCheck2 className="w-3 h-3" /> DOI ready</Badge>
                        <Badge variant="outline" className="gap-1 text-[10px]"><Database className="w-3 h-3" /> OpenAIRE</Badge>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Programas;