'use client';
import { SnackBarProvider } from '@/app/(afterLogin)/_components/SnackBarProvider';
import PageHeader from '@/app/_components/PageHeader';
import { PAGE_HEADER } from '@/util/constants';
import SyncBtn from '../SyncBtn';
import WorkSpaceContainer from '../WorkSpaceContainer';
import SnackBarUI from '@/app/_components/SnackBarUI';
import RepoBtnContainer from '../RepoBtnContainer';

export default function SnakBarContainer() {
  return (
    <SnackBarProvider>
      <header style={{ paddingTop: '95px', paddingBottom: '50px' }} className="responsive_workspaceheader ">
        <PageHeader title={PAGE_HEADER.workspace} content="" />
        <div className="flex justify-end h-full gap-3 ">
          <SyncBtn />
          <RepoBtnContainer />
        </div>
      </header>
      <div className="grid_mainGrid ">
        <WorkSpaceContainer />
      </div>
      <SnackBarUI />
    </SnackBarProvider>
  );
}
