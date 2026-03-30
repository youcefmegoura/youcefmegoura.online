import { getAllData } from '@/lib/yaml-loader';
import V5ExperiencePage from '@/layouts/v5/V5ExperiencePage';

export default function ExperiencePage() {
  const data = getAllData();
  return <V5ExperiencePage data={data} />;
}
