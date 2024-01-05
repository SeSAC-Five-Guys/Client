import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 회원 정보
export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    nickname: '',
    phone: '',
    email: '',
  },
  effects_UNSTABLE: [persistAtom],
});

// 유효성 검사
export const isValidState = atom({
  key: 'isValidState',
  default: {
    phone: false,
    email: false,
    password: false,
  },
});

export const showEmailState = atom({
  key: 'showEmailState',
  default: true,
});
