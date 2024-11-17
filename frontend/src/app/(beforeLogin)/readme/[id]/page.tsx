import ReadMeBtn from '@/app/_components/ReadMeBtn';
import axios from 'axios';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

interface Params {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  let workSpace_data = null;
  if (!(id && !isNaN(Number(id)))) return;
  try {
    const response1 = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL_D}/api/workspace/simple`, {
      workspace_id: id,
    });

    workSpace_data = response1.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { title: '페이지를 찾을 수 없습니다' };
  }

  return {
    title: workSpace_data ? workSpace_data.name : '기본 제목',
    description: workSpace_data ? workSpace_data.name : '기본 제목',
    openGraph: {
      title: workSpace_data?.name || '기본 제목',
      description: workSpace_data?.name || '기본 설명',
      images: [workSpace_data?.thumbnail || '기본 이미지 URL'],
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL_D}/readme/${id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: workSpace_data?.name || '기본 제목',
      description: workSpace_data?.name || '기본 설명',
      images: workSpace_data?.thumbnail || '기본 이미지 URL',
    },
  };
}
export default async function ReadMe({ params }: Params) {
  const { id } = await params;
  let data = null;
  if (!(id && !isNaN(Number(id)))) return;

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL_D}/api/workspace/simple`, {
      workspace_id: id,
    });
    data = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return;
  }

  return (
    <div className="responsive_mainResponsive markdown-wrapper flex flex-col mb-[30px]">
      <div
        className="inner"
        style={{
          borderBottom: '1px solid #d1d9e0',
          paddingBottom: '8px',
          marginBottom: '16px',
          width: '100%',
          fontWeight: 'bold',
        }}
      >
        <style>
          {`
            /*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** css ./node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[2]!./node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[13].oneOf[10].use[3]!./src/app/globals.css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
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
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}/*
! tailwindcss v3.4.14 | MIT License | https://tailwindcss.com
*//*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
  --tw-content: '';
}



html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}



body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}


code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}


sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

.markdown-wrapper {
            border: 1px solid #d1d9e0;
            border-radius: 6px;
            padding: 16px;
            margin-top: 30px;
            display:flex;
          }
/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}



::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}



img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden]:where(:not([hidden="until-found"])) {
  display: none;
}
.container {
  width: 100%;
}
@media (min-width: 640px) {

  .container {
    max-width: 640px;
  }
}
@media (min-width: 768px) {

  .container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {

  .container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {

  .container {
    max-width: 1280px;
  }
}
@media (min-width: 1536px) {

  .container {
    max-width: 1536px;
  }
}
.pointer-events-none {
  pointer-events: none;
}
.visible {
  visibility: visible;
}
.collapse {
  visibility: collapse;
}
.fixed {
  position: fixed;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.inset-0 {
  inset: 0px;
}
.bottom-0 {
  bottom: 0px;
}
.bottom-2 {
  bottom: 0.5rem;
}
.bottom-\[-50px\] {
  bottom: -50px;
}
.left-1\/2 {
  left: 50%;
}
.left-60 {
  left: 15rem;
}
.right-1 {
  right: 0.25rem;
}
.right-2 {
  right: 0.5rem;
}
.right-4 {
  right: 1rem;
}
.top-1 {
  top: 0.25rem;
}
.top-16 {
  top: 4rem;
}
.top-4 {
  top: 1rem;
}
.top-\[calc\(50\%-30px\)\] {
  top: calc(50% - 30px);
}
.z-50 {
  z-index: 50;
}
.z-\[100\] {
  z-index: 100;
}
.z-\[50\] {
  z-index: 50;
}
.mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.my-5 {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}
.-ml-60 {
  margin-left: -15rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.mb-3 {
  margin-bottom: 0.75rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.ml-0 {
  margin-left: 0px;
}
.ml-1\.5 {
  margin-left: 0.375rem;
}
.ml-\[10px\] {
  margin-left: 10px;
}
.mr-1 {
  margin-right: 0.25rem;
}
.mr-4 {
  margin-right: 1rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.mt-4 {
  margin-top: 1rem;
}
.mt-5 {
  margin-top: 1.25rem;
}
.mt-\[10px\] {
  margin-top: 10px;
}
.mt-\[20px\] {
  margin-top: 20px;
}
.mt-\[30px\] {
  margin-top: 30px;
}
.block {
  display: block;
}
.inline-block {
  display: inline-block;
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
  aspect-ratio: 1/0.8;
}
.h-14 {
  height: 3.5rem;
}
.h-24 {
  height: 6rem;
}
.h-\[10\%\] {
  height: 10%;
}
.h-\[20\%\] {
  height: 20%;
}
.h-\[250px\] {
  height: 250px;
}
.h-\[30px\] {
  height: 30px;
}
.h-\[330px\] {
  height: 330px;
}
.h-\[40px\] {
  height: 40px;
}
.h-\[50px\] {
  height: 50px;
}
.h-\[60px\] {
  height: 60px;
}
.h-\[90\%\] {
  height: 90%;
}
.h-auto {
  height: auto;
}
.h-full {
  height: 100%;
}
.h-screen {
  height: 100vh;
}
.w-24 {
  width: 6rem;
}
.w-60 {
  width: 15rem;
}
.w-\[150px\] {
  width: 150px;
}
.w-\[20px\] {
  width: 20px;
}
.w-\[220px\] {
  width: 220px;
}
.w-\[260px\] {
  width: 260px;
}
.w-\[300px\] {
  width: 300px;
}
.w-full {
  width: 100%;
}
.w-screen {
  width: 100vw;
}
.max-w-\[80\%\] {
  max-width: 80%;
}
.max-w-none {
  max-width: none;
}
.flex-1 {
  flex: 1 1 0%;
}
.flex-shrink-0 {
  flex-shrink: 0;
}
.flex-grow {
  flex-grow: 1;
}
.border-collapse {
  border-collapse: collapse;
}
.-translate-x-1\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.-translate-y-1\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes spin {

  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
.cursor-grab {
  cursor: grab;
}
.cursor-pointer {
  cursor: pointer;
}
.resize-none {
  resize: none;
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
.justify-start {
  justify-content: flex-start;
}
.justify-end {
  justify-content: flex-end;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.justify-around {
  justify-content: space-around;
}
.gap-2 {
  gap: 0.5rem;
}
.gap-3 {
  gap: 0.75rem;
}
.gap-5 {
  gap: 1.25rem;
}
.space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.overflow-auto {
  overflow: auto;
}
.overflow-hidden {
  overflow: hidden;
}
.overflow-x-auto {
  overflow-x: auto;
}
.overflow-y-auto {
  overflow-y: auto;
}
.overflow-y-scroll {
  overflow-y: scroll;
}
.text-ellipsis {
  text-overflow: ellipsis;
}
.whitespace-nowrap {
  white-space: nowrap;
}
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
.rounded {
  border-radius: 0.25rem;
}
.rounded-3xl {
  border-radius: 1.5rem;
}
.rounded-\[16px\] {
  border-radius: 16px;
}
.rounded-\[30px\] {
  border-radius: 30px;
}
.rounded-\[90px\] {
  border-radius: 90px;
}
.rounded-full {
  border-radius: 9999px;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.rounded-md {
  border-radius: 0.375rem;
}
.rounded-xl {
  border-radius: 0.75rem;
}
.rounded-b-\[16px\] {
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
}
.rounded-r-lg {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
.rounded-t-\[16px\] {
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}
.rounded-t-lg {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}
.border {
  border-width: 1px;
}
.border-2 {
  border-width: 2px;
}
.border-8 {
  border-width: 8px;
}
.border-r {
  border-right-width: 1px;
}
.border-dashed {
  border-style: dashed;
}
.border-none {
  border-style: none;
}
.border-\[\#CCCCCC\] {
  --tw-border-opacity: 1;
  border-color: rgb(204 204 204 / var(--tw-border-opacity));
}
.border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.border-gray-200 {
  --tw-border-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-border-opacity));
}
.border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
}
.border-gray-600 {
  --tw-border-opacity: 1;
  border-color: rgb(75 85 99 / var(--tw-border-opacity));
}
.border-white {
  --tw-border-opacity: 1;
  border-color: rgb(255 255 255 / var(--tw-border-opacity));
}
.border-t-black {
  --tw-border-opacity: 1;
  border-top-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.bg-\[\#020623\] {
  --tw-bg-opacity: 1;
  background-color: rgb(2 6 35 / var(--tw-bg-opacity));
}
.bg-\[\#04092F\] {
  --tw-bg-opacity: 1;
  background-color: rgb(4 9 47 / var(--tw-bg-opacity));
}
.bg-\[\#333333\] {
  --tw-bg-opacity: 1;
  background-color: rgb(51 51 51 / var(--tw-bg-opacity));
}
.bg-\[\#3D424A\] {
  --tw-bg-opacity: 1;
  background-color: rgb(61 66 74 / var(--tw-bg-opacity));
}
.bg-\[\#495365\] {
  --tw-bg-opacity: 1;
  background-color: rgb(73 83 101 / var(--tw-bg-opacity));
}
.bg-\[\#49DCB0\] {
  --tw-bg-opacity: 1;
  background-color: rgb(73 220 176 / var(--tw-bg-opacity));
}
.bg-\[\#E9ECEF\] {
  --tw-bg-opacity: 1;
  background-color: rgb(233 236 239 / var(--tw-bg-opacity));
}
.bg-\[\#F1F1F1\] {
  --tw-bg-opacity: 1;
  background-color: rgb(241 241 241 / var(--tw-bg-opacity));
}
.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity));
}
.bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}
.bg-gray-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
}
.bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity));
}
.bg-gray-800 {
  --tw-bg-opacity: 1;
  background-color: rgb(31 41 55 / var(--tw-bg-opacity));
}
.bg-gray-900 {
  --tw-bg-opacity: 1;
  background-color: rgb(17 24 39 / var(--tw-bg-opacity));
}
.bg-transparent {
  background-color: transparent;
}
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.bg-opacity-10 {
  --tw-bg-opacity: 0.1;
}
.bg-opacity-50 {
  --tw-bg-opacity: 0.5;
}
.p-2 {
  padding: 0.5rem;
}
.p-3 {
  padding: 0.75rem;
}
.p-4 {
  padding: 1rem;
}
.p-5 {
  padding: 1.25rem;
}
.p-7 {
  padding: 1.75rem;
}
.p-\[10px\] {
  padding: 10px;
}
.p-\[12px\] {
  padding: 12px;
}
.p-\[20px\] {
  padding: 20px;
}
.p-\[35px\] {
  padding: 35px;
}
.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.pb-2 {
  padding-bottom: 0.5rem;
}
.pl-\[20px\] {
  padding-left: 20px;
}
.pl-\[30px\] {
  padding-left: 30px;
}
.pr-20 {
  padding-right: 5rem;
}
.pr-\[20px\] {
  padding-right: 20px;
}
.pr-\[30px\] {
  padding-right: 30px;
}
.pt-\[20px\] {
  padding-top: 20px;
}
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.text-\[16px\] {
  font-size: 16px;
}
.text-\[20px\] {
  font-size: 20px;
}
.text-\[40px\] {
  font-size: 40px;
}
.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.font-black {
  font-weight: 900;
}
.font-bold {
  font-weight: 700;
}
.font-medium {
  font-weight: 500;
}
.font-semibold {
  font-weight: 600;
}
.leading-none {
  line-height: 1;
}
.text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}
.text-gray-300 {
  --tw-text-opacity: 1;
  color: rgb(209 213 219 / var(--tw-text-opacity));
}
.text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity));
}
.text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
.text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
}
.text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity));
}
.text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity));
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
.opacity-0 {
  opacity: 0;
}
.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
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
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.duration-200 {
  transition-duration: 200ms;
}
.duration-300 {
  transition-duration: 300ms;
}
.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.s1 {
  font-size: 100px;
}

:root {
  --background: #ffffff;
  --foreground: #171717;
  --card-count: 5;
  --spacer: calc(var(--card-count) - 1);
  --width: 20%;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}


.responsive_workspaceheader {
  display: flex;
  flex-direction: column; /* 기본적으로 세로 정렬 */
  padding-top: 30px;
  padding-bottom: 30px;
  justify-content: space-between;
  align-items: center;
}

@media (min-width: 768px) {
  /* 768px 이상에서 가로 정렬 */
  .responsive_workspaceheader {
    flex-direction: row;
  }
}

.responsive_mainResponsive {
  width: 1328px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
  @media screen and (max-width: 1919px) {
    width: 1176px;
  }

  @media screen and (max-width: 1440px) {
    width: 844px;
  }

  @media screen and (max-width: 1056px) {
    width: 100%;
  }
}

.grid_mainGrid {
  display: grid;
  align-items: stretch;
  grid-gap: 32px;
  padding: 0;
  margin: 0;
  --card-count: 5;
  --spacer: calc(var(--card-count) - 1);
  --width: 20%;

  grid-template-columns: repeat(var(--card-count), calc(var(--width) - (32px * var(--spacer) / var(--card-count))));

  @media screen and (max-width: 1919px) {
    --card-count: 4;
    --width: 25%;
  }

  @media screen and (max-width: 1440px) {
    --card-count: 4;
    --width: 25%;
  }

  @media screen and (max-width: 1056px) {
    --card-count: 3;
    --width: 33.33%;
  }

  @media screen and (max-width: 868px) {
    --card-count: 2;
    --width: 50%;
  }

  @media screen and (max-width: 568px) {
    grid-template-columns: repeat(1, 100%);
    grid-gap: 16px;
  }
}

.workspace-item {
  position: absolute;
  width: 100%;
  height: 80%;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: hidden;
}

.workspace-image:hover ~ .workspace-item,
.workspace-item:hover {
  visibility: visible;
}

.scrollbar {
  width: 250px;
  height: 250px;
  overflow-y: scroll; /*  */
}

/* 스크롤바의 폭 너비 */
.scrollbar::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  border-radius: 10px;
}

.scrollbar::-webkit-scrollbar-thumb {
  background: #020623; /* 스크롤바 색상 */
  border-radius: 10px; /* 스크롤바 둥근 테두리 */
}

.scrollbar::-webkit-scrollbar-track {
  background: rgba(121, 121, 121, 0.1); /*스크롤바 뒷 배경 색상*/
}
.custom-checkbox {
  -webkit-appearance: none; /* 크롬, 사파리 */
  -moz-appearance: none; /* 파이어폭스 */
  appearance: none; /* 기본 체크박스 스타일 제거 */
  width: 20px; /* 체크박스 크기 */
  height: 20px; /* 체크박스 크기 */
  border: 2px solid #020623; /* 체크박스 테두리 색상 */
  border-radius: 4px; /* 체크박스 모서리 둥글게 */
  cursor: pointer; /* 커서 포인터 */
  outline: none; /* 포커스 아웃라인 제거 */
  position: relative; /* 포지션 설정 */
}

.custom-checkbox:checked {
  background-color: #020623; /* 체크 시 배경 색상 */
}

.custom-checkbox:checked::after {
  content: ''; /* 체크 표시 */
  position: absolute;
  top: 4px; /* 체크 표시 위치 조정 */
  left: 4px; /* 체크 표시 위치 조정 */
  width: 8px; /* 체크 표시 크기 */
  height: 8px; /* 체크 표시 크기 */
  background-color: #000; /* 체크 표시 색상 */
}

.container-login {
  background-color: white; /* bg-white */
  width: 100%; /* w-full */
  max-width: 32rem; /* max-w-lg (32rem = 512px) */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-lg */
  text-align: center; /* text-center */
  display: flex; /* flex */
  border-radius: 0.5rem; /* rounded-lg */
  overflow: hidden; /* overflow-hidden */
  flex-direction: column; /* flex-col */
}

@media (min-width: 768px) {
  /* md:flex-row */
  .container-login {
    flex-direction: row; /* flex-row */
  }
}

.container-wrapper {
  height: 100vh;

}

/* 마크다운 바디에서는 모든 css revert */
.markdown-body * {
overflow-w:scroll;
  all: revert;
}
.hover\:scale-105:hover {
  --tw-scale-x: 1.05;
  --tw-scale-y: 1.05;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.hover\:border-gray-400:hover {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity));
}
.hover\:bg-\[\#1B1F30\]:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(27 31 48 / var(--tw-bg-opacity));
}
.hover\:bg-gray-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}
.hover\:bg-gray-200:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}
.hover\:bg-white:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.hover\:bg-opacity-5:hover {
  --tw-bg-opacity: 0.05;
}
.hover\:text-gray-200:hover {
  --tw-text-opacity: 1;
  color: rgb(229 231 235 / var(--tw-text-opacity));
}
.hover\:text-gray-900:hover {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity));
}
.hover\:text-green-500:hover {
  --tw-text-opacity: 1;
  color: rgb(34 197 94 / var(--tw-text-opacity));
}
.hover\:text-red-500:hover {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity));
}
.hover\:text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.hover\:opacity-75:hover {
  opacity: 0.75;
}
.focus\:border-none:focus {
  border-style: none;
}
.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus\:ring-\[\#1B1F30\]:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(27 31 48 / var(--tw-ring-opacity));
}
.focus\:ring-opacity-50:focus {
  --tw-ring-opacity: 0.5;
}
.active\:cursor-grabbing:active {
  cursor: grabbing;
}
.disabled\:opacity-50:disabled {
  opacity: 0.5;
}
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
@media (min-width: 768px) {

  .md\:flex-row {
    flex-direction: row;
  }
}

img {
  max-width: 100% !important;
  box-sizing: border-box;
}
.markdown-body pre {
  white-space: pre-wrap !important; /* 줄바꿈 허용 */
  word-break: break-word !important; /* 단어 단위로 줄바꿈 */
  overflow-x: auto !important; /* 가로 스크롤 허용 */
  max-width: 100% !important; /* 부모 요소 너비 초과 방지 */
  box-sizing: border-box;
}
.markdown-body pre code {
  white-space: pre-wrap;
  word-break: break-word;
  max-width: 100%;
  display: block;
}  
          `}
        </style>
        <ReadMeBtn />
        <span style={{ marginLeft: '10px' }}>README</span>
      </div>
      <div className="markdown-body">
        <ReactMarkdown key={1} remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
          {data?.data?.readmeContent}
        </ReactMarkdown>
      </div>
      <style>{`
          .markdown-wrapper .markdown-body pre {
  white-space: pre-wrap !important; /* 줄바꿈 허용 */
  word-break: break-word !important; /* 단어 단위로 줄바꿈 */
  overflow-x: auto !important; /* 가로 스크롤 허용 */
  max-width: 100% !important; /* 부모 요소 너비 초과 방지 */
  box-sizing: border-box;
}
        `}</style>
    </div>
  );
}
