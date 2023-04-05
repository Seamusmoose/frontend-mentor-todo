import React, { CSSProperties, Dispatch, SetStateAction } from "react";
import Xsymbol from "/public/icon-cross.svg";
import CheckSymbol from "/public/icon-check.svg";
import Image from "next/image";
import { useRef } from "react";

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
  index: number;

  setdragEventOverItem: Dispatch<SetStateAction<number | undefined>>;
  setdragEventItem: Dispatch<SetStateAction<number | undefined>>;
  handleSort: () => void;
  darkMode: boolean;
}

export const InputItem = ({
  item,
  index,

  handleCheckItem,
  handleDeleteItem,
  setdragEventItem,
  setdragEventOverItem,
  handleSort,
  darkMode,
}: InputListProps): JSX.Element => {
  const isItemCompleted = item.completed;

  let image;

  const ButtonImageToggle = (isItemCompleted: boolean): any => {
    return isItemCompleted ? CheckSymbol : "";
  };

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

  const DragItem = useRef<any>(null);
  const DragOverItem = useRef<any>(null);

  return (
    <>
      <li
        className="list-item flex-row spaceB"
        draggable
        onDragStart={() => setdragEventItem((DragItem.current = index))}
        onDragEnter={() => setdragEventOverItem((DragOverItem.current = index))}
        onDragEnd={handleSort}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex-row gap">
          <div
            style={ButtonCheckStyling(isItemCompleted)}
            className="checkSymbol grid-center"
          >
            <button
              className="button-size"
              onClick={() => handleCheckItem(item.id)}
            >
              <Image className="check-container" src={CheckSymbol} alt="" />
            </button>
          </div>
          <div style={TextCheckStyling(isItemCompleted)}>{item.task}</div>
        </div>
        <div className="XSymbol grid-center">
          <button onClick={() => handleDeleteItem(item.id)}>
            <Image
              className="check-container"
              src={Xsymbol}
              width={20}
              height={20}
              alt=""
            />
          </button>
        </div>
      </li>
    </>
  );
};
