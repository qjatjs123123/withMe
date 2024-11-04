import { ReactNode } from 'react';
import Nav from '../_components/Nav';
type Props = { children: ReactNode; modal: ReactNode };
export default function Layout({ children, modal }: Props) {
  return (
    <div className="container-wrapper">
      <Nav />
      <div className="container-block"> </div>
      {children}
      {modal}
    </div>
  );
}
