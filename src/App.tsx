import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

// Pages
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import ResetPassword from "@/pages/ResetPassword";
import Dashboard from "@/pages/Dashboard";
import Modulos from "@/pages/Modulos";
import ModuleViewer from "@/pages/ModuleViewer";
import Certificacion from "@/pages/Certificacion";
import Programas from "@/pages/Programas";
import ProgramDetail from "@/pages/ProgramDetail";
import Investigacion from "@/pages/Investigacion";
import Ayuda from "@/pages/Ayuda";
import Inscripcion from "@/pages/Inscripcion";
import Settings from "@/pages/Settings";
import VerifyCertificate from "@/pages/VerifyCertificate";
import Expertos from "@/pages/Expertos";
import PreguntasFrecuentes from "@/pages/PreguntasFrecuentes";
import NotFound from "@/pages/NotFound";
import PlaceholderPage from "@/pages/PlaceholderPage";
import Catalogo from "@/pages/Catalogo";
import Colabora from "@/pages/Colabora";
import Maestrias from "@/pages/programs/Maestrias";
import MasterProfesional from "@/pages/programs/MasterProfesional";
import Diplomados from "@/pages/programs/Diplomados";
import Certificaciones from "@/pages/programs/Certificaciones";
import Rectoria from "@/pages/docentes/Rectoria";
import Directivos from "@/pages/docentes/Directivos";
import Profesores from "@/pages/docentes/Profesores";
import Proyectos from "@/pages/investigacion/Proyectos";
import Publicaciones from "@/pages/investigacion/Publicaciones";
import Requisitos from "@/pages/admisiones/Requisitos";
import Proceso from "@/pages/admisiones/Proceso";
import Contacto from "@/pages/admisiones/Contacto";

// Checkout Pages
import ProgramCheckout from "@/pages/checkout/ProgramCheckout";
import CheckoutSuccess from "@/pages/checkout/CheckoutSuccess";
import CheckoutCancel from "@/pages/checkout/CheckoutCancel";

// Campus Pages
import Enrollments from "@/pages/campus/Enrollments";
import Certificates from "@/pages/campus/Certificates";
import Campus from "@/pages/Campus";
import ControlEscolar from "@/pages/ControlEscolar";
import CursoLeccion from "@/pages/CursoLeccion";
import Colaboraciones from "@/pages/admin/Colaboraciones";

// Route Guards
import { RequireAuth } from "@/components/guards/RequireAuth";
import { RequirePaid } from "@/components/guards/RequirePaid";
import { RequireAdmin } from "@/components/guards/RequireAdmin";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Programas */}
        <Route path="/programas" element={<Programas />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/colabora" element={<Colabora />} />
        <Route path="/curriculum/:cursoSlug" element={<CursoLeccion />} />
        <Route path="/curriculum/:cursoSlug/:moduloSlug/:leccionSlug" element={<CursoLeccion />} />
        <Route path="/programas/:slug" element={<ProgramDetail />} />
        <Route path="/programas/maestrias" element={<Maestrias />} />
        <Route path="/programas/master-profesional" element={<MasterProfesional />} />
        <Route path="/programas/diplomados" element={<Diplomados />} />
        <Route path="/programas/certificaciones" element={<Certificaciones />} />
        
        {/* Docentes */}
        <Route path="/docentes" element={<Expertos />} />
        <Route path="/docentes/rectoria" element={<Rectoria />} />
        <Route path="/docentes/directivos" element={<Directivos />} />
        <Route path="/docentes/profesores" element={<Profesores />} />
        
        {/* Investigación */}
        <Route path="/investigacion" element={<Investigacion />} />
        <Route path="/investigacion/proyectos" element={<Proyectos />} />
        <Route path="/investigacion/publicaciones" element={<Publicaciones />} />
        
        {/* Admisiones */}
        <Route path="/admisiones" element={<Inscripcion />} />
        <Route path="/admisiones/requisitos" element={<Requisitos />} />
        <Route path="/admisiones/proceso" element={<Proceso />} />
        <Route path="/admisiones/contacto" element={<Contacto />} />
        
        {/* Otras rutas públicas */}
        <Route path="/ayuda" element={<Ayuda />} />
        <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
        <Route path="/verificar-certificado" element={<VerifyCertificate />} />
        <Route path="/verificar-certificado/:publicId" element={<VerifyCertificate />} />

        {/* CHECKOUT */}
        <Route path="/checkout/:programSlug" element={<RequireAuth><ProgramCheckout /></RequireAuth>} />
        <Route path="/checkout/success" element={<RequireAuth><CheckoutSuccess /></RequireAuth>} />
        <Route path="/checkout/cancel" element={<RequireAuth><CheckoutCancel /></RequireAuth>} />

        {/* Redirects */}
        <Route path="/programa" element={<Navigate to="/programas/master-marketing-digital-2026" replace />} />
        <Route path="/expertos" element={<Navigate to="/docentes" replace />} />
        <Route path="/inscripcion" element={<Navigate to="/admisiones" replace />} />
        <Route path="/certificacion" element={<Navigate to="/campus-virtual" replace />} />
        <Route path="/dashboard" element={<Navigate to="/campus-virtual" replace />} />

        {/* CAMPUS VIRTUAL */}
        <Route path="/campus-virtual" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/campus" element={<RequireAuth><Campus /></RequireAuth>} />
        <Route path="/campus/enrollments" element={<RequireAuth><Enrollments /></RequireAuth>} />
        <Route path="/campus/certificates" element={<RequireAuth><Certificates /></RequireAuth>} />
        <Route path="/control-escolar" element={<RequireAuth><RequireAdmin><ControlEscolar /></RequireAdmin></RequireAuth>} />
        <Route path="/admin/colaboraciones" element={<RequireAuth><RequireAdmin><Colaboraciones /></RequireAdmin></RequireAuth>} />
        <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
        <Route path="/modulos" element={<RequireAuth><RequirePaid><Modulos /></RequirePaid></RequireAuth>} />
        <Route path="/modulos/:id" element={<RequireAuth><RequirePaid><ModuleViewer /></RequirePaid></RequireAuth>} />
        <Route path="/module/:moduleIndex" element={<RequireAuth><RequirePaid><ModuleViewer /></RequirePaid></RequireAuth>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
