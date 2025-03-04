// src/app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';

export async function GET() {
  const pathToRevalidate = '/explore';  // 재빌드할 경로 지정
  console.log("Revalidation initiated for path: ", pathToRevalidate);

  try {
    // 지정된 경로의 재빌드를 강제로 트리거
    revalidatePath(pathToRevalidate);
    return new Response(JSON.stringify({ revalidated: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error("Error during revalidation: ", err);
    return new Response('Error revalidating', { status: 500 });
  }
}
