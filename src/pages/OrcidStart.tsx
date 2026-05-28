import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { invokeScholarlyIntegration } from '@/lib/scholarly';

const OrcidStart = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const start = async () => {
      try {
        const redirectUri = `${window.location.origin}/auth/orcid/callback`;
        const result = await invokeScholarlyIntegration<{ authUrl: string }>({ operation: 'orcid_start', redirectUri });
        window.location.href = result.authUrl;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudo iniciar ORCID.');
      }
    };
    start();
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="font-display text-2xl font-bold text-foreground">Conectando ORCID</h1>
        <p className="text-sm text-muted-foreground">Preparando autorización académica segura.</p>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {error && <Button variant="outline" asChild><Link to="/settings">Volver al perfil</Link></Button>}
      </div>
    </div>
  );
};

export default OrcidStart;
