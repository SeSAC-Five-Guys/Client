import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    nickname: '',
    phone: '',
    email: '',
  },
  effects_UNSTABLE: [persistAtom],
});
