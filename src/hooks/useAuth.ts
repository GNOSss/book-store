import { login, resetPassword, resetRequest, signup } from '@/api/auth.api';
import { SignupProps } from '@/pages/Signup';
import { useAuthStore } from '@/store/authStore';
import { useAlert } from './useAlert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const useAuth = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  /** 1. 상태
   * isloggedIn : 상태
   * storeLogin,storeLogout : 액션
   */
  const { storeLogin, storeLogout, isloggedIn } = useAuthStore();

  // 2. 액션(메소드)
  const userLogin = (data: SignupProps) => {
    login(data).then(
      (res) => {
        storeLogin(res.token); // isloggedIn은 true 변환
        showAlert('로그인 완료되었습니다.');
        navigate('/');
      },
      (error) => {
        showAlert(`로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다. ${error}`);
      }
    );
  };

  const userSignup = (data: SignupProps) => {
    signup(data).then(() => {
      showAlert('회원가입이 완료되었습니다.');
      navigate('/login');
    });
  };

  const [resetRequested, setResetRequest] = useState(false);

  const userResetPassword = (data: SignupProps) => {
    // 초기화 (이메일 인증 후 비밀번호 초기화)
    resetPassword(data).then(() => {
      showAlert('비밀번호가 초기화되었습니다.');
      navigate('/login');
    });
  };

  const userResetRequest = (data: SignupProps) => {
    // 요청 (이메일 인증)
    resetRequest(data).then(() => {
      setResetRequest(true);
    });
  };

  // 3. 리턴
  return { userLogin, userSignup, resetRequested, userResetPassword, userResetRequest };
};
