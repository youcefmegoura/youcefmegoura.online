import { getAllData } from '@/lib/yaml-loader';
import V6Layout from '@/layouts/v6/V6Layout';

export default function V6Page() {
  const data = getAllData();
  return <V6Layout data={data} />;
}
