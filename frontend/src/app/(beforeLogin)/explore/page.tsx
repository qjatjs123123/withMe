
import WorkSpaceContainer from './_components/WorkspaceContainer';
import Footer from '@/app/_components/Footer';

interface Params {
  params: {
    keyword: string;
  };
}

export default async function ReadMe({ params }: Params) {
  const keyword = '';
  let data = null;
  let workspaces = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_D}/api/readme/search?keyword=${keyword}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    data = await response.json();
    if (data) workspaces = data.data;

    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

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

export const revalidate = 30;