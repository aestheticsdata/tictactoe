import styled from 'styled-components';

const StyledBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  text-align: center;
  border: 1px solid darkblue;
  border-radius: 3px;
  margin: 2px;
  cursor: pointer;
  background-color: lightblue;

  .x-o {
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 55px;
  }
`;

export default StyledBox;

