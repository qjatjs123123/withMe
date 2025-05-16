// import redis from '@/util/redis';
import WorkSpaceContainer from './_components/WorkspaceContainer';
import Footer from '@/app/_components/Footer';
import {subscriber, publisher} from '@/util/redis';
import Redis from 'ioredis';
import { revalidatePath } from 'next/cache';

interface Params {
  params: {
    keyword: string;
  };
}

const redisKey = 'workspaceData'

export default async function ReadMe({ params }: Params) {

  
  if (!global.hasSubscribed) {
    console.log("서버 시작 시 Redis 구독 시작...");
    await subscriber.subscribe('workspace_channel');
    subscriber.on('message', async (channel, message) => {
      console.log(`Redis 채널 ${channel}에서 메시지 받음: ${message}`);

      await fetch(`http://localhost:3000/api/revalidate`);
    });
    global.hasSubscribed = true; // 구독 상태 설정
  } else {
  }
  const sendMessageToSubscribers = async () => {
    await publisher.publish('workspace_channel', "revalidate");
    console.log('메시지를 Redis 채널로 발행했습니다:');
  };

  await sendMessageToSubscribers()
  const workspaces = await fetchDataFromAPI();
  
  return (
    <div className="responsive_container">
      <header className="pt-[55px] "></header>
      <div className="grid_mainGrid ">
        <WorkSpaceContainer workspaces={workspaces} />
      </div>
      <Footer />
    </div>
  );
}


// API에서 데이터 가져오는 함수
const fetchDataFromAPI = async () => {
  try {
    const keyword = '';
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_D}/api/readme/search?keyword=${keyword}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60, 
      },
    });
    
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return null;
  }
};