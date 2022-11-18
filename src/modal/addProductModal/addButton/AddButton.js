import { useContext } from 'react';
import AppContext from 'context/AppContext';
import CustomButton from 'components/customButton/CustomButton';
import ProductAPI from 'api/ProductAPI';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';

function AddButton({ productName }) {
  const { setCurrentModal } = useContext(AppContext);

  return (
    <CustomButton
      width={'100px'}
      height={'40px'}
      color={'#4e73df'}
      fontSize={'24px'}
      onClickEvent={async () => {
        if (productName.length === 0) {
          setCurrentModal(KIND_OF_MODAL.NONE);
          return;
        }
        await ProductAPI.addProduct(productName);
        setCurrentModal(KIND_OF_MODAL.NONE);
        window.location.reload();
      }}
    >
      추가
    </CustomButton>
  );
}

export default AddButton;
