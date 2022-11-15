import styles from './CustomInput.module.css';
import styled from 'styled-components';

const Input = styled.input`
  width: ${props => props.width};
  height: ${props => props.height};
  border: 2px solid ${props => props.color};
  font-size: ${props => props.fontSize};
`;

function CustomInput(props) {
  return (
    <Input
      width={props.width}
      height={props.height}
      color={props.color}
      fontSize={props.fontSize}
      placeholder={props.placeholder}
      className={styles.input}
      onChange={props.onChangeEvent}
    />
  );
}

export default CustomInput;
