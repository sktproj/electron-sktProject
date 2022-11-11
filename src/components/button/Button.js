import styles from './Button.module.css';
import styled from 'styled-components';

const Btn = styled.button`
  width: ${props => props.width};
  height: ${props => props.height};
  border: 2px solid ${props => props.color};
  color: ${props => props.color};
  font-size: ${props => props.fontSize};

  &:hover {
    background-color: ${props => props.color};
  }
`;

function Button(props) {
  return (
    <Btn
      width={props.width}
      height={props.height}
      color={props.color}
      fontSize={props.fontSize}
      className={styles.button}
      onClick={props.onClickEvent}
    >
      {props.children}
    </Btn>
  );
}

export default Button;
