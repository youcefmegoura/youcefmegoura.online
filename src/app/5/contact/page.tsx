import { getAllData } from '@/lib/yaml-loader';
import V5ContactPage from '@/layouts/v5/V5ContactPage';

export default function ContactPage() {
  const data = getAllData();
  return <V5ContactPage data={data} />;
}
