'use client';
import { GlobalStateProvider } from '../../_components/RepoModalProvider';
import RepoBtn from './RepoBtn';

export default function RepoBtnContainer() {
  return (
    <GlobalStateProvider>
      <RepoBtn />
    </GlobalStateProvider>
  );
}
