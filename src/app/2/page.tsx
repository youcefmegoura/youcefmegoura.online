import { getAllData } from '@/lib/yaml-loader';
import { V2Layout } from '@/layouts/v2/V2Layout';

export default function V2Page() {
  const data = getAllData();
  return <V2Layout data={data} />;
}
