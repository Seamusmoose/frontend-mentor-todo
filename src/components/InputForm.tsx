import Image from "next/image";
import { ChangeEvent } from "react";
import CheckSymbol from "/public/icon-check.svg";

interface ToDoProps {
  handleClick: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  task: string;
}

export const InputForm = ({
  handleClick,
  handleChange,
  task,
}: ToDoProps): JSX.Element => {
  return (
    <>
      <div className="input-list-item flex-row spaceB gap">
        <div className="checkSymbol grid-center">
          <button onClick={handleClick}>
            <CheckSymbol
              className="check-container"
              // src={CheckSymbol}
              alt=""
            />
          </button>
        </div>

        <input
          className="input-new-item"
          type="text"
          placeholder="add new todo"
          onChange={handleChange}
          value={task}
        />
      </div>
    </>
  );
};
