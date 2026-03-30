import { getAllData } from '@/lib/yaml-loader';
import V5Sidebar from '@/layouts/v5/V5Sidebar';

export default function V5Layout({ children }: { children: React.ReactNode }) {
  const data = getAllData();

  return (
    <div className="flex min-h-screen bg-background">
      <V5Sidebar data={data} />
      <main className="flex-1 lg:ml-72">
        {children}
      </main>
    </div>
  );
}
