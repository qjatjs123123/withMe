import { ReactNode } from 'react';
import AfterLoginNav from '../_components/Nav';
import RQProvider from './_components/RQProvider';
import { cookies } from 'next/headers'; // Next.js 13+에서 서버 쿠키 가져오기

type Props = { children: ReactNode; modal: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="container-wrapper">
      <RQProvider>{children}</RQProvider>
    </div>
  );
}
