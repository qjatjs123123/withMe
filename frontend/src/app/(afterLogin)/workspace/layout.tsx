import AfterLoginNav from '@/app/_components/AfterLoginNav';
import { ReactNode } from 'react';

type Props = { children: ReactNode; modal: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <>
      <AfterLoginNav />

      {children}
    </>
  );
}
