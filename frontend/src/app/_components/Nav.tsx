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
/* [project]/src/app/geistsans_9fc57718.module.css [app-client] (css) */
.container-block {
  height: 90px;
}

@font-face {
  font-family: geistSans;
  src: url("../media/GeistVF-s.p.7fe29570.woff") format("woff");
  font-display: swap;
  font-weight: 100 900;
}

@font-face {
  font-family: geistSans Fallback;
  src: local(Arial);
  ascent-override: 85.83%;
  descent-override: 20.52%;
  line-gap-override: 9.33%;
  size-adjust: 107.19%;
}

.geistsans_9fc57718-module__5N2VMq__className {
  font-family: geistSans, geistSans Fallback;
}

.geistsans_9fc57718-module__5N2VMq__variable {
  --font-geist-sans: "geistSans", "geistSans Fallback";
}


/* [project]/src/app/geistsans_9fc57718.module.css [app-client] (css) */
@font-face {
  font-family: geistSans;
  src: url("../media/GeistVF-s.p.7fe29570.woff") format("woff");
  font-display: swap;
  font-weight: 100 900;
}

@font-face {
  font-family: geistSans Fallback;
  src: local(Arial);
  ascent-override: 85.83%;
  descent-override: 20.52%;
  line-gap-override: 9.33%;
  size-adjust: 107.19%;
}



.geistsans_9fc57718-module__5N2VMq__variable {
  --font-geist-sans: "geistSans", "geistSans Fallback";
}


/* [project]/src/app/geistmono_b9f59162.module.css [app-client] (css) */
@font-face {
  font-family: geistMono;
  src: url("../media/GeistMonoVF-s.p.a9159d35.woff") format("woff");
  font-display: swap;
  font-weight: 100 900;
}

@font-face {
  font-family: geistMono Fallback;
  src: local(Arial);
  ascent-override: 69.97%;
  descent-override: 16.73%;
  line-gap-override: 7.61%;
  size-adjust: 131.49%;
}

.geistmono_b9f59162-module__Or8qSa__className {
  font-family: geistMono, geistMono Fallback;
}

.geistmono_b9f59162-module__Or8qSa__variable {
  --font-geist-mono: "geistMono", "geistMono Fallback";
}


/* [project]/src/app/geistmono_b9f59162.module.css [app-client] (css) */
@font-face {
  font-family: geistMono;
  src: url("../media/GeistMonoVF-s.p.a9159d35.woff") format("woff");
  font-display: swap;
  font-weight: 100 900;
}

@font-face {
  font-family: geistMono Fallback;
  src: local(Arial);
  ascent-override: 69.97%;
  descent-override: 16.73%;
  line-gap-override: 7.61%;
  size-adjust: 131.49%;
}

.geistmono_b9f59162-module__Or8qSa__className {
  font-family: geistMono, geistMono Fallback;
}

.geistmono_b9f59162-module__Or8qSa__variable {
  --font-geist-mono: "geistMono", "geistMono Fallback";
}


/* [project]/src/app/globals.css [app-client] (css) */
*, :before, :after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: #3b82f680;
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style: ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: #3b82f680;
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style: ;
}

*, :before, :after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
}

:before, :after {
  --tw-content: "";
}

html, :host {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
  font-variation-settings: normal;
  -webkit-tap-highlight-color: transparent;
}

body {
  margin: 0;
  line-height: inherit;

}

hr {
  height: 0;
  color: inherit;
  border-top-width: 1px;
}

abbr:where([title]) {
  text-decoration: underline dotted;
}

h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: inherit;
}

a {
  color: inherit;
  text-decoration: inherit;
}

b, strong {
  font-weight: bolder;
}

code, kbd, samp, pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
  font-feature-settings: normal;
  font-variation-settings: normal;
  font-size: 1em;
}

small {
  font-size: 80%;
}

sub, sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -.25em;
}

sup {
  top: -.5em;
}

table {
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse;
}

button, input, optgroup, select, textarea {
  font-family: inherit;
  font-feature-settings: inherit;
  font-variation-settings: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}

button, select {
  text-transform: none;
}

button, input:where([type="button"]), input:where([type="reset"]), input:where([type="submit"]) {
  -webkit-appearance: button;
  background-color: #0000;
  background-image: none;
}

:-moz-focusring {
  outline: auto;
}

:-moz-ui-invalid {
  box-shadow: none;
}

progress {
  vertical-align: baseline;
}

::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
  height: auto;
}

[type="search"] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

summary {
  display: list-item;
}

blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol, ul, menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

dialog {
  padding: 0;
}

textarea {
  resize: vertical;
}

input::placeholder, textarea::placeholder {
  opacity: 1;
  color: #9ca3af;
}

button, [role="button"] {
  cursor: pointer;
}

:disabled {
  cursor: default;
}

img, svg, video, canvas, audio, iframe, embed, object {
  display: block;
  vertical-align: middle;
}

img, video {
  max-width: 100%;
  height: auto;
}

[hidden]:where(:not([hidden="until-found"])) {
  display: none;
}

.visible {
  visibility: visible;
}

.collapse {
  visibility: collapse;
}

.absolute {
  position: absolute;
}

.relative {
  position: relative;
}

.ml-\[10px\] {
  margin-left: 10px;
}

.block {
  display: block;
}

.inline {
  display: inline;
}

.flex {
  display: flex;
}

.table {
  display: table;
}

.grid {
  display: grid;
}

.hidden {
  display: none;
}

.aspect-\[1\/0\.8\] {
  aspect-ratio: 1 / .8;
}

.h-\[20\%\] {
  height: 20%;
}

.h-\[35px\] {
  height: 35px;
}

.h-full {
  height: 100%;
}

.w-full {
  width: 100%;
}

.flex-1 {
  flex: 1;
}

.border-collapse {
  border-collapse: collapse;
}

.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.cursor-pointer {
  cursor: pointer;
}

.resize {
  resize: both;
}

.flex-row {
  flex-direction: row;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-end {
  justify-content: flex-end;
}

.justify-center {
  justify-content: center;
}

.gap-2 {
  gap: .5rem;
}

.overflow-hidden {
  overflow: hidden;
}

.text-ellipsis {
  text-overflow: ellipsis;
}

.whitespace-nowrap {
  white-space: nowrap;
}

.rounded-\[16px\] {
  border-radius: 16px;
}

.rounded-\[30px\] {
  border-radius: 30px;
}

.border {
  border-width: 1px;
}

.border-2 {
  border-width: 2px;
}

.border-none {
  border-style: none;
}

.border-\[\#CCCCCC\] {
  --tw-border-opacity: 1;
  border-color: rgb(204 204 204 / var(--tw-border-opacity));
}

.border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
}

.border-white {
  --tw-border-opacity: 1;
  border-color: rgb(255 255 255 / var(--tw-border-opacity));
}

.bg-\[\#020623\] {
  --tw-bg-opacity: 1;
  background-color: rgb(2 6 35 / var(--tw-bg-opacity));
}

.bg-transparent {
  background-color: #0000;
}

.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.p-\[10px\] {
  padding: 10px;
}

.p-\[12px\] {
  padding: 12px;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-1 {
  padding-top: .25rem;
  padding-bottom: .25rem;
}

.py-2 {
  padding-top: .5rem;
  padding-bottom: .5rem;
}

.pb-\[30px\] {
  padding-bottom: 30px;
}

.pt-\[30px\] {
  padding-top: 30px;
}

.text-\[16px\] {
  font-size: 16px;
}

.text-\[40px\] {
  font-size: 40px;
}

.font-black {
  font-weight: 900;
}

.font-bold {
  font-weight: 700;
}

.text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity));
}

.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.underline {
  text-decoration-line: underline;
}

.antialiased {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.outline {
  outline-style: solid;
}

.grayscale {
  --tw-grayscale: grayscale(100%);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .15s;
}

.duration-300 {
  transition-duration: .3s;
}

.s1 {
  font-size: 100px;
}

:root {
  --background: #fff;
  --foreground: #171717;
  --card-count: 5;
  --spacer: calc(var(--card-count)  - 1);
  --width: 20%;
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
