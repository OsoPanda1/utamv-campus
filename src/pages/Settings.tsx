import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import {
  ChevronLeft,
  Settings as SettingsIcon,
  User,
  Bell,
  Film,
  Camera,
  Save,
  CreditCard,
  Mail,
  Shield,
  ExternalLink,
} from 'lucide-react';

const Settings = () => {
  const { user, loading, isPaid, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [orcidId, setOrcidId] = useState<string | null>(null);
  const [orcidConnected, setOrcidConnected] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [showIntro, setShowIntro] = useState(() => {
    return localStorage.getItem('utamv-disable-intro') !== 'true';
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }
    if (user) {
      setFullName(user.user_metadata?.full_name || '');
      fetchProfile();
    }
  }, [user, loading, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await (supabase as any)
      .from('profiles')
      .select('avatar_url, full_name, orcid_id, orcid_connected')
      .eq('user_id', user.id)
      .maybeSingle();
    if (data) {
      setAvatarUrl(data.avatar_url);
      if (data.full_name) setFullName(data.full_name);
      setOrcidId((data as any).orcid_id ?? null);
      setOrcidConnected(Boolean((data as any).orcid_connected));
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({ title: 'Error', description: 'La imagen no puede superar 2 MB.', variant: 'destructive' });
      return;
    }

    setUploading(true);
    const ext = file.name.split('.').pop();
    const filePath = `${user.id}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast({ title: 'Error', description: 'No se pudo subir la imagen.', variant: 'destructive' });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
    const publicUrl = urlData.publicUrl + '?t=' + Date.now();

    await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('user_id', user.id);
    setAvatarUrl(publicUrl);
    setUploading(false);
    toast({ title: 'Avatar actualizado' });
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('user_id', user.id);

    if (error) {
      toast({ title: 'Error', description: 'No se pudo guardar.', variant: 'destructive' });
    } else {
      toast({ title: 'Perfil actualizado' });
    }
    setSaving(false);
  };

  const handleIntroToggle = (enabled: boolean) => {
    setShowIntro(enabled);
    if (enabled) {
      localStorage.removeItem('utamv-disable-intro');
      sessionStorage.removeItem('utamv-intro-seen');
    } else {
      localStorage.setItem('utamv-disable-intro', 'true');
    }
  };

  const handleConnectOrcid = () => {
    window.location.href = '/auth/orcid/start';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/campus-virtual')} className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Campus Virtual
            </Button>
            <div className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-silver" />
              <h1 className="font-display text-xl font-bold text-foreground">Configuración</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        {/* Profile Section */}
        <section className="card-elite p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-silver" />
            <h2 className="font-display text-lg font-semibold text-foreground">Perfil</h2>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <div className="relative group">
              <Avatar className="w-20 h-20 border-2 border-border">
                <AvatarImage src={avatarUrl || undefined} />
                <AvatarFallback className="text-xl bg-primary/20 text-primary">
                  {(fullName || user?.email || 'U')[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <Label className="text-muted-foreground text-sm">Nombre completo</Label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Tu nombre" />
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">Correo electrónico</Label>
                <p className="text-foreground text-sm">{user?.email}</p>
              </div>
            </div>
          </div>

          <Button onClick={handleSaveProfile} disabled={saving} className="gap-2">
            <Save className="w-4 h-4" />
            {saving ? 'Guardando...' : 'Guardar perfil'}
          </Button>
        </section>

        <section className="card-elite p-6">
          <div className="flex items-center gap-3 mb-4">
            <ExternalLink className="w-5 h-5 text-silver" />
            <h2 className="font-display text-lg font-semibold text-foreground">Identidad académica ORCID</h2>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Conecta tu perfil para autoría, trazabilidad docente y publicación académica.</p>
              <p className="mt-2 text-sm text-foreground">{orcidConnected && orcidId ? `ORCID conectado: ${orcidId}` : 'ORCID no conectado'}</p>
            </div>
            <Button variant="outline" onClick={handleConnectOrcid} className="gap-2">
              <ExternalLink className="w-4 h-4" />
              {orcidConnected ? 'Reconectar ORCID' : 'Conectar ORCID'}
            </Button>
          </div>
        </section>

        {/* Account Status */}
        <section className="card-elite p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-silver" />
            <h2 className="font-display text-lg font-semibold text-foreground">Estado de cuenta</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Rol</span>
              <p className="text-foreground font-medium capitalize">{isAdmin ? 'Administrador' : 'Estudiante'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Acceso</span>
              <p className={`font-medium ${isPaid || isAdmin ? 'text-green-500' : 'text-muted-foreground'}`}>
                {isPaid || isAdmin ? '✓ Activo' : 'Sin pago'}
              </p>
            </div>
          </div>
        </section>

        {/* Presentation */}
        <section className="card-elite p-6">
          <div className="flex items-center gap-3 mb-6">
            <Film className="w-5 h-5 text-silver" />
            <h2 className="font-display text-lg font-semibold text-foreground">Presentación</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="intro-toggle" className="text-foreground font-medium">Intro cinematográfica</Label>
              <p className="text-sm text-muted-foreground">Mostrar la animación al iniciar</p>
            </div>
            <Switch id="intro-toggle" checked={showIntro} onCheckedChange={handleIntroToggle} />
          </div>
        </section>

        {/* Notifications */}
        <section className="card-elite p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-silver" />
            <h2 className="font-display text-lg font-semibold text-foreground">Notificaciones</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Correos de progreso</Label>
                <p className="text-sm text-muted-foreground">Recibir resúmenes semanales</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Nuevos módulos</Label>
                <p className="text-sm text-muted-foreground">Notificar contenido nuevo</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="card-elite p-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-silver" />
            <h2 className="font-display text-lg font-semibold text-foreground">Contacto</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Para soporte directo escríbenos a{' '}
            <a href="mailto:tamvonlinenetwork@outlook.es" className="text-primary hover:underline">
              tamvonlinenetwork@outlook.es
            </a>
          </p>
        </section>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground pt-4 pb-8">
          Plataforma creada con Tecnología TAMV ONLINE — "Orgullosamente Realmontenses"
          <br />
          No imitamos el futuro. Nosotros somos el futuro, lo soñamos, lo creamos, lo sentimos y definitivamente lo vivimos.
        </p>
      </main>
    </div>
  );
};

export default Settings;
