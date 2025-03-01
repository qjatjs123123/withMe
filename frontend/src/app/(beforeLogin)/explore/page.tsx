import redis from '@/util/redis';
import WorkSpaceContainer from './_components/WorkspaceContainer';
import Footer from '@/app/_components/Footer';

interface Params {
  params: {
    keyword: string;
  };
}

const redisKey = 'workspaceData'

export default async function ReadMe({ params }: Params) {
  let workspaces = null;

  const fetchData = async () => {
    const cachedData = await getCachedData();
    if (cachedData) {
      return cachedData;
    }

    const apiData = await fetchDataFromAPI();
    if (apiData) {
      redis.set(redisKey, JSON.stringify(apiData), 'EX', 60); // 데이터를 캐시
    }

    return apiData;
  };
  console.log("build")
  workspaces = await fetchData();
  
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

// 캐시에서 데이터 가져오는 함수
const getCachedData = async () => {
  try {
    const cachedData = await redis.get(redisKey);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error('Error fetching cached data:', error);
    return null;
  }
};

// API에서 데이터 가져오는 함수
const fetchDataFromAPI = async () => {
  try {
    const keyword = '';
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_D}/api/readme/search?keyword=${keyword}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("fetch")
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return null;
  }
};
export const revalidate = 60;