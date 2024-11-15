import AfterLoginNav from '@/app/_components/Nav';
import { ReactNode } from 'react';
import Footer from '@/app/_components/Footer';

type Props = { children: ReactNode; modal: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <>
      <AfterLoginNav />
      {children}
      <Footer />
    </>
  );
}
