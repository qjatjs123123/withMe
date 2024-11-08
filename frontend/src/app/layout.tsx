import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'withMe',
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
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
