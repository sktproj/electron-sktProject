import Button from 'components/button/Button';

function ConfirmButton({ onClickEvent }) {
  return (
    <Button
      width="200px"
      height="40px"
      fontSize="24px"
      color="#4e73df"
      onClickEvent={onClickEvent}
    >
      확인
    </Button>
  );
}

export default ConfirmButton;
