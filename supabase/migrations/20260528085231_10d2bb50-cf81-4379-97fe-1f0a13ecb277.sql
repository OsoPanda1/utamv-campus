ALTER TABLE public.support_tickets
  ADD COLUMN IF NOT EXISTS priority text NOT NULL DEFAULT 'normal',
  ADD COLUMN IF NOT EXISTS admin_notes text,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE public.support_tickets
  DROP CONSTRAINT IF EXISTS support_tickets_priority_check;
ALTER TABLE public.support_tickets
  ADD CONSTRAINT support_tickets_priority_check
  CHECK (priority IN ('low','normal','high','urgent'));

ALTER TABLE public.support_tickets
  DROP CONSTRAINT IF EXISTS support_tickets_status_check;
ALTER TABLE public.support_tickets
  ADD CONSTRAINT support_tickets_status_check
  CHECK (status IN ('pending','in_review','contacted','accepted','rejected','closed'));

CREATE INDEX IF NOT EXISTS idx_support_tickets_status_priority
  ON public.support_tickets (status, priority, created_at DESC);

DROP TRIGGER IF EXISTS trg_support_tickets_updated_at ON public.support_tickets;
CREATE TRIGGER trg_support_tickets_updated_at
  BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();