import StyledBoard from './StyledBoard';
import { useState, useEffect } from "react";
import Box from './Box/Box';

const Board = () => {
  const initialCheckboard: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const randomPlayer = (): number => Math.floor(Math.random()*100) < 50 ? 1 : 2;
  const [checkBoard, setCheckBoard] = useState<number[][]>(initialCheckboard);
  const [player, setPlayer] = useState<number>(-1);
  const [displayWinner, setDisplayWinner] = useState<Boolean>(false);

  const reset = () => {
    setCheckBoard(initialCheckboard);
    setDisplayWinner(false);
    setPlayer(randomPlayer);
  };

  const winStep = () => {
    setDisplayWinner(true);
    setTimeout(() => {
      reset();
    }, 2000);
  }

  const calculateWinner = (chkboard: number[][]): boolean | undefined => {
    if (chkboard.flat().every(box => box !== 0)) {
      alert('non winner');
      reset();
      return;
    }

    for (let i = 0; i < 3; i++) {
      // horizontal lines
      if (chkboard[i].every(item => item === player)) {
        winStep();
        return true;
      }

      // vertical lines
      if (chkboard.reduce((acc, curr) => {
        if (curr[i] === player) acc += 5;
        return acc;
      }, 0) === 15) {
        winStep();
        return true;
      }

    }

    // diagonals
    if (chkboard.reduce((acc, curr, idx) => {
      if (curr[idx] === player) acc += 5;
      return acc;
    }, 0) === 15) {
      winStep();
      return true;
    }

    if (chkboard.reduce((acc, curr, idx) => {
      if (curr[2-idx] === player) acc += 5;
      return acc;
    }, 0) === 15) {
      winStep();
      return true;
    }
  }

  const mouseHandler = (e: React.MouseEvent) => {
    const [rowId, columnId]: string[] = (e.target as HTMLElement).classList[2].substr(3, 3).split('-');
    const checkBoardUpdate: number[][] = [...checkBoard];
    checkBoardUpdate[+rowId][+columnId] = player;
    setCheckBoard(checkBoardUpdate);
  }

  useEffect(() => {
    const isWin = calculateWinner(checkBoard);
    if (player !== -1 && !isWin) {
      setPlayer((player << 1) % 3); // alternate player 1 and 2
    }
  }, [checkBoard]);

  useEffect(() => {
    setPlayer(randomPlayer());
  }, []);


  return (
    <StyledBoard>
      <div className="player-name">Player {player === 1 ? 'x' : 'o'}</div>
      <div onMouseDown={mouseHandler}>
        {
          checkBoard.map((row, idx1) => {
            return (
              <div key={idx1} className="row">
                {
                  row.map((value, idx2) => {
                    const id = `${idx1}-${idx2}`;
                    return (
                      <Box
                        key={id}
                        id={id}
                        value={value}
                      />
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
      <div className="winner">
        {
          displayWinner &&
            <span>
              the winner is { player === 1 ? 'x' : 'o' }
            </span>
        }
      </div>
    </StyledBoard>
  )
}

export default Board;
