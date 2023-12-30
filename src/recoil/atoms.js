import { atom } from 'recoil';

export const emailState = atom({
  key: 'emailState',
  default: '',
});

export const isEmailValidState = atom({
  key: 'isEmailValidState',
  default: false,
});
