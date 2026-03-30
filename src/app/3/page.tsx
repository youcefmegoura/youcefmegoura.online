import { getAllData } from '@/lib/yaml-loader';
import { V3Layout } from '@/layouts/v3/V3Layout';

export default function V3Page() {
  const data = getAllData();
  return <V3Layout data={data} />;
}
