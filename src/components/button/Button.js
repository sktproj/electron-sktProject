import styles from './Button.module.css';
import styled from 'styled-components';

function Button(props) {
  const Btn = styled.button`
    width: ${props.width};
    height: ${props.height};
    border: 2px solid ${props.color};
    color: ${props.color};
    font-size: ${props.fontSize};

    &:hover {
      background-color: ${props.color};
    }
  `;

  return (
    <Btn className={styles.button} onClick={props.onClickEvent}>
      {props.children}
    </Btn>
  );
}

export default Button;
