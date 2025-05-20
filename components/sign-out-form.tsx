import { Input } from './ui/input';
import { Label } from './ui/label';

export function SignOutForm({
  action,
  children,
}: {
  action: NonNullable<
    string | ((formData: FormData) => void | Promise<void>) | undefined
  >;
  children: React.ReactNode;
}) {
  return (
    <form action={action} className="flex flex-col gap-4 px-4 sm:px-16">
      {/* ... resto del contenido */}
      {children}
    </form>
  );
}
