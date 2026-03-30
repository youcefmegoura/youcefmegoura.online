import { getAllData } from '@/lib/yaml-loader';
import V1Layout from '@/layouts/v1/V1Layout';

export default function Version1Page() {
  const data = getAllData();
  return <V1Layout data={data} />;
}
