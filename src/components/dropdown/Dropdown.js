import { useState } from 'react';

import styles from './Dropdown.module.css';
import styled from 'styled-components';

function Dropdown(props) {
  const Container = styled.div`
    width: ${props.width};
  `;

  const DropdownButton = styled.button`
    height: ${props.height};
    font-size: ${props.fontSize};
  `;

  const Options = styled.div`
    font-size: ${props.fontSize};
  `;

  const [dropdownValue, setDropdownValue] = useState('');

  return (
    <Container className={styles.dropdown}>
      <DropdownButton className={styles.dropdownBtn}>
        <span>{dropdownValue || props.placeholder}</span>
        <span className={styles.arrow}>&gt;</span>
      </DropdownButton>
      <Options className={styles.options}>
        {props.optionList.map(option => {
          return (
            <li
              className={styles.option}
              onClick={() => setDropdownValue(option)}
            >
              {option}
            </li>
          );
        })}
      </Options>
    </Container>
  );
}

export default Dropdown;
