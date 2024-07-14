import { twJoin } from 'tailwind-merge';
import circle from '../../assets/tictactoe/circle.png';
import cross from '../../assets/tictactoe/cross.png';
import { Player } from './TicTacToe';

type BoardProps = {
  board: Array<Array<string | null>>;
  handleClick: (row: number, col: number) => void;
  winner: Player;
};

const Board: React.FC<BoardProps> = ({ board, handleClick, winner }) => {
  return (
    <div className='flex h-[400px] md:h-[600px] w-full justify-center my-5 flex-col items-center transition-all duration-300 ease-in-out'>
      {board.map((row, i) => (
        <div key={i} className='flex'>
          {row.map((cell, j) => (
            <div
              key={j}
              className={twJoin(
                'flex w-[100px] h-[100px] md:w-[160px] md:h-[160px] bg-[#1f3540] rounded-xl border-4 border-[#0f1b21]',
                cell !== null || winner !== null
                  ? 'cursor-default'
                  : 'cursor-pointer hover:bg-teal-800'
              )}
              onClick={() => handleClick(i, j)}
            >
              {cell === 'X' ? (
                <img
                  src={cross}
                  alt='X'
                  className='m-4 md:m-10 bg-[#1f3540] object-cover'
                />
              ) : cell === 'O' ? (
                <img
                  src={circle}
                  alt='O'
                  className='m-4 md:m-10 bg-[#1f3540] object-cover'
                />
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
