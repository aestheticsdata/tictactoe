import StyledBoard from "./StyledBoard";
import { useState, useEffect } from "react";
import Box from './Box/Box';

const Board = () => {
  const initialCheckboard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const randomPlayer = () => Math.floor(Math.random()*100) < 50 ? 1 : 2;
  const [checkBoard, setCheckBoard] = useState(initialCheckboard);
  const [player, setPlayer] = useState(randomPlayer());

  const winStep = () => {
    alert(`player number ${player}  has won`);
    setCheckBoard(initialCheckboard);
    setPlayer(randomPlayer);
  }

  const calculateWinner = (chkboard: number[][]) => {
    for (let i = 0; i < 3; i++) {
      // horizontal lines
      if (chkboard[i].every(item => item === player)) {
        winStep();
      }

      // vertical lines
      if (chkboard.reduce((acc, curr) => {
        if (curr[i] === player) acc += 5;
        return acc;
      }, 0) === 15) {
        winStep();
      }

    }

    // diagonals
    if (chkboard.reduce((acc, curr, idx) => {
      if (curr[idx] === player) acc += 5;
      return acc;
    }, 0) === 15) {
      winStep();
    }

    if (chkboard.reduce((acc, curr, idx) => {
      if (curr[2-idx] === player) acc += 5;
      return acc;
    }, 0) === 15) {
      winStep();
    }
  }

  const mouseHandler = (e: React.MouseEvent) => {
    const [rowId, columnId]: string[] = (e.target as HTMLElement).classList[2].substr(3, 3).split('-');
    const checkBoardUpdate: number[][] = [...checkBoard];
    checkBoardUpdate[+rowId][+columnId] = player;
    setCheckBoard(checkBoardUpdate);
  }

  useEffect(() => {
    calculateWinner(checkBoard);
    setPlayer((player << 1) % 3); // alternate player 1 and 2
  }, [checkBoard]);

  return (
    <StyledBoard>
      <div>Player {player === 1 ? 'x' : 'o'}</div>
      <div onMouseDown={mouseHandler}>
        {
          checkBoard.map((row, idx1) => {
            return (
              <div key={idx1} className="row">
                {
                  row.map((value, idx2) => {
                    return (
                      <div key={`${idx1}-${idx2}`} className="box">
                        <Box id={`${idx1}-${idx2}`} value={value} />
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    </StyledBoard>
  )
}

export default Board;
