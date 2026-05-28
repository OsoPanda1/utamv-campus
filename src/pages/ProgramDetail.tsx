import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, BarChart3, Monitor, GraduationCap, CheckCircle, BookOpen, ShieldCheck, CreditCard, ExternalLink, Database, FileCheck2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { doiUrl, fetchAcademicCourseMetadata, type AcademicCourseMetadata } from '@/lib/scholarly';

interface ProgramModule {
  title: string;
  hours: number;
  description: string;
}

interface ProgramPricing {
  mxn: number;
  usd: number;
  monthly?: { months: number; amount: number };
}

interface ProgramData {
  type: string;
  title: string;
  hours: string;
  duration: string;
  modality: string;
  level: string;
  description: string;
  objectives: string[];
  modules: ProgramModule[];
  methodology: string;
  ingressProfile: string;
  egressProfile: string;
  certification: string;
  pricing: ProgramPricing;
}

const programsData: Record<string, ProgramData> = {
  'master-marketing-digital-2026': {
    type: 'Máster Profesional',
    title: 'Marketing Digital 2026',
    hours: '50+', duration: '6 meses', modality: '100% en línea', level: 'Avanzado',
    pricing: { mxn: 6900, usd: 350, monthly: { months: 4, amount: 1800 } },
    description: 'Programa insignia de formación avanzada en marketing digital que integra SEO, AEO, metadatos estratégicos, geo-targeting, inteligencia artificial aplicada y estrategia omnicanal.',
    objectives: [
      'Dominar técnicas avanzadas de SEO y AEO (Answer Engine Optimization)',
      'Diseñar arquitecturas de metadatos profesionales para posicionamiento estratégico',
      'Implementar estrategias de geo-targeting y marketing local efectivas',
      'Automatizar campañas y procesos con inteligencia artificial',
      'Desarrollar estrategias omnicanal basadas en datos',
      'Ejecutar proyectos reales con metodología profesional',
    ],
    modules: [
      { title: 'Fundamentos del Marketing Digital Moderno', hours: 5, description: 'Evolución del marketing, ecosistema digital y pensamiento estratégico.' },
      { title: 'Branding e Identidad Digital', hours: 5, description: 'Construcción de marca, identidad visual y posicionamiento.' },
      { title: 'Estrategia de Contenidos y Redes Sociales', hours: 5, description: 'Planificación editorial, gestión de comunidades y métricas de engagement.' },
      { title: 'SEO Avanzado y AEO', hours: 6, description: 'Optimización para buscadores y motores de respuesta con IA.' },
      { title: 'Publicidad Digital y PPC', hours: 5, description: 'Google Ads, Meta Ads, programática y optimización de campañas.' },
      { title: 'Email Marketing y Automatización', hours: 4, description: 'Funnels, secuencias automatizadas y personalización con IA.' },
      { title: 'Video Marketing y Producción Multimedia', hours: 4, description: 'Estrategia de video, producción y distribución multiplataforma.' },
      { title: 'E-commerce y Conversión Digital', hours: 5, description: 'Optimización de tiendas, CRO y funnels de venta.' },
      { title: 'Analítica, KPIs y Marketing con IA', hours: 5, description: 'Dashboards, métricas avanzadas y analítica predictiva.' },
      { title: 'Estrategia Integral y Proyecto Final', hours: 6, description: 'Integración de competencias, proyecto aplicado con cliente real.' },
    ],
    methodology: 'Evaluación continua por módulo mediante exámenes y casos prácticos. Proyecto integrador final con rúbrica detallada. Criterio: 70% en cada módulo y entrega del proyecto final.',
    ingressProfile: 'Profesionales, emprendedores o egresados de carreras afines al marketing, comunicación, administración o tecnología.',
    egressProfile: 'Profesional capacitado para diseñar, ejecutar y medir estrategias de marketing digital integrales.',
    certification: 'Certificado UTAMV de Máster Profesional en Marketing Digital 2026. Incluye horas acreditadas, competencias, número de verificación y sello institucional digital.',
  },

  // ── NUEVO: PYTHON, CS E IA ──
  'master-python-cs-ia': {
    type: 'Máster Profesional',
    title: 'Python, Ciencia de la Computación e Inteligencia Artificial',
    hours: '60+', duration: '8 meses', modality: '100% en línea', level: 'Avanzado',
    pricing: { mxn: 13900, usd: 700, monthly: { months: 6, amount: 2500 } },
    description: 'Programa integrado que forma profesionales capaces de diseñar, implementar y desplegar soluciones de software e IA. Combina fundamentos de programación con Python, ciencia de datos, algoritmos, machine learning, deep learning, NLP e ingeniería de software. Basado en recursos de institutohumai, Universidade Livre y Kaggle.',
    objectives: [
      'Programar con Python: tipos de datos, POO, módulos y control de versiones con Git',
      'Dominar matemáticas para IA: álgebra lineal, probabilidad, estadística y análisis de datos con Pandas/Numpy',
      'Diseñar bases de datos relacionales, automatizar tareas y hacer web scraping',
      'Implementar estructuras de datos y algoritmos (listas, árboles, grafos, BFS/DFS)',
      'Entrenar modelos de machine learning: regresión, clasificación, ensembles y series de tiempo',
      'Construir redes neuronales con PyTorch: feedforward, CNN, regularización y optimización',
      'Aplicar NLP: tokenización, embeddings, transformers y modelos tipo BERT',
      'Integrar un sistema completo con API REST, modelo de ML/DL, testing y despliegue con Docker',
    ],
    modules: [
      { title: 'Fundamentos de Programación con Python', hours: 8, description: 'Tipos de datos, control de flujo, funciones, módulos, POO básica, Git y GitHub. Proyecto: CLI de gestión de comercios/tours.' },
      { title: 'Matemáticas para IA y Análisis de Datos', hours: 8, description: 'Vectores, matrices con Numpy, probabilidad, estadística descriptiva, Pandas, agrupaciones, joins, visualización con Matplotlib/Seaborn. Proyecto: EDA sobre dataset de turismo.' },
      { title: 'Bases de Datos, Automatización y Web Scraping', hours: 7, description: 'Modelo relacional, SQL (SELECT, INSERT, JOINs), automatización con scripts, HTTP y requests, BeautifulSoup, Selenium, consumo de APIs REST. Proyecto: pipeline scraping → SQL → API.' },
      { title: 'Algoritmos, Estructuras de Datos y Fundamentos de CS', hours: 7, description: 'Big-O, listas enlazadas, pilas, colas, árboles, grafos, BFS/DFS, búsqueda y ordenamiento. Problemas de coding aplicados a rutas turísticas.' },
      { title: 'Machine Learning Clásico', hours: 8, description: 'Pipeline ML, regresión, clasificación, SVM, k-NN, árboles, Random Forest, XGBoost, SHAP, series de tiempo, sistemas de recomendación. Proyecto: recomendador de lugares + predicción de demanda.' },
      { title: 'Deep Learning', hours: 8, description: 'Tensores, redes fully connected, activaciones, backpropagation, regularización (dropout, batchnorm), optimizadores (SGD, Adam), intro a CNN. Proyecto: clasificador de imágenes.' },
      { title: 'Procesamiento del Lenguaje Natural (NLP) y LLMs', hours: 7, description: 'Limpieza de texto, tokenización, embeddings (word2vec, GloVe), RNN/LSTM, Seq2Seq, atención, transformers, BERT, fine-tuning. Proyecto: chatbot + análisis de sentimiento.' },
      { title: 'Ingeniería de Software, DevOps y Proyecto Integrador', hours: 7, description: 'Clean code, testing, CI/CD con GitHub Actions, Docker, seguridad básica, sistemas distribuidos. Proyecto final: sistema completo con API REST + modelo ML/DL + despliegue.' },
    ],
    methodology: 'Evaluación por notebooks (estilo Kaggle), entregas de código en GitHub, code reviews y proyecto final integrador. Criterio de aprobación: 70% por módulo. Recursos de Kaggle Learn y freeCodeCamp como complemento.',
    ingressProfile: 'Profesionales o estudiantes con interés en programación y ciencia de datos. Conocimientos básicos de computación recomendados. No requiere experiencia previa en Python.',
    egressProfile: 'Profesional full-stack en IA capaz de diseñar, implementar y desplegar soluciones de software y ML/DL para entornos empresariales reales.',
    certification: 'Certificado UTAMV de Máster Profesional en Python, CS e Inteligencia Artificial. Incluye portafolio de proyectos, horas acreditadas y sello digital verificable.',
  },

  // ── MAESTRÍAS ──
  'maestria-marketing-digital': {
    type: 'Maestría', title: 'Maestría en Marketing Digital Estratégico',
    hours: '200+', duration: '12 meses', modality: 'Híbrido', level: 'Posgrado',
    pricing: { mxn: 11900, usd: 600, monthly: { months: 6, amount: 2100 } },
    description: 'Programa de posgrado avanzado enfocado en estrategias digitales, analítica de datos y gestión de campañas omnicanal.',
    objectives: [
      'Diseñar estrategias de marketing digital integrales para organizaciones complejas',
      'Dominar analítica avanzada, modelado de atribución y business intelligence',
      'Dirigir equipos de marketing digital con visión estratégica',
      'Desarrollar investigación aplicada en marketing digital',
      'Implementar frameworks de transformación digital en marketing',
      'Gestionar presupuestos y ROI de inversión digital a nivel directivo',
    ],
    modules: [
      { title: 'Fundamentos Estratégicos del Marketing Digital', hours: 20, description: 'Teorías del marketing digital, marcos estratégicos y análisis del entorno.' },
      { title: 'Investigación de Mercados Digitales', hours: 20, description: 'Métodos cuantitativos y cualitativos aplicados al entorno digital.' },
      { title: 'Estrategia de Marca y Comunicación Digital', hours: 20, description: 'Brand management, storytelling y comunicación corporativa digital.' },
      { title: 'SEO, SEM y Estrategias de Posicionamiento', hours: 20, description: 'Técnicas avanzadas de posicionamiento orgánico y pagado.' },
      { title: 'Analítica Digital y Business Intelligence', hours: 25, description: 'Google Analytics 4, Tag Manager, dashboards ejecutivos y modelado de datos.' },
      { title: 'Marketing de Contenidos y Redes Sociales', hours: 15, description: 'Content marketing, social listening y gestión de comunidades.' },
      { title: 'E-commerce y Estrategia Omnicanal', hours: 20, description: 'Comercio electrónico, marketplace management y experiencia del cliente.' },
      { title: 'IA Aplicada al Marketing', hours: 20, description: 'IA generativa, automatización inteligente y personalización a escala.' },
      { title: 'Dirección de Proyectos Digitales', hours: 15, description: 'Metodologías ágiles, gestión de equipos y liderazgo digital.' },
      { title: 'Tesis de Maestría', hours: 25, description: 'Investigación aplicada, redacción académica y defensa de tesis.' },
    ],
    methodology: 'Evaluación por módulo mediante ensayos, casos prácticos, presentaciones y exámenes. Tesis con asesor académico. Criterio: 75% por módulo y defensa exitosa.',
    ingressProfile: 'Licenciados en marketing, comunicación, administración, ingeniería o áreas afines. Experiencia mínima de 2 años en entornos digitales.',
    egressProfile: 'Director de marketing digital capaz de liderar estrategias integrales y tomar decisiones basadas en datos.',
    certification: 'Grado de Maestría en Marketing Digital Estratégico, emitido por UTAMV con validación institucional.',
  },
  'maestria-ia-empresarial': {
    type: 'Maestría', title: 'Maestría en Inteligencia Artificial Aplicada',
    hours: '180+', duration: '12 meses', modality: '100% en línea', level: 'Posgrado',
    pricing: { mxn: 14900, usd: 750, monthly: { months: 6, amount: 2600 } },
    description: 'Formación avanzada en desarrollo y aplicación de inteligencia artificial en entornos empresariales.',
    objectives: [
      'Comprender los fundamentos matemáticos y algorítmicos de la IA',
      'Implementar modelos de machine learning y deep learning',
      'Aplicar NLP y visión por computadora en contextos empresariales',
      'Diseñar sistemas de IA responsable con gobernanza ética',
      'Desarrollar soluciones de automatización inteligente',
      'Producir investigación aplicada en IA empresarial',
    ],
    modules: [
      { title: 'Matemáticas para IA', hours: 20, description: 'Álgebra lineal, cálculo, probabilidad y estadística aplicada.' },
      { title: 'Programación y Ciencia de Datos', hours: 20, description: 'Python, R, manipulación de datos y visualización.' },
      { title: 'Machine Learning', hours: 25, description: 'Algoritmos supervisados, no supervisados y técnicas de ensemble.' },
      { title: 'Deep Learning', hours: 20, description: 'Redes neuronales, CNNs, RNNs, transformers y arquitecturas modernas.' },
      { title: 'Procesamiento de Lenguaje Natural', hours: 20, description: 'Análisis de texto, sentimiento, chatbots y modelos de lenguaje.' },
      { title: 'IA para Automatización Empresarial', hours: 20, description: 'RPA inteligente, flujos de trabajo y optimización de procesos.' },
      { title: 'Ética y Gobernanza de IA', hours: 15, description: 'Sesgo algorítmico, transparencia, regulación y responsabilidad.' },
      { title: 'Proyecto de Investigación', hours: 20, description: 'Solución de IA para un problema empresarial real.' },
      { title: 'Tesis de Maestría', hours: 20, description: 'Investigación aplicada con metodología rigurosa.' },
    ],
    methodology: 'Portafolio técnico, proyectos de código, ensayos y tesis final. Plataformas: Google Colab, Kaggle, GitHub. Criterio: 75%.',
    ingressProfile: 'Licenciados en ingeniería, ciencias de la computación, matemáticas, física o áreas afines. Conocimientos básicos de programación.',
    egressProfile: 'Especialista en IA capaz de diseñar, implementar y evaluar soluciones inteligentes para organizaciones.',
    certification: 'Grado de Maestría en Inteligencia Artificial Aplicada, emitido por UTAMV.',
  },
  'maestria-negocios-digitales': {
    type: 'Maestría', title: 'Maestría en Negocios Digitales',
    hours: '160+', duration: '10 meses', modality: 'Híbrido', level: 'Posgrado',
    pricing: { mxn: 11900, usd: 600, monthly: { months: 6, amount: 2100 } },
    description: 'Gestión de empresas en entornos digitales con énfasis en estrategia, innovación, modelos de negocio y liderazgo digital.',
    objectives: [
      'Diseñar modelos de negocio digitales sostenibles',
      'Gestionar procesos de transformación digital organizacional',
      'Implementar metodologías ágiles en entornos corporativos',
      'Evaluar y adoptar tecnologías emergentes con criterio estratégico',
      'Liderar equipos multidisciplinarios en entornos digitales',
    ],
    modules: [
      { title: 'Estrategia y Modelos de Negocio Digital', hours: 20, description: 'Canvas, plataformas, ecosistemas y monetización digital.' },
      { title: 'Transformación Digital Organizacional', hours: 20, description: 'Gestión del cambio, cultura digital y madurez tecnológica.' },
      { title: 'Fintech y Economía Digital', hours: 15, description: 'Pagos digitales, blockchain, criptoactivos y regulación.' },
      { title: 'Marketing Digital para Negocios', hours: 20, description: 'Adquisición, retención, LTV y estrategias de crecimiento.' },
      { title: 'Gestión de Productos Digitales', hours: 20, description: 'Product management, UX, roadmaps y métricas de producto.' },
      { title: 'Data-Driven Decision Making', hours: 15, description: 'Analítica de negocio, KPIs, dashboards y cultura de datos.' },
      { title: 'Liderazgo y Gestión de Equipos', hours: 15, description: 'Liderazgo remoto, metodologías ágiles y gestión del talento.' },
      { title: 'Proyecto Empresarial', hours: 20, description: 'Plan de negocio digital con viabilidad demostrada.' },
      { title: 'Tesis de Maestría', hours: 15, description: 'Investigación aplicada en negocios digitales.' },
    ],
    methodology: 'Casos de estudio reales, simulaciones, presentaciones ejecutivas y tesis final. Criterio: 75% por módulo.',
    ingressProfile: 'Profesionales con licenciatura y experiencia en gestión, emprendimiento o tecnología. Mínimo 3 años de experiencia.',
    egressProfile: 'Directivo digital capaz de concebir, lanzar y escalar negocios en el entorno digital.',
    certification: 'Grado de Maestría en Negocios Digitales, emitido por UTAMV.',
  },

  // ── MÁSTER PROFESIONAL ──
  'master-analitica-digital': {
    type: 'Máster Profesional', title: 'Analítica Digital',
    hours: '45+', duration: '5 meses', modality: '100% en línea', level: 'Avanzado',
    pricing: { mxn: 6900, usd: 350, monthly: { months: 3, amount: 2400 } },
    description: 'Especialización en análisis de datos para marketing digital. Desde configuración técnica hasta dashboards ejecutivos y modelos predictivos.',
    objectives: [
      'Configurar Google Analytics 4, GTM y herramientas de medición avanzadas',
      'Diseñar sistemas de etiquetado y atribución multicanal',
      'Construir dashboards ejecutivos con Looker Studio y Power BI',
      'Aplicar modelos de regresión y clustering a datos de marketing',
      'Implementar testing A/B con rigor estadístico',
      'Comunicar hallazgos analíticos a nivel directivo',
    ],
    modules: [
      { title: 'Fundamentos de Analítica Digital', hours: 6, description: 'Métricas clave, KPIs, modelos de atribución.' },
      { title: 'Google Analytics 4 y Tag Manager', hours: 7, description: 'Configuración avanzada, eventos personalizados, audiencias.' },
      { title: 'Visualización de Datos y Dashboards', hours: 7, description: 'Looker Studio, Power BI, storytelling con datos.' },
      { title: 'Estadística Aplicada al Marketing', hours: 6, description: 'Tests de hipótesis, regresión y correlación.' },
      { title: 'Analítica Predictiva', hours: 7, description: 'ML básico, modelos de propensión y pronóstico de ventas.' },
      { title: 'CRO y Testing A/B', hours: 6, description: 'Optimización de conversiones, diseño de experimentos.' },
      { title: 'Proyecto de Analítica Integral', hours: 6, description: 'Caso real: auditoría, implementación y reporte completo.' },
    ],
    methodology: 'Evaluación por proyectos prácticos con datos reales, presentaciones y examen final. Criterio: 70%.',
    ingressProfile: 'Profesionales de marketing o tecnología con experiencia en gestión de campañas digitales.',
    egressProfile: 'Analista digital senior capaz de diseñar sistemas de medición e interpretar datos complejos.',
    certification: 'Certificado UTAMV de Máster Profesional en Analítica Digital.',
  },
  'master-ia-empresarial': {
    type: 'Máster Profesional', title: 'IA para Negocios',
    hours: '55+', duration: '6 meses', modality: '100% en línea', level: 'Avanzado',
    pricing: { mxn: 8900, usd: 450, monthly: { months: 4, amount: 2400 } },
    description: 'Aplicación de inteligencia artificial en entornos empresariales: IA generativa, machine learning y automatización.',
    objectives: [
      'Dominar fundamentos de inteligencia artificial y machine learning',
      'Implementar soluciones de IA generativa para negocios',
      'Diseñar automatizaciones inteligentes para procesos empresariales',
      'Aplicar analítica predictiva para la toma de decisiones',
      'Comprender ética y gobernanza en implementación de IA',
      'Desarrollar proyectos reales de IA en entornos empresariales',
    ],
    modules: [
      { title: 'Fundamentos de Inteligencia Artificial', hours: 6, description: 'Historia, conceptos y tipos de IA.' },
      { title: 'Machine Learning para Negocios', hours: 7, description: 'Algoritmos, modelado predictivo y aplicaciones.' },
      { title: 'IA Generativa y Creatividad', hours: 6, description: 'GPT, DALL-E, MidJourney y aplicaciones en contenido.' },
      { title: 'Automatización Inteligente de Procesos', hours: 7, description: 'RPA, chatbots y optimización de flujos.' },
      { title: 'Analítica Predictiva y Business Intelligence', hours: 6, description: 'Modelado de datos, dashboards y decisiones estratégicas.' },
      { title: 'Ética y Gobernanza de la IA', hours: 5, description: 'Bias, privacidad, regulación global.' },
      { title: 'Proyecto Integral de IA', hours: 8, description: 'Solución real de IA para un problema empresarial.' },
    ],
    methodology: 'Evaluación por módulo: exámenes, ejercicios prácticos y proyecto final. Criterio: 70%.',
    ingressProfile: 'Profesionales en marketing, finanzas, operaciones o tecnología. Conocimientos básicos de Excel.',
    egressProfile: 'Profesional capacitado para liderar la implementación de IA en empresas.',
    certification: 'Certificado UTAMV de Máster Profesional en IA para Negocios.',
  },
  'master-transformacion-digital': {
    type: 'Máster Profesional', title: 'Transformación Digital',
    hours: '50+', duration: '6 meses', modality: '100% en línea', level: 'Avanzado',
    pricing: { mxn: 6900, usd: 350, monthly: { months: 4, amount: 1800 } },
    description: 'Liderazgo en transformación digital: estrategia, cultura y tecnología para cambios organizacionales.',
    objectives: [
      'Comprender el contexto de la transformación digital',
      'Diseñar estrategias de transformación para organizaciones',
      'Gestionar cambios culturales y organizacionales',
      'Implementar marcos de trabajo ágiles',
      'Medir el impacto y ROI de la transformación digital',
      'Desarrollar liderazgo digital para equipos multidisciplinarios',
    ],
    modules: [
      { title: 'Contexto y Drivers de la Transformación', hours: 5, description: 'Tendencias, disrupción y modelos de negocio digitales.' },
      { title: 'Estrategia Digital y Modelos de Negocio', hours: 6, description: 'Canvas, servitización, plataformas y datos.' },
      { title: 'Gestión del Cambio Cultural', hours: 7, description: 'Resistencia, liderazgo transformacional y cultura.' },
      { title: 'Metodologías Ágiles y Gestión Moderna', hours: 6, description: 'Scrum, Kanban, Design Thinking y Lean.' },
      { title: 'Stack Tecnológico para Transformación', hours: 6, description: 'Cloud, APIs, microservicios y arquitectura.' },
      { title: 'Métricas y ROI de la Transformación', hours: 5, description: 'KPIs digitales, valorización de datos.' },
      { title: 'Proyecto de Transformación Digital', hours: 8, description: 'Plan de transformación para una organización real.' },
    ],
    methodology: 'Evaluación por ejercicios prácticos, case studies y proyecto final. Criterio: 70%.',
    ingressProfile: 'Directivos, gerentes o profesionales con experiencia en liderazgo.',
    egressProfile: 'Líder digital capaz de ejecutar estrategias de transformación y medir resultados.',
    certification: 'Certificado UTAMV de Máster Profesional en Transformación Digital.',
  },

  // ── DIPLOMADOS ──
  'diplomado-seo-avanzado': {
    type: 'Diplomado', title: 'SEO y AEO Avanzado',
    hours: '30', duration: '2 meses', modality: '100% en línea', level: 'Intermedio',
    pricing: { mxn: 4900, usd: 250, monthly: { months: 2, amount: 2600 } },
    description: 'Formación especializada en optimización para motores de búsqueda (SEO) y motores de respuesta con IA (AEO).',
    objectives: [
      'Realizar auditorías SEO técnicas completas',
      'Optimizar para Google, Bing, AI Overviews y motores de respuesta',
      'Diseñar arquitectura de información y enlazado interno estratégico',
      'Implementar Schema Markup y datos estructurados avanzados',
      'Crear estrategias de contenido para featured snippets y AEO',
      'Medir y reportar rendimiento SEO con herramientas profesionales',
    ],
    modules: [
      { title: 'Auditoría SEO Técnica', hours: 5, description: 'Crawling, indexación, Core Web Vitals, velocidad.' },
      { title: 'SEO On-Page Avanzado', hours: 5, description: 'Contenido, títulos, meta descriptions, NLP.' },
      { title: 'SEO Off-Page y Link Building', hours: 4, description: 'Autoridad, digital PR, outreach, backlinks.' },
      { title: 'Schema Markup y Datos Estructurados', hours: 4, description: 'JSON-LD, rich snippets, FAQ schema.' },
      { title: 'AEO: Optimización para Motores de IA', hours: 5, description: 'ChatGPT, Perplexity, Google AI Overviews.' },
      { title: 'Herramientas y Reporting', hours: 4, description: 'Search Console, Ahrefs, SEMrush, Screaming Frog.' },
      { title: 'Proyecto SEO Integral', hours: 3, description: 'Auditoría y ejecución para un sitio web real.' },
    ],
    methodology: 'Auditorías prácticas, ejercicios con herramientas reales y proyecto final. Criterio: 70%.',
    ingressProfile: 'Profesionales de marketing digital o desarrolladores web con conocimientos básicos de SEO.',
    egressProfile: 'Especialista SEO/AEO capaz de posicionar sitios en buscadores y motores de IA.',
    certification: 'Diplomado UTAMV en SEO y AEO Avanzado.',
  },
  'diplomado-ia-marketing': {
    type: 'Diplomado', title: 'Inteligencia Artificial para Marketing',
    hours: '25', duration: '2 meses', modality: '100% en línea', level: 'Intermedio',
    pricing: { mxn: 4900, usd: 250, monthly: { months: 2, amount: 2600 } },
    description: 'Aplicación práctica de herramientas de IA en automatización de campañas, análisis predictivo y generación de contenido.',
    objectives: [
      'Implementar IA generativa para creación de contenido',
      'Automatizar flujos de marketing con herramientas de IA',
      'Aplicar análisis predictivo para segmentación y targeting',
      'Personalizar experiencias del cliente a escala con IA',
      'Evaluar herramientas de IA para marketing',
      'Medir el impacto de la IA en métricas de negocio',
    ],
    modules: [
      { title: 'Fundamentos de IA para Marketers', hours: 4, description: 'Conceptos clave, tipos de IA y prompting efectivo.' },
      { title: 'IA Generativa para Contenido', hours: 5, description: 'ChatGPT, Claude, Midjourney, workflows de creación.' },
      { title: 'Automatización de Campañas con IA', hours: 5, description: 'Zapier AI, Make, HubSpot AI, nurturing.' },
      { title: 'Análisis Predictivo para Marketing', hours: 4, description: 'Modelos de propensión, churn prediction, LTV.' },
      { title: 'Personalización y Segmentación Inteligente', hours: 4, description: 'Recomendaciones, contenido dinámico.' },
      { title: 'Proyecto de IA en Marketing', hours: 3, description: 'Solución real de IA en un flujo de marketing.' },
    ],
    methodology: 'Proyectos prácticos con herramientas reales de IA, presentaciones y caso final. Criterio: 70%.',
    ingressProfile: 'Profesionales de marketing digital, community managers o analistas con interés en IA.',
    egressProfile: 'Profesional de marketing capaz de integrar IA para aumentar productividad y resultados.',
    certification: 'Diplomado UTAMV en Inteligencia Artificial para Marketing.',
  },
  'diplomado-programacion-fullstack': {
    type: 'Diplomado', title: 'Programación Full Stack',
    hours: '40', duration: '3 meses', modality: '100% en línea', level: 'Intermedio',
    pricing: { mxn: 7900, usd: 400, monthly: { months: 3, amount: 2800 } },
    description: 'Desarrollo web completo: JavaScript, TypeScript, React, Node.js y bases de datos.',
    objectives: [
      'Dominar HTML, CSS y JavaScript moderno (ES6+)',
      'Construir interfaces reactivas con React y TypeScript',
      'Desarrollar APIs REST con Node.js y Express',
      'Gestionar bases de datos SQL y NoSQL',
      'Implementar autenticación y seguridad web',
      'Desplegar aplicaciones en servicios cloud',
    ],
    modules: [
      { title: 'Fundamentos Web: HTML, CSS, JavaScript', hours: 6, description: 'Estructura, estilos, responsividad.' },
      { title: 'JavaScript Avanzado y TypeScript', hours: 6, description: 'Async/await, módulos, tipos y patrones.' },
      { title: 'React: Frontend Moderno', hours: 7, description: 'Componentes, hooks, routing, estado global.' },
      { title: 'Node.js y APIs REST', hours: 6, description: 'Express, middleware, validación.' },
      { title: 'Bases de Datos y ORM', hours: 5, description: 'PostgreSQL, MongoDB, Prisma/Supabase.' },
      { title: 'Autenticación y Seguridad', hours: 4, description: 'JWT, OAuth, CORS, XSS, CSRF.' },
      { title: 'DevOps y Despliegue', hours: 3, description: 'Git, CI/CD, Docker, Vercel.' },
      { title: 'Proyecto Full Stack', hours: 3, description: 'Aplicación web completa desde diseño hasta producción.' },
    ],
    methodology: 'Entregas de código en GitHub, code reviews, pair programming y proyecto final. Criterio: 70%.',
    ingressProfile: 'Personas con interés en programación web. No requiere experiencia previa.',
    egressProfile: 'Desarrollador full stack junior capaz de construir y desplegar aplicaciones web.',
    certification: 'Diplomado UTAMV en Programación Full Stack.',
  },

  // ── CERTIFICADOS ──
  'certificado-marketing-digital': {
    type: 'Certificado Profesional', title: 'Marketing Digital',
    hours: '5', duration: '1 semana', modality: '100% en línea', level: 'Introductorio',
    pricing: { mxn: 1200, usd: 60 },
    description: 'Conceptos esenciales del marketing digital: ecosistema, herramientas y posicionamiento.',
    objectives: [
      'Comprender el ecosistema del marketing digital',
      'Identificar herramientas esenciales de análisis y gestión',
      'Conocer fundamentos de SEO y publicidad digital',
      'Desarrollar un plan básico de presencia digital',
    ],
    modules: [
      { title: 'Ecosistema Digital y Tendencias', hours: 1.5, description: 'Panorama, canales y oportunidades.' },
      { title: 'Herramientas y Plataformas Esenciales', hours: 1.5, description: 'Google Analytics, redes sociales, CMS.' },
      { title: 'Fundamentos de SEO y Publicidad', hours: 2, description: 'Principios de optimización y campañas básicas.' },
    ],
    methodology: 'Quiz al finalizar cada bloque temático. Criterio: 60%.',
    ingressProfile: 'Cualquier persona interesada en marketing digital. Sin experiencia previa.',
    egressProfile: 'Profesional con conocimientos fundamentales para gestionar presencia digital.',
    certification: 'Certificado UTAMV de Formación Profesional en Marketing Digital.',
  },
  'certificado-analitica-digital': {
    type: 'Certificado Profesional', title: 'Analítica Digital',
    hours: '8', duration: '2 semanas', modality: '100% en línea', level: 'Introductorio',
    pricing: { mxn: 1200, usd: 60 },
    description: 'Medición de resultados digitales, configuración de herramientas y toma de decisiones basada en datos.',
    objectives: [
      'Configurar Google Analytics 4 para un sitio web',
      'Interpretar métricas clave de tráfico, conversión y comportamiento',
      'Crear reportes y dashboards básicos',
      'Tomar decisiones informadas basadas en datos',
    ],
    modules: [
      { title: 'Introducción a la Analítica Digital', hours: 2, description: 'Conceptos, métricas y modelos de datos.' },
      { title: 'Google Analytics 4: Configuración y Uso', hours: 3, description: 'Instalación, eventos, conversiones, reportes.' },
      { title: 'Dashboards y Reporting', hours: 3, description: 'Looker Studio, visualización y comunicación.' },
    ],
    methodology: 'Quiz y ejercicio práctico de configuración. Criterio: 60%.',
    ingressProfile: 'Profesionales que necesiten medir resultados digitales.',
    egressProfile: 'Profesional capaz de configurar herramientas de medición y tomar decisiones con datos.',
    certification: 'Certificado UTAMV de Formación Profesional en Analítica Digital.',
  },
  'certificado-seguridad-web': {
    type: 'Certificado Profesional', title: 'Seguridad Web',
    hours: '6', duration: '2 semanas', modality: '100% en línea', level: 'Introductorio',
    pricing: { mxn: 1200, usd: 60 },
    description: 'Protección de datos, ciberseguridad básica y cumplimiento normativo (GDPR, LGPD).',
    objectives: [
      'Comprender fundamentos de seguridad web',
      'Identificar vulnerabilidades comunes (OWASP Top 10)',
      'Implementar medidas básicas de protección de datos',
      'Conocer obligaciones legales en materia de privacidad',
    ],
    modules: [
      { title: 'Fundamentos de Ciberseguridad', hours: 2, description: 'Amenazas, vectores de ataque y defensa.' },
      { title: 'Vulnerabilidades Web y OWASP', hours: 2, description: 'XSS, SQL Injection, CSRF y prevención.' },
      { title: 'Privacidad y Cumplimiento Normativo', hours: 2, description: 'GDPR, LGPD, avisos de privacidad.' },
    ],
    methodology: 'Quiz por módulo y ejercicio de auditoría básica. Criterio: 60%.',
    ingressProfile: 'Desarrolladores, administradores web o profesionales que gestionan datos.',
    egressProfile: 'Profesional capaz de identificar riesgos de seguridad y aplicar medidas preventivas.',
    certification: 'Certificado UTAMV de Formación Profesional en Seguridad Web.',
  },
  'certificado-ia-basica': {
    type: 'Certificado Profesional', title: 'Inteligencia Artificial Básica',
    hours: '5', duration: '1 semana', modality: '100% en línea', level: 'Introductorio',
    pricing: { mxn: 1200, usd: 60 },
    description: 'Fundamentos de IA, machine learning y aplicaciones prácticas para profesionales no técnicos.',
    objectives: [
      'Comprender qué es la IA y sus tipos principales',
      'Usar herramientas de IA generativa de forma efectiva',
      'Identificar oportunidades de aplicación de IA',
      'Evaluar limitaciones y riesgos del uso de IA',
    ],
    modules: [
      { title: 'Qué es la Inteligencia Artificial', hours: 1.5, description: 'Historia, tipos de IA, ML y DL explicados.' },
      { title: 'IA Generativa en la Práctica', hours: 2, description: 'ChatGPT, Claude, Gemini: prompting y casos de uso.' },
      { title: 'IA en tu Industria', hours: 1.5, description: 'Aplicaciones por sector, ética y futuro.' },
    ],
    methodology: 'Quiz y ejercicio práctico con herramientas de IA. Criterio: 60%.',
    ingressProfile: 'Profesionales de cualquier área interesados en IA. Sin conocimientos técnicos.',
    egressProfile: 'Profesional informado sobre IA, capaz de usar herramientas generativas.',
    certification: 'Certificado UTAMV de Formación Profesional en IA Básica.',
  },

  // ── DOCTORADO ──
  'doctorado-inteligencia-estrategica': {
    type: 'Doctorado Profesional', title: 'Inteligencia Estratégica Digital',
    hours: '120+', duration: '12 meses', modality: '100% en línea', level: 'Especialización',
    pricing: { mxn: 29900, usd: 1500, monthly: { months: 10, amount: 3200 } },
    description: 'Programa de investigación aplicada orientado a la dirección estratégica digital. Para profesionales senior que buscan liderar con base en investigación y datos.',
    objectives: [
      'Desarrollar investigación aplicada en marketing digital e IA',
      'Diseñar marcos estratégicos para organizaciones complejas',
      'Producir conocimiento publicable en marketing digital',
      'Liderar procesos de transformación digital con evidencia',
    ],
    modules: [
      { title: 'Metodología de Investigación Aplicada', hours: 15, description: 'Diseño de investigación, métodos mixtos.' },
      { title: 'Teoría Avanzada del Marketing Digital', hours: 15, description: 'Marcos teóricos, modelos de atribución.' },
      { title: 'IA y Automatización Estratégica', hours: 20, description: 'ML aplicado, NLP y analítica predictiva.' },
      { title: 'Seminario de Tesis I', hours: 20, description: 'Problema, marco teórico y metodología.' },
      { title: 'Seminario de Tesis II', hours: 20, description: 'Trabajo de campo, análisis y hallazgos.' },
      { title: 'Publicación y Defensa', hours: 30, description: 'Artículo, presentación y defensa de tesis.' },
    ],
    methodology: 'Portafolio de investigación, seminarios de avance y defensa de tesis ante comité académico.',
    ingressProfile: 'Profesionales con título de máster o 5+ años en dirección digital.',
    egressProfile: 'Investigador-profesional capaz de generar conocimiento original y dirigir equipos estratégicos.',
    certification: 'Grado de Doctor Profesional en Inteligencia Estratégica Digital, emitido por UTAMV.',
  },

  // Backward compat
  'fundamentos-marketing-digital': {
    type: 'Certificado Profesional', title: 'Fundamentos de Marketing Digital',
    hours: '5', duration: '1 semana', modality: '100% en línea', level: 'Introductorio',
    pricing: { mxn: 1200, usd: 60 },
    description: 'Programa introductorio que cubre los conceptos esenciales del marketing digital.',
    objectives: ['Comprender el ecosistema del marketing digital', 'Identificar herramientas esenciales', 'Conocer fundamentos de SEO', 'Desarrollar un plan básico'],
    modules: [
      { title: 'Ecosistema Digital y Tendencias', hours: 1.5, description: 'Panorama, canales y oportunidades.' },
      { title: 'Herramientas y Plataformas Esenciales', hours: 1.5, description: 'Google Analytics, redes sociales y CMS.' },
      { title: 'Fundamentos de SEO y Publicidad', hours: 2, description: 'Principios de optimización y campañas básicas.' },
    ],
    methodology: 'Quiz al finalizar cada bloque. Criterio: 60%.',
    ingressProfile: 'Cualquier persona interesada en marketing digital.',
    egressProfile: 'Profesional con conocimientos fundamentales de presencia digital.',
    certification: 'Certificado UTAMV de Formación Profesional.',
  },
  'certificado-profesional': {
    type: 'Certificado Profesional', title: 'Programa Introductorio',
    hours: '5–8', duration: '1–2 semanas', modality: '100% en línea', level: 'Introductorio',
    pricing: { mxn: 1200, usd: 60 },
    description: 'Programa introductorio para explorar áreas específicas del marketing digital, tecnología o IA.',
    objectives: ['Comprender conceptos esenciales del área', 'Usar herramientas básicas', 'Evaluar si la especialización es adecuada'],
    modules: [
      { title: 'Introducción al Área', hours: 2, description: 'Panorama, conceptos y oportunidades.' },
      { title: 'Herramientas y Prácticas', hours: 3, description: 'Ejercicios con herramientas reales.' },
    ],
    methodology: 'Quiz de evaluación. Criterio: 60%.',
    ingressProfile: 'Sin experiencia previa.',
    egressProfile: 'Profesional con bases para decidir su especialización.',
    certification: 'Certificado UTAMV de Formación Profesional.',
  },
};

const ProgramDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [academicMetadata, setAcademicMetadata] = useState<AcademicCourseMetadata | null>(null);

  const program = slug ? programsData[slug] : null;

  useEffect(() => {
    let mounted = true;
    if (!slug) return;
    fetchAcademicCourseMetadata(slug).then((metadata) => {
      if (mounted) setAcademicMetadata(metadata);
    });
    return () => { mounted = false; };
  }, [slug]);

  if (!program) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 text-center">
          <h1 className="font-display text-2xl text-foreground mb-4">Programa no encontrado</h1>
          <p className="text-muted-foreground mb-6">El programa solicitado no existe en nuestro catálogo.</p>
          <Button variant="outline" asChild>
            <Link to="/programas">Ver catálogo completo</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <Link to="/programas" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Catálogo de programas
          </Link>
        </div>

        {/* Header */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <span className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                {program.type}
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                {program.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{program.hours} horas</div>
                <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4" />{program.duration}</div>
                <div className="flex items-center gap-2"><Monitor className="w-4 h-4" />{program.modality}</div>
                <div className="flex items-center gap-2"><BarChart3 className="w-4 h-4" />{program.level}</div>
              </div>

              {/* Pricing badge */}
              <div className="mt-6 inline-flex items-center gap-4 px-5 py-3 rounded-xl border border-border bg-card/50">
                <div>
                  <span className="text-2xl font-display font-bold text-foreground">
                    ${program.pricing.mxn.toLocaleString('es-MX')}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">MXN</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    (≈ ${program.pricing.usd.toLocaleString('en-US')} USD)
                  </span>
                </div>
                {program.pricing.monthly && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground border-l border-border pl-4">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>{program.pricing.monthly.months} meses de ${program.pricing.monthly.amount.toLocaleString('es-MX')} MXN</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Description */}
            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-4 tracking-wider uppercase">Descripción General</h2>
              <p className="text-muted-foreground leading-relaxed">{program.description}</p>
            </section>

            {/* Objectives */}
            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-4 tracking-wider uppercase">Objetivos y Resultados de Aprendizaje</h2>
              <div className="space-y-3">
                {program.objectives.map((obj: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-card/50 border border-border">
                    <CheckCircle className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{obj}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Plan de estudios */}
            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-4 tracking-wider uppercase">Plan de Estudios</h2>
              <div className="space-y-2">
                {program.modules.map((mod: ProgramModule, i: number) => (
                  <button
                    key={i}
                    onClick={() => setExpandedModule(expandedModule === i ? null : i)}
                    className="w-full text-left p-4 rounded-lg border border-border bg-card/30 hover:bg-card/60 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-semibold text-foreground">
                          Módulo {i + 1}: {mod.title}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{mod.hours}h</span>
                    </div>
                    {expandedModule === i && (
                      <p className="text-xs text-muted-foreground mt-3 ml-7">{mod.description}</p>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Methodology */}
            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-4 tracking-wider uppercase">Metodología y Evaluación</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{program.methodology}</p>
            </section>

            {/* Profiles */}
            <div className="grid md:grid-cols-2 gap-8">
              <section className="p-6 rounded-xl border border-border bg-card/30">
                <h3 className="font-display text-sm font-semibold text-foreground mb-3 tracking-wider uppercase">Perfil de Ingreso</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{program.ingressProfile}</p>
              </section>
              <section className="p-6 rounded-xl border border-border bg-card/30">
                <h3 className="font-display text-sm font-semibold text-foreground mb-3 tracking-wider uppercase">Perfil de Egreso</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{program.egressProfile}</p>
              </section>
            </div>

            {/* Certification */}
            <section className="p-8 rounded-xl border border-border bg-card/30">
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-muted-foreground shrink-0 mt-1" />
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-3 tracking-wider uppercase">Certificación UTAMV</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{program.certification}</p>
                  <Link to="/verificar-certificado" className="inline-block mt-4 text-xs font-semibold text-muted-foreground tracking-wider hover:text-foreground hover:underline transition-colors">
                    Verificar un certificado →
                  </Link>
                </div>
              </div>
            </section>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button variant="outline" size="lg" asChild>
                <Link to="/admisiones">Solicitar admisión</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link to="/campus-virtual">Acceder como estudiante</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProgramDetail;