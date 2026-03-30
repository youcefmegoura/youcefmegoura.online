import { getAllData } from '@/lib/yaml-loader';
import V4Layout from '@/layouts/v4/V4Layout';

export default function V4Page() {
  const data = getAllData();
  return <V4Layout data={data} />;
}
