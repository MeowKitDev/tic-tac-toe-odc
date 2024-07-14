import { useState } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import Board from './Board';

export type Player = 'X' | 'O' | null;

const TicTacToe = () => {
  const [player, setPlayer] = useState<Player>('X'); // 'X' or 'O'
  const [winner, setWinner] = useState<Player>(null); // 'X' or 'O'
  const [draw, setDraw] = useState<boolean>(false);
  const [board, setBoard] = useState<Array<Array<Player | null>>>(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => null))
  ); // 3x3 board ([
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],

  const handleClick = (row: number, col: number) => {
    if (board[row][col] || winner) {
      return;
    }

    const newBoard = board.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? player : c))
    );
    setBoard(newBoard);

    const lines = [
      // Horizontal
      [newBoard[0][0], newBoard[0][1], newBoard[0][2]],
      [newBoard[1][0], newBoard[1][1], newBoard[1][2]],
      [newBoard[2][0], newBoard[2][1], newBoard[2][2]],
      // Vertical
      [newBoard[0][0], newBoard[1][0], newBoard[2][0]],
      [newBoard[0][1], newBoard[1][1], newBoard[2][1]],
      [newBoard[0][2], newBoard[1][2], newBoard[2][2]],
      // Diagonal
      [newBoard[0][0], newBoard[1][1], newBoard[2][2]],
      [newBoard[0][2], newBoard[1][1], newBoard[2][0]],
    ];

    if (lines.some((line) => line.every((cell) => cell === player))) {
      setWinner(player);
    }
    //check draw
    if (newBoard.every((row) => row.every((cell) => cell))) {
      setDraw(true);
    }
    setPlayer(player === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setPlayer('X');
    setWinner(null);
    setDraw(false);
    setBoard(
      Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => null))
    );
  };

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div className='w-full h-full text-center'>
        <h1 className='text-4xl font-bold text-center text-white mt-14'>
          Tic Tac Toe Game <span className='text-teal-500'>ODC</span>
        </h1>
        <h5 className='mt-4 text-2xl font-bold text-center text-white'>
          {
            // Conditional rendering
            winner ? (
              <span>
                <span
                  className={twMerge(
                    'text-teal-400',
                    winner === 'X' && 'text-amber-400'
                  )}
                >
                  {winner}
                </span>{' '}
                won the game!
                <span role='img' aria-label='trophy'>
                  🏆
                </span>
              </span>
            ) : draw ? (
              <span>It's a draw!</span>
            ) : (
              <div className='flex justify-center w-full'>
                Player{' '}
                <p
                  className={twJoin(
                    'w-10 mx-1',
                    player === 'X' ? 'text-amber-400' : 'text-teal-400'
                  )}
                >
                  {player}'s
                </p>
                turn
              </div>
            )
          }
        </h5>
        <Board
          board={board}
          handleClick={(row, col) => handleClick(row, col)}
          winner={winner}
        />
        <button
          type='button'
          className='px-4 py-2 mt-4 font-bold text-white transition duration-300 ease-in-out bg-teal-500 rounded-md hover:bg-teal-600 hover:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 active:bg-teal-700'
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
