import { WorkspaceStateProvider } from '@/app/(afterLogin)/_components/WorkspaceInfoProvider';
import UserWorkSpace from '@/app/(afterLogin)/workspace/_component/UserWorkSpace';
import PageHeader from '@/app/_components/PageHeader';
import { PAGE_HEADER } from '@/util/constants';
import axios from 'axios';
import WorkSpaceContainer from './_components/WorkspaceContainer';

interface Params {
  params: {
    keyword: string;
  };
}

export default async function ReadMe({ params }: Params) {
  const { keyword } = await params;
  let data = null;
  let workspaces = null;
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL_D}/api/readme/search?keyword=${keyword}`);
    data = response.data;
    if (data) workspaces = data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <div className="responsive_container">
      <header className="pb-[50px] flex gap-[15px] flex-start header-container">
        <PageHeader title={PAGE_HEADER.search} content={decodeURIComponent(keyword)} />
      </header>
      <div className="grid_mainGrid ">
        <WorkSpaceContainer workspaces={workspaces} />
      </div>
    </div>
  );
}
