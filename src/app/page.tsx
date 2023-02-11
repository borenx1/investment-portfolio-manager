import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');
  // Should not reach this point.
  return <h1>Investment Portfolio Manager</h1>;
}
