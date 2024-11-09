// app/readme/[workspace_id]/page.tsx
import axios from 'axios';
import { notFound } from 'next/navigation'; // 404 페이지로 리디렉션을 위한 함수

interface Params {
  params: {
    workspace_id: string; // URL에서 전달된 workspace_id
  };
}

export default async function ReadMe({ params }: Params) {
  const { workspace_id } = params;

  if (!workspace_id) {
    notFound(); // workspace_id가 없으면 404 페이지로 리디렉션
  }

  let data = null;
  try {
    // API 호출 (서버 컴포넌트에서 직접 호출)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/readme/${workspace_id}`);
    data = response.data; // API에서 받은 데이터
  } catch (error) {
    console.error('Failed to fetch data:', error);
    notFound(); // API 호출 실패 시 404 페이지로 리디렉션
  }

  return (
    <div>
      <h1>Workspace ID: {workspace_id}</h1>
      {/* 받아온 데이터를 표시 */}
      <p>{data ? JSON.stringify(data) : 'No data found for this workspace.'}</p>
    </div>
  );
}
