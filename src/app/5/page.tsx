import { getAllData } from '@/lib/yaml-loader';
import V5Layout from '@/layouts/v5/V5Layout';

export default function V5HomePage() {
  const data = getAllData();
  return <V5Layout data={data} />;
}
