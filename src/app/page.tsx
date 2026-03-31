import { getAllData } from '@/lib/yaml-loader';
import { V3Page } from '@/components/v3/V3Page';

export default function HomePage() {
  const data = getAllData();
  return <V3Page data={data} />;
}
