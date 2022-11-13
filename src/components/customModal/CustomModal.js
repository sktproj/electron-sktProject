import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFFFFF',
    boxShadow: 'rgba(149, 157, 165, 0.4) 0px 0px 18px',
  },
};

function CustomModal({ style, children }) {
  return (
    <ReactModal
      isOpen={true}
      style={{ content: { ...customStyles.content, ...style.content } }}
    >
      {children}
    </ReactModal>
  );
}

export default CustomModal;
