import { BookReviewItemWrite } from '@/models/book.model';
import { UseFormReset, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../common/Button';

interface Props {
  onAdd: (data: BookReviewItemWrite, reset: UseFormReset<BookReviewItemWrite>) => void;
}

const BookReviewAdd = ({ onAdd }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookReviewItemWrite>();

  const handleAdd = (data: BookReviewItemWrite) => {
    onAdd(data, reset);
  };

  return (
    <BookReviewAddStyle>
      <form onSubmit={handleSubmit(handleAdd)}>
        <fieldset>
          <textarea {...register('content', { required: true })}></textarea>
          {errors.content && <p className="error-text">리뷰를 작성해주세요 </p>}
        </fieldset>
        <div className="submit">
          <fieldset>
            <select defaultValue="5" {...register('score', { required: true, valueAsNumber: true, min: 1, max: 5 })}>
              {Array.from({ length: 5 }, (_, index) => {
                const score = index + 1;
                return (
                  <option key={score} value={score.toString()}>
                    {score}점
                  </option>
                );
              })}
            </select>
          </fieldset>
          <Button size="medium" scheme="primary">
            리뷰 작성
          </Button>
        </div>
      </form>
    </BookReviewAddStyle>
  );
};

const BookReviewAddStyle = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  fieldset {
    border: 0;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 12px;
    justify-content: end;
    flex-direction: column;

    .error-text {
      color: red;
      padding: 0;
    }
  }

  textarea {
    width: 100%;
    height: 100px;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;
  }

  .submit {
    display: flex;
    justify-content: end;
  }
`;

export default BookReviewAdd;
