import CustomInput from 'components/customInput/CustomInput';

function ProductNameInput({ setProductName }) {
  return (
    <CustomInput
      width="90%"
      height="50px"
      fontSize="22px"
      color="#36b9cc"
      placeholder="물품의 이름을 입력하세요"
      onChangeEvent={e => {
        setProductName(e.target.value);
      }}
    ></CustomInput>
  );
}

export default ProductNameInput;
