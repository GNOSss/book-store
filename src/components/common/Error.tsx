import { useRouteError } from 'react-router-dom';

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
}

const Error = () => {
  const error = useRouteError() as RouteError;
  console.log('에러는 :', error);
  return (
    <div>
      <h1>오류 입니다.</h1>
      <p>다음과 같은 오류가 발생했습니다.</p>
      <p>{error.status}</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
};

export default Error;
