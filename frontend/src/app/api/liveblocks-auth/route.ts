import { Liveblocks } from '@liveblocks/node';
import { NextRequest, NextResponse } from 'next/server';

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

// pages/api/liveblocks-auth.ts
export async function POST(request: NextRequest) {
  try {
    const userDataCookie = request.cookies.get('userData')?.value;

    if (!userDataCookie) {
      return NextResponse.json({ error: 'No user data found' }, { status: 401 });
    }

    const userData = JSON.parse(userDataCookie);
    const userName = userData.name;
    const userImage = userData.image_url;

    if (!userName) {
      return NextResponse.json({ error: 'No user name found' }, { status: 401 });
    }
    // Liveblocks 세션 생성시 image_url도 포함
    const session = liveblocks.prepareSession(`user-${Math.random()}`, {
      userInfo: {
        name: userName,
        avatar_url: userImage, // 이미지 URL 전달
      },
    });

    // 룸 접근 권한 설정
    session.allow(`sidebar-room-*`, session.FULL_ACCESS);
    session.allow(`room-*`, session.FULL_ACCESS);

    const { status, body } = await session.authorize();
    return new NextResponse(body, { status });
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
