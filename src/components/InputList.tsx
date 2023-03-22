import React, { CSSProperties } from "react";
import Xsymbol from "/public/images/icon-cross.svg";
import checkSymbol from "/public/images/icon-check.svg";
import Image from "next/image";

interface ITask {
  task: string;
  id: string;
  completed: boolean;
}

interface InputListProps {
  handleDeleteItem: (id: string) => void;
  handleCheckItem: (id: string) => void;
  key: string;
  item: ITask;
}

export const InputList = ({
  item,
  handleCheckItem,
  handleDeleteItem,
}: InputListProps): JSX.Element => {
  const isItemCompleted = item.completed;

  const ButtonCheckStyling = (isItemCompleted: boolean): CSSProperties => {
    return isItemCompleted
      ? {
          background: "linear-gradient(135deg, #558cff 0%, #c058f3 100%)",
        }
      : { background: "none" };
  };

  const TextCheckStyling = (isItemCompleted: boolean): CSSProperties => {
    return isItemCompleted
      ? {
          textDecoration: "line-through",
          color: "hsl(233, 11%, 84%)",
        }
      : {};
  };

  return (
    <>
      <li className="list-item flex-row spaceB">
        <div className="flex-row gap">
          <div
            style={ButtonCheckStyling(isItemCompleted)}
            className="checkSymbol grid-center"
          >
            <button onClick={() => handleCheckItem(item.id)}>
              <Image src={checkSymbol} alt="" />
            </button>
          </div>
          <div style={TextCheckStyling(isItemCompleted)}>{item.task}</div>
        </div>
        <div className="XSymbol grid-center">
          <button onClick={() => handleDeleteItem(item.id)}>
            <Image src={Xsymbol} alt="" />
          </button>
        </div>
      </li>
    </>
  );
};
