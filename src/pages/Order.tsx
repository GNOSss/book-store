import { useLocation, useNavigate } from 'react-router-dom';
import Title from '@/components/common/Title';
import { CartStyle } from './Cart';
import CartSummary from '@/components/cart/CartSummary';
import Button from '@/components/common/Button';
import InputText from '@/components/common/inputText';
import { useForm } from 'react-hook-form';
import { Delivery, OrderSheet } from '@/models/order.model';
import FindAddressButton from '@/components/order/FindAddressButton';
import { order } from '@/api/order.api';
import { useAlert } from '@/hooks/useAlert';

/**
 * 상세주소는 현재 페이지에서만 필요하기 때문에
 * Delivery interface 타입을 상속 받고
 * 커스텀으로 addressDetails, buildingName을 추가했음
 * */
interface DeliveryForm extends Delivery {
  addressDetail: string;
  buildingName?: string;
}

const Order = () => {
  const { showAlert, showConfirm } = useAlert();
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * orderDataFromCart
   * Cart에서 체크된 아이템들을
   * navigate를 통해서 받아온
   * 주문 객체들
   */
  const orderDataFromCart = location.state || {};
  const { totalQuantity, totalPrice, firstBookTitle } = orderDataFromCart;

  console.log('orderDataFromCart', orderDataFromCart);

  useForm();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DeliveryForm>();

  const handlePay = (data: DeliveryForm) => {
    console.log('주소 데이터 : ', data);
    const orderData: OrderSheet = {
      ...orderDataFromCart,
      delivery: {
        ...data,
        address: `${data.address} ${data.buildingName ? data.buildingName : ''} ${data.addressDetail}`.trim(),
      },
    };

    // 서버로 넘겨주는 데이터들
    console.log('orderdata  : ', orderData);

    showConfirm('주문을 진행하시겠습니까 ?', () => {
      order(orderData).then(() => {
        showAlert('주문이 처리되었습니다.');
        navigate('/orderlist');
      });
    });
  };

  return (
    <>
      <Title size="large">주문서 작성</Title>
      <CartStyle>
        <div className="contents">
          <div className="order-info">
            <Title size="medium" color="text">
              배송 정보
            </Title>
            <form className="delivery">
              <fieldset>
                <label>주소</label>
                <div className="input">
                  <InputText inputType="text" {...register('address', { required: true })}></InputText>
                </div>
                <FindAddressButton
                  onCompleted={(address) => {
                    setValue('address', address);
                  }}
                />
              </fieldset>
              {errors.address && <p className="error-text">주소를 입력해 주세요</p>}
              <fieldset>
                <label>상세주소</label>
                <div className="input">
                  <InputText inputType="text" {...register('addressDetail', { required: true })}></InputText>
                </div>
              </fieldset>
              {errors.address && <p className="error-text">상세 주소를 입력해 주세요</p>}
              <fieldset>
                <label>수령인</label>
                <div className="input">
                  <InputText inputType="text" {...register('recelver', { required: true })}></InputText>
                </div>
              </fieldset>
              {errors.address && <p className="error-text">수령인을 입력해 주세요</p>}
              <fieldset>
                <label>전화번호</label>
                <div className="input">
                  <InputText inputType="text" {...register('contact', { required: true })}></InputText>
                </div>
              </fieldset>
              {errors.address && <p className="error-text">전화번호를 입력해 주세요</p>}
            </form>
          </div>
          <div className="order-info">
            <Title size="medium" color="text">
              주문 상품
            </Title>
            <strong>
              {firstBookTitle} 등 총 {totalQuantity}권
            </strong>
          </div>
        </div>
        <div className="summary">
          <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
          <Button size="large" scheme="primary" onClick={handleSubmit(handlePay)}>
            결제 하기
          </Button>
        </div>
      </CartStyle>
    </>
  );
};

export default Order;
