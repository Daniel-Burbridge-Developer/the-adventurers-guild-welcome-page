import { createFileRoute } from '@tanstack/react-router';
import ApplicationForm from './-components/application-form';

export const Route = createFileRoute('/apply/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/apply/"!</div>;
}
