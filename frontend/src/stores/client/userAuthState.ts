import { atom } from 'recoil';

export const userAuthState = atom({
  key: 'userAuth',
  default: '',
});
