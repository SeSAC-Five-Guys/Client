import { atom } from 'recoil';

// 입력 정보
export const inputDataState = atom({
  key: 'inputDataState',
  default: {
    nickname: '',
    phone: '',
    email: '',
    password: '',
  },
});

// 회원 정보
export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    nickname: '',
    phone: '',
    email: '',
    password: '',
  },
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
