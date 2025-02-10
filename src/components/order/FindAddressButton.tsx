import Button from '@/components/common/Button';
import { useEffect } from 'react';

interface Props {
  onCompleted: (address: string) => void;
}

const SCRIPT_URL = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const FindAddressButton = ({ onCompleted }: Props) => {
  // 스크립트 로드

  // 핸들러

  // 입력
  const handleOpen = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        console.log(data);

        // buildingName이 존재하면 괄호 포함, 없으면 address만 전달
        const fullAddress = data.buildingName ? `${data.address} (${data.buildingName})` : data.address;

        onCompleted(fullAddress);
      },
    }).open();
  };

  useEffect(() => {
    // <script></script> 생성
    const script = document.createElement('script');
    // <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.vs.js"></script"></
    script.src = SCRIPT_URL;
    // 스크립트의 비동기(async) 설정, HTML이 계속 로드되는 동안 스크립트가 비동기적으로 로드됨
    script.async = true;
    // 위에서 생성한 <script>태그를 <head>태그 안에 추가하는 함
    // <head> ... <script>URL정보</script></head>
    document.head.appendChild(script);

    return () => {
      // 스크립트 로드가 완료되면 removeChild()를 호출
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Button type="button" size="medium" scheme="normal" onClick={handleOpen}>
      주소 찾기
    </Button>
  );
};

export default FindAddressButton;
