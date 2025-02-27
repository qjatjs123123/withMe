import Image from 'next/image';
import SearchBar from './SearchBar';
import Link from 'next/link';
import UserProfile from './UserProfile';
import ProfileButton from './ProfileButton';
import { cookies } from 'next/headers';
import LoginBtn from './LoginBtn';
import SearchBtn from './SearchBtn';
import NavList from './NavList';
import Hamburger from './Hamburger';
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
        <style>
          {`
            .bg-ssafy_logo {
                width: 44px; height: 31px;
                background: url('https://hong-410567123.imgix.net/logo_sprites.png?q=75&fm=webp') -10px -10px;
            }
                

            .bg-githubLogo {
                width: 31px; height: 31px;
                background: url('https://hong-410567123.imgix.net/logo_sprites.png?q=75&fm=webp') -74px -10px;
            }

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

@media only screen and (max-width: 767.7px) {
    .responsive_container {
    padding-left:30px;
    padding-right:30px;
        min-height:100vh !important
    }
}

@media only screen and (max-width: 767.7px) and (max-width: 767.7px) {
    .responsive_container {
        padding-top:12.8vw
        padding-left:30px;
    padding-right:30px;
    }
}

@media only screen and (max-width: 767.7px) and (min-width: 768px) and (max-width: 1280px) {
    .responsive_container {
    padding-left:90px;
    padding-right:90px;
        padding-top:96px;
        padding-top: 7.5vw
    }
}

@media only screen and (max-width: 767.7px) and (min-width: 1281px) {
    .responsive_container {
    padding-left:50px;
    padding-right:50px;
        padding-top:96px
    }
}

@media only screen and (min-width: 768px) and (max-width: 1280px) {
    .responsive_container {
    padding-left:50px;
    padding-right:50px;
        min-height:calc(100vh - (61 * 100 / 1280 * 1vw)) !important
    }
}

@media only screen and (min-width: 768px) and (max-width: 1280px) and (max-width: 767.7px) {
    .responsive_container {
    padding-left:50px;
    padding-right:50px;
        padding-top:12vw
    }
}

@media only screen and (min-width: 768px) and (max-width: 1280px) and (min-width: 768px) and (max-width: 1280px) {
    .responsive_container {
    padding-left:50px;
    padding-right:50px;
        padding-top:90px;
        padding-top: 7.03125vw
    }
}

@media only screen and (min-width: 768px) and (max-width: 1280px) and (min-width: 1281px) {
    .responsive_container {
    padding-left:50px;
    padding-right:50px;
        padding-top:90px
    }
}

@media only screen and (min-width: 1281px) {
    .responsive_container {
        min-height:calc(100vh - 61px) !impo
        padding-left:50px;
    padding-right:50px;
    }
}

@media only screen and (min-width: 1281px) and (max-width: 767.7px) {
    .responsive_container {
    padding-left:50px;
    padding-right:50px;
        padding-top:12vw
    }
}

@media only screen and (min-width: 1281px) and (min-width: 768px) and (max-width: 1280px) {
    .responsive_container {
    padding-left:50px;
    padding-right:50px;
        padding-top:90px;
        padding-top: 7.03125vw
    }
}

@media only screen and (min-width: 1281px) and (min-width: 1281px) {
    .responsive_container {
    padding-left:50px;
    padding-right:50px;
        padding-top:90px
    }
}


.responsive_mainResponsive {
  
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom:80px;
}

@media screen and (width <= 1919px) {
  .responsive_mainResponsive {
    width: 1819px;
  }
}

@media screen and (width <= 1440px) {
  .responsive_mainResponsive {
    width: 1340px;
  }
}
  @media screen and (width <= 1340px) {
  .responsive_mainResponsive {
    width: 1200px;
  }
}
  @media screen and (width <= 1240px) {
  .responsive_mainResponsive {
    width: 1100px;
  }
}

@media screen and (width <= 1240px) {
  .responsive_mainResponsive {
    width: 100%;
  }
}

.grid_mainGrid {
  display: grid;
  align-items: stretch;
  grid-gap: 32px;
  padding: 0;
  margin: 0;
  --card-count: 4;
  --spacer: calc(var(--card-count) - 1);
  --width: 25%;

  grid-template-columns: repeat(var(--card-count), calc(var(--width) - (32px * var(--spacer) / var(--card-count))));

  @media screen and (max-width: 1919px) {
    --card-count: 3;
    --width: 33.33%;
  }

  @media screen and (max-width: 1440px) {
    --card-count: 3;
    --width: 33.33%;
  }

  @media screen and (max-width: 1056px) {
    --card-count: 2;
    --width: 50%;
  }

  @media screen and (max-width: 868px) {
    --card-count: 2;
    --width: 50%;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 100%);
    grid-gap: 16px;
  }
}
.workspace-item {
  position: absolute;
  width: 100%;
  height: 70%;
  background-color: #00000080;
  visibility: hidden;
}

.workspace-image:hover ~ .workspace-item,
.workspace-item:hover {
  visibility: visible;
  opacity: 1; /* 기본값: 요소가 보이게 함 */
  transition: visibility 0s, opacity 0.3s ease-in-out; /* 트랜지션 추가 */
}

.workspace-item {
  opacity: 0; /* 기본적으로 요소를 숨김 */
  visibility: hidden; /* 요소를 숨김 */
  transition: visibility 0s, opacity 0.3s ease-in-out; /* 트랜지션 추가 */
}

.hover\:bg-white:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  transition: background-color 0.3s ease-in-out; /* 배경 색상 변화에 트랜지션 추가 */
}

.hover\:text-black:hover {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}

.focus\:outline-none:focus {
  outline: 2px solid #0000;
  outline-offset: 2px;
}

.login-button {
  height: 35px;
  border: 1px solid white;
  color: black;
  background-color: transparent;
  border-radius: 30px;
  padding: 4px 16px; /* px-4, py-1 */
  transition: background-color 300ms, color 300ms;
}



.justify-between {
  justify-content: space-between;
}

/*# sourceMappingURL=src_app_c7d265._.css.map*/

        `}
        </style>
      </nav>
      <div className="container-block"> </div>
    </>
  );
}
