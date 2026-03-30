import { getAllData } from '@/lib/yaml-loader';
import V5ProjectsPage from '@/layouts/v5/V5ProjectsPage';

export default function ProjectsPage() {
  const data = getAllData();
  return <V5ProjectsPage data={data} />;
}
