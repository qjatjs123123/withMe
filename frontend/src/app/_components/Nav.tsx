import Image from 'next/image';
import SearchBar from './SearchBar';
import Link from 'next/link';
import UserProfile from './UserProfile';
import ProfileButton from './ProfileButton';
import { cookies } from 'next/headers';
import LoginBtn from './LoginBtn';
import SearchBtn from './SearchBtn';
import NavList from './NavList';
import Hamburger from './hamburgar';
import { SamsungSharpSansBold } from '../layout';

export default async function Nav() {
  const cookieStore = cookies();
  const userDataCookie = (await cookieStore).get('userData');
  let userData = undefined;
  let isLogin = false;
  if (userDataCookie) {
    userData = JSON.parse(decodeURIComponent(userDataCookie.value));
    isLogin = true;
  }

  return (
    <>
      <nav
        className="fixed w-full bg-white flex flex-row items-center z-15 h-[90px] px-8 md:px-[50px]"
        style={{
          position: 'fixed',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: '15',
          height: '90px',
        }}
      >
        <div className="items-center" style={{ flex: '1 1 0%', flexDirection: 'row', display: 'flex', gap: '50px' }}>
          <Link href={isLogin ? '/' : '/'}>
            <span
              className={`${SamsungSharpSansBold.className} text-3xl`}
              style={
                {
                  /* fontFamily: 'samsungsharpsans-bold' */
                }
              }
            >
              WithMe
            </span>
          </Link>

          <NavList fontClassName={SamsungSharpSansBold.className} />
        </div>
        <div style={{ marginLeft: '10px' }}></div>
        <div className="flex items-center justify-end " style={{ gap: '26px' }}>
          <SearchBtn />
          {isLogin ? (
            <>
              <ProfileButton>
                <UserProfile image_url={userData.image_url} />
              </ProfileButton>
            </>
          ) : (
            <LoginBtn />
          )}

          <Hamburger />
        </div>
      </nav>
      <div className="container-block"> </div>
    </>
  );
}
