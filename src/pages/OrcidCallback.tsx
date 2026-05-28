import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { invokeScholarlyIntegration } from '@/lib/scholarly';

const OrcidCallback = () => {
  const [params] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'done' | 'error'>('loading');
  const [message, setMessage] = useState('Validando autorización ORCID…');

  useEffect(() => {
    const code = params.get('code');
    if (!code) {
      setStatus('error');
      setMessage('ORCID no devolvió un código de autorización válido.');
      return;
    }

    const finish = async () => {
      try {
        const redirectUri = `${window.location.origin}/auth/orcid/callback`;
        const result = await invokeScholarlyIntegration<{ orcid: string }>({ operation: 'orcid_callback', code, redirectUri });
        setStatus('done');
        setMessage(`ORCID conectado: ${result.orcid}`);
      } catch (err) {
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'No se pudo conectar ORCID.');
      }
    };

    finish();
  }, [params]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="font-display text-2xl font-bold text-foreground">ORCID académico</h1>
        <p className={status === 'error' ? 'text-sm text-destructive' : 'text-sm text-muted-foreground'}>{message}</p>
        {status !== 'loading' && <Button variant="outline" asChild><Link to="/settings">Volver al perfil</Link></Button>}
      </div>
    </div>
  );
};

export default OrcidCallback;
