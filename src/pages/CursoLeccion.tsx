import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronLeft, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { findCurriculumCourse } from '@/data/curriculumMarkdown';
import { loadMarkdownBlock } from '@/lib/markdownLessonLoader';
import { markdownLessonIndex, type MarkdownCourseKey } from '@/lib/markdownLessonIndex';
import { Button } from '@/components/ui/button';

const CursoLeccion = () => {
  const { cursoSlug, moduloSlug, leccionSlug } = useParams<{
    cursoSlug: string;
    moduloSlug: string;
    leccionSlug: string;
  }>();

  const data = useMemo(() => {
    const course = cursoSlug ? findCurriculumCourse(cursoSlug) : undefined;
    if (!course) return null;
    const module = course.modules.find((m) => m.slug === moduloSlug);
    if (!module) return { course, module: null, lesson: null, content: '', nextLesson: null };
    const lesson = module.lessons.find((l) => l.slug === leccionSlug);
    if (!lesson) return { course, module, lesson: null, content: '', nextLesson: null };

    let content = '';
    if (lesson.type === 'markdown') {
      content = loadMarkdownBlock({
        courseKey: course.sourceKey as MarkdownCourseKey,
        blockId: lesson.blockId,
      });
    } else {
      content = lesson.content;
    }

    // Calcular siguiente lección (dentro del módulo o siguiente módulo)
    const idx = module.lessons.findIndex((l) => l.slug === leccionSlug);
    let nextLesson: { moduloSlug: string; leccionSlug: string; title: string } | null = null;
    if (idx >= 0 && idx < module.lessons.length - 1) {
      const next = module.lessons[idx + 1];
      nextLesson = { moduloSlug: module.slug, leccionSlug: next.slug, title: next.title };
    } else {
      const mIdx = course.modules.findIndex((m) => m.slug === moduloSlug);
      const nextModule = course.modules[mIdx + 1];
      if (nextModule && nextModule.lessons[0]) {
        nextLesson = {
          moduloSlug: nextModule.slug,
          leccionSlug: nextModule.lessons[0].slug,
          title: `${nextModule.title} · ${nextModule.lessons[0].title}`,
        };
      }
    }

    return { course, module, lesson, content, nextLesson };
  }, [cursoSlug, moduloSlug, leccionSlug]);

  if (!data) {
    return <Navigate to="/catalogo" replace />;
  }

  const { course, module, lesson, content, nextLesson } = data;

  // Si solo viene curso, mostrar tabla de contenidos
  if (!module) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/catalogo">
              <Button variant="ghost" className="gap-2">
                <ChevronLeft className="w-4 h-4" /> Catálogo
              </Button>
            </Link>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">{course.level}</span>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">{course.title}</h1>
          <p className="text-muted-foreground mb-8">{course.description}</p>
          <div className="space-y-4">
            {course.modules.map((m) => (
              <div key={m.id} className="card-elite p-6">
                <h2 className="font-display text-xl font-semibold mb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" /> {m.title}
                </h2>
                {m.description && <p className="text-sm text-muted-foreground mb-4">{m.description}</p>}
                <ul className="space-y-2">
                  {m.lessons.map((l) => (
                    <li key={l.slug}>
                      <Link
                        to={`/curriculum/${course.slug}/${m.slug}/${l.slug}`}
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-colors"
                      >
                        <span className="text-sm">{l.order}. {l.title}</span>
                        {l.estimatedMinutes && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {l.estimatedMinutes} min
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return <Navigate to={`/curriculum/${course.slug}`} replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to={`/curriculum/${course.slug}`}>
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className="w-4 h-4" /> {course.title}
            </Button>
          </Link>
          {lesson.estimatedMinutes && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" /> {lesson.estimatedMinutes} min
            </span>
          )}
        </div>
      </header>
      <article className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            {module.title}
          </p>
          <h1 className="text-3xl font-display font-bold text-foreground">{lesson.title}</h1>
        </div>
        <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-a:text-primary prose-li:text-foreground/90">
          {content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          ) : (
            <p className="text-muted-foreground italic">Contenido no disponible para esta lección.</p>
          )}
        </div>
        {nextLesson && (
          <div className="mt-12 pt-6 border-t border-border flex justify-end">
            <Link to={`/curriculum/${course.slug}/${nextLesson.moduloSlug}/${nextLesson.leccionSlug}`}>
              <Button className="gap-2">
                Siguiente: {nextLesson.title} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </article>
    </div>
  );
};

export default CursoLeccion;
