import Head from "next/head";
import Image from "next/image";
import { useTheme } from "next-themes";

import Xsymbol from "/public/icon-cross.svg";

import { useModeToggle } from "@/components/hooks/useModeToggle";
import { useState, ChangeEvent, useEffect } from "react";
import { InputForm } from "@/components/InputForm";
import { InputItem } from "@/components/InputItem";

import { useWHMonitor } from "@/components/hooks/useWHMonitor";
import { ToDoItem } from "@/components/models/interfaces";

export default function Home() {
  const [task, setTask] = useState("");
  const [todos, settodos] = useState<ToDoItem[]>([]);
  const { toggleLinkLayout } = useWHMonitor();
  const {
    darkMode,
    toggleIcon,
    togglebgImageLight,
    togglebgImageDark,
    theme,
    setTheme,
    buttonSize,
    checkSize,
  } = useModeToggle();

  // to do: find out why localStorage is no longer persisting

  const [mounted, setMounted] = useState(false);
  const [toggleAll, settoggleAll] = useState(true);
  const [toggleActive, settoggleActive] = useState(false);
  const [toggleCompleted, settoggleCompleted] = useState(false);
  const [dragEventItem, setdragEventItem] = useState<any>();
  const [dragEventOverItem, setdragEventOverItem] = useState<any>();

  useEffect(() => {
    const data = localStorage.getItem("todos");
    if (data !== null) {
      settodos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleClick = () => {
    if (!task) {
      alert("please fill in task");
    } else {
      const newTodo = { task, id: Math.random().toString(), completed: false };
      settodos((prevTodos) => [...prevTodos, newTodo]);
      setTask("");
    }
  };

  const handleDeleteItem = (id: string) => {
    const updatedState = todos.filter((item) => item.id !== id);
    settodos(updatedState);
  };

  const handleCheckItem = (id: string) => {
    settodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleClearItems = () => {
    settodos([]);
  };

  const handleFilterClick = (filter: string) => {
    settoggleActive(filter === "active");
    settoggleAll(filter === "all");
    settoggleCompleted(filter === "completed");
  };

  const filteredItems = todos?.filter((item) => {
    if (toggleAll) {
      return true;
    } else if (toggleActive) {
      return !item.completed;
    } else if (toggleCompleted) {
      return item.completed;
    } else {
      return false;
    }
  });

  const handleSort = () => {
    const sortedArray = [...filteredItems];

    const draggedItems = sortedArray.splice(dragEventItem, 1)[0];
    sortedArray.splice(dragEventOverItem, 0, draggedItems);

    setdragEventItem(0);
    setdragEventOverItem(0);
    settodos(sortedArray);
  };

  const itemCount = filteredItems.length;

  const footerLinkString = ["all", "active", "completed"];

  return (
    <>
      <Head>
        <title>Front-end Mentor To Do List</title>
        <meta name="description" content="Front-end Mentor To Do List" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-image-wrapper">
        {darkMode ? (
          <Image className="image" src={togglebgImageDark} alt="" priority />
        ) : (
          <Image className="image" src={togglebgImageLight} alt="" priority />
        )}
      </div>

      <div className="container grid-center">
        <div className="card">
          <div className="input-container flex-column">
            <div className="flex-row spaceB">
              <h1>To Do</h1>

              <div>
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  <Image src={toggleIcon} width={50} height={50} alt="" />
                </button>
              </div>
            </div>

            <InputForm
              task={task}
              handleChange={handleChange}
              handleClick={handleClick}
            />

            <ul className="input-current">
              {filteredItems.map((item, index) => (
                <InputItem
                  item={item}
                  key={item.id}
                  index={index}
                  handleCheckItem={handleCheckItem}
                  handleDeleteItem={handleDeleteItem}
                  setdragEventItem={setdragEventItem}
                  setdragEventOverItem={setdragEventOverItem}
                  handleSort={handleSort}
                  darkMode={darkMode}
                  buttonSize={buttonSize}
                  checkSize={checkSize}
                />
              ))}
            </ul>

            {toggleLinkLayout ? (
              <div className="infomation-panel flex-row gap t">
                <div>
                  <h2 className="item-count">{itemCount} items left</h2>
                </div>

                {footerLinkString.map((title: string, key: number) => {
                  return (
                    <div key={key}>
                      <button
                        className="button-components"
                        onClick={() => handleFilterClick(title)}
                      >
                        {title}
                      </button>
                    </div>
                  );
                })}

                <div className="clear-btn">
                  <button
                    className="button-components"
                    onClick={handleClearItems}
                  >
                    clear completed
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="infomation-panel flex-row spaceB">
                  <div className="item-count">
                    <h2>{itemCount} items left</h2>
                  </div>
                  <div className="clear-btn">
                    <button
                      className="button-components"
                      onClick={handleClearItems}
                    >
                      Clear completed
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {!toggleLinkLayout ? (
            <div className="links-container flex-row spaceB">
              {footerLinkString.map((title: string, key: number) => {
                return (
                  <div key={key}>
                    <button
                      //  style={onMouseEnterHover(title)}
                      className="button-components"
                      onClick={() => handleFilterClick(title)}
                    >
                      {title}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="drop-p grid-center">
            <h3>drag and drop to re-order list</h3>
          </div>
        </div>
      </div>
    </>
  );
}
