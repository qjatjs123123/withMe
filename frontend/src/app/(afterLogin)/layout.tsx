import { ReactNode } from 'react';
import RQProvider from './_components/RQProvider';
type Props = { children: ReactNode; modal: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <div className="container-wrapper">
      <RQProvider>{children}</RQProvider>
    </div>
  );
}
