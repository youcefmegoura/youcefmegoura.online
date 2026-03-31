import { getAllData } from '@/lib/yaml-loader';
import { Page } from '@/components/v3/Page';

export default function HomePage() {
  const data = getAllData();
  return <Page data={data} />;
}
