import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WithMe',
  description: 'ReadMe WithMe',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="YwzE4AZx17ew5LwyrxNYc-PSgxOtp6BxJ6ox7yBLKu8" />
      </head>
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
