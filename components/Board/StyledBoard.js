import styled from 'styled-components';

const StyledBoard = styled.div`
  font-weight: 800;
  font-size: 40px;
  height: 320px;
  width: 320px;
  border-radius: 5px;
  padding: 10px;
  border: 2px solid #676666;
  background-color: #cbc9c9;

  .player-name {
    font-size: 30px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }

  .row {
    display: flex;
    justify-content: center;
  }

  .winner {
    font-size: 20px;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
`;

export default StyledBoard;

