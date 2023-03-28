import React, {
  CSSProperties,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
} from "react";
import Xsymbol from "/public/images/icon-cross.svg";
import checkSymbol from "/public/images/icon-check.svg";
import Image from "next/image";
import { useRef } from "react";
import { ToDoItem } from "@/components/models/interfaces";

interface backgroundColour {
  bgColor: string;
  containerColor: string;
  textColor: string;
  borderColor: string;
}

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
  backgroundColours: backgroundColour;
  setdragEventOverItem: Dispatch<SetStateAction<number | undefined>>;
  setdragEventItem: Dispatch<SetStateAction<number | undefined>>;
  handleSort: () => ToDoItem[] | undefined;
}

export const InputItem = ({
  item,
  index,
  backgroundColours,
  handleCheckItem,
  handleDeleteItem,
  setdragEventItem,
  setdragEventOverItem,
  handleSort,
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

  const DragItem = useRef<any>(null);
  const DragOverItem = useRef<any>(null);

  return (
    <>
      <li
        style={{
          backgroundColor: backgroundColours.bgColor,
          border: `1px solid ${backgroundColours.borderColor}`,
        }}
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
