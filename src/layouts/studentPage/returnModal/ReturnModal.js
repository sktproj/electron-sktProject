import Modal from 'components/modal/Modal';

const customStyles = {
  content: {
    width: '700px',
    height: '600px',
  },
};

const { ipcRenderer } = window.require('electron');

function ReturnModal({ studentId, closeModal }) {
  return (
    <Modal style={customStyles} closeModal={closeModal}>
      abc
    </Modal>
  );
}

export default ReturnModal;
