import { redirect } from 'next/navigation';
import { generateUUID } from '@/lib/utils';

export default function Page() {
  const id = generateUUID();
  redirect(`/chat/${id}`);
}
