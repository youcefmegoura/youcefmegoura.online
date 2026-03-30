import { getAllData } from '@/lib/yaml-loader';
import V7Layout from '@/layouts/v7/V7Layout';

export default function V7Page() {
  const data = getAllData();
  return <V7Layout data={data} />;
}
