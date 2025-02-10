import Button from '@/components/common/Button';
import Title from '@/components/common/Title';
import InputText from '@/components/common/inputText';

const Home = () => {
  return (
    <>
      <Title size="large" color="secondary">
        제목테스트
      </Title>
      <Button size="medium" scheme="normal">
        버튼 테스트
      </Button>
      <InputText placeholder="여기에 입력하세요" />
      <div>home body</div>
    </>
  );
};

export default Home;
