import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Main from '../../_components/Main';
import RedirectToLogin from '../../_components/RedirectToLogin';
import Nav from '../../_components/LoginNav';

export default async function Login() {
  const cookieStore = cookies();
  const userDataCookie = (await cookieStore).get('userData');

  if (userDataCookie) {
    redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workspace`);
  }

  return (
    <>
      <RedirectToLogin />
      <Main />
    </>
  ); // 컴포넌트는 아무것도 렌더링하지 않음
}
