import "./App.css";
import { useState } from "react";

function App() {
  let [history, setHistory] = useState([
    [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  ]);
  let [currentPlayer, setCurrentPlayer] = useState("X");
  let [winner, setWinner] = useState(null);
  let [currentStep, setCurrentStep] = useState(0);
  let getWinner = (boardCopy) => {
    let winningChar = null;
    const winningConfigs = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];
    for (let i = 0; i < winningConfigs.length; i++) {
      const winningConfig = winningConfigs[i];
      let isWinnerPresent = false;
      let char = boardCopy[winningConfig[0][0]][winningConfig[0][1]];
      if (char !== null) {
        isWinnerPresent =
          winningConfig.filter(
            (point) => boardCopy[point[0]][point[1]] === char
          ).length === winningConfig.length;
        if (isWinnerPresent) {
          winningChar = char;
        }
      }
    }

    return winningChar;
  };
  let boardStateChanged = (newBoard) => {
    const winner = getWinner(newBoard);
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push(newBoard);
    setHistory(newHistory);
    setCurrentPlayer(newHistory.length % 2 === 0 ? "O" : "X");
    setWinner(winner);
    setCurrentStep(newHistory.length - 1);
  };
  let setBoardState = (index) => {
    const winner = getWinner(history[index]);
    // let newHistory = history.slice(0, index + 1);
    setCurrentStep(index);
    // setHistory(newHistory);
    setCurrentPlayer(index % 2 === 0 ? "X" : "O");
    setWinner(winner);
  };
  return (
    <div className="game">
      <div className="game-board">
        <Board
          boardConfig={history[currentStep]}
          currentPlayerInput={currentPlayer}
          disabled={!!winner}
          boardStateChanged={boardStateChanged}
        ></Board>
      </div>
      <div className="game-info">
        <div>
          <div className="status">
            {winner !== null
              ? `Winner is ${winner}`
              : `Next player is ${currentPlayer}`}
          </div>
        </div>
        <ol>
          <TimeTravel
            history={history}
            setBoardState={setBoardState}
          ></TimeTravel>
        </ol>
      </div>
    </div>
  );
}

function Board({
  boardConfig,
  currentPlayerInput,
  disabled,
  boardStateChanged,
}) {
  let setValue = (x, y) => {
    const boardCopy = boardConfig.map((row) => [...row]);
    boardCopy[x][y] = currentPlayerInput;
    boardStateChanged(boardCopy);
  };
  return (
    <div>
      <div className="board-row">
        <Square
          value={boardConfig[0][0]}
          disabled={disabled}
          setValue={setValue}
          position={[0, 0]}
        ></Square>
        <Square
          value={boardConfig[0][1]}
          disabled={disabled}
          setValue={setValue}
          position={[0, 1]}
        ></Square>
        <Square
          value={boardConfig[0][2]}
          disabled={disabled}
          setValue={setValue}
          position={[0, 2]}
        ></Square>
      </div>
      <div className="board-row">
        <Square
          value={boardConfig[1][0]}
          disabled={disabled}
          setValue={setValue}
          position={[1, 0]}
        ></Square>
        <Square
          value={boardConfig[1][1]}
          disabled={disabled}
          setValue={setValue}
          position={[1, 1]}
        ></Square>
        <Square
          value={boardConfig[1][2]}
          disabled={disabled}
          setValue={setValue}
          position={[1, 2]}
        ></Square>
      </div>
      <div className="board-row">
        <Square
          value={boardConfig[2][0]}
          disabled={disabled}
          setValue={setValue}
          position={[2, 0]}
        ></Square>
        <Square
          value={boardConfig[2][1]}
          disabled={disabled}
          setValue={setValue}
          position={[2, 1]}
        ></Square>
        <Square
          value={boardConfig[2][2]}
          disabled={disabled}
          setValue={setValue}
          position={[2, 2]}
        ></Square>
      </div>
    </div>
  );
}

function Square({ value, position, disabled, setValue }) {
  let clickHandler = () => {
    if (!value && !disabled) {
      setValue(position[0], position[1]);
    }
  };

  return (
    <button className="square" onClick={clickHandler}>
      {value}
    </button>
  );
}

function TimeTravel({ history, setBoardState }) {
  let handleClick = (index) => {
    setBoardState(index);
  };
  return (
    <div>
      {history.map((item, index) => (
        <li key={index}>
          <button onClick={() => handleClick(index)}>Go to move {index}</button>
        </li>
      ))}
    </div>
  );
}

export default App;
