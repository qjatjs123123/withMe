import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function middleware() {
  const cookieStore = cookies();
  const userDataCookie = (await cookieStore).get('userData');

  if (!userDataCookie) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL_D}/login`);
  }
}

export const config = {
  matcher: ['/edit', '/workspace', '/edit/:id*'],
};
