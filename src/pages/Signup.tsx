import styled from 'styled-components';
import Title from '../components/common/Title';
import InputText from '../components/common/inputText';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signup } from '../api/auth.api';
import { useAlert } from '../hooks/useAlert';

export interface SignupProps {
  email: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const showAlert = useAlert();

  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');

  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault(); // HTML Form을 서밋하면 페이지 이동하게되는데 그걸 막아줌
  //     console.log(email, password);
  //   };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    signup(data).then(() => {
      showAlert('회원가입이 완료되었습니다.'); // 회원가입 성공시 , showAlert함수에 텍스트를 인자로 전달하여 실행
      navigate('/login'); // 회원가입 성공시 , 로그인 화면으로 이동
    });
  };

  console.log('errors : ', errors);

  return (
    <>
      <Title size="large"> 회원가입 </Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText placeholder="이메일" inputType="email" {...register('email', { required: true })} />
            {errors.email && <p className="error-text">이메일을 입력해주세요.</p>}
          </fieldset>
          <fieldset>
            <InputText placeholder="비밀번호" inputType="password" {...register('password', { required: true })} />
            {errors.password && <p className="error-text">비밀번호를 입력해주세요.</p>}
          </fieldset>
          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              회원가입
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  );
};

const SignupStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: 0;
    padding: 0 0 8px 0;
    .error-text {
      color: red;
    }
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

  .info {
    text-align: center;
    padding: 16px 0 0 0;
  }
`;

export default Signup;
