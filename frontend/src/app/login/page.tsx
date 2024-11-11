import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Main from '../_components/Main';
import LoginModal from '../_components/LoginModal';
import Nav from '../_components/Nav';

export default async function Login() {
  const cookieStore = cookies();
  const userDataCookie = (await cookieStore).get('userData');
  if (userDataCookie) {
    redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workspace`);
  }

  return (
    <>
      <Nav />
      <Main />
      <LoginModal />
    </>
  ); // 컴포넌트는 아무것도 렌더링하지 않음
}
