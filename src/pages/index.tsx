import Head from "next/head";
import Image from "next/image";
import { useModeToggle } from "@/components/hooks/useModeToggle";
import { useState, useEffect, ChangeEvent, CSSProperties } from "react";
import { InputForm } from "@/components/InputForm";
import { InputItem } from "@/components/InputItem";
import { useTheme } from "next-themes";
import { useWHMonitor } from "@/components/hooks/useWHMonitor";
import { ToDoItem } from "@/components/models/interfaces";
import { useHover } from "@/components/hooks/useHover";

export default function Home() {
  const [task, setTask] = useState("");
  const [todos, settodos] = useState<ToDoItem[]>([]);
  const { toggleLinkLayout } = useWHMonitor();
  const { toggleDarkMode, toggleIcon, togglebgImageLight, togglebgImageDark } =
    useModeToggle();

  const [toggleAll, settoggleAll] = useState(false);
  const [toggleActive, settoggleActive] = useState(true);
  const [toggleCompleted, settoggleCompleted] = useState(false);

  const [toggleAllHover, settoggleAllHover] = useState(false);
  const [toggleActiveHover, settoggleActiveHover] = useState(true);
  const [toggleCompletedHover, settoggleCompletedHover] = useState(false);

  const [checked, setchecked] = useState(false);

  const [dragEventItem, setdragEventItem] = useState<any>();
  const [dragEventOverItem, setdragEventOverItem] = useState<any>();
  const [onHover, setonHover] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

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

  useEffect(() => {
    const data = localStorage.getItem("todos");
    if (data !== null) {
      settodos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const itemCount = filteredItems.length;

  const footerLinkString = ["all", "active", "completed"];

  const handleTitleHover = (title: string) => {
    console.log(`Hovered over ${title}`);
    //console.log(title === "active" && !toggleActiveHover, "t");

    settoggleActiveHover(title === "active" && !toggleActiveHover);
    settoggleAllHover(title === "all" && !toggleAllHover);
    settoggleCompletedHover(title === "completed" && !toggleCompletedHover);
  };

  function handleTitleLeave(title: string) {
    console.log("Left hover");
    //console.log(title === "active" && !toggleActiveHover, "p");

    settoggleActiveHover(title === "active" && !toggleActiveHover);
    settoggleAllHover(title === "all" && !toggleAllHover);
    settoggleCompletedHover(title === "completed" && !toggleCompletedHover);
  }

  const handleHoverStyling = (title: string): CSSProperties => {
    console.log(
      toggleActiveHover,
      "active",
      toggleAllHover,
      "All",
      toggleCompletedHover,
      "completed"
    );

    return {};
  };

  return (
    <>
      <Head>
        <title>Front-end Mentor To Do List</title>
        <meta name="description" content="Front-end Mentor To Do List" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-image-wrapper">
        {toggleDarkMode ? (
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
              <div className="image-container">
                <Image src={toggleIcon} width={50} height={50} alt="" />
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
                        style={handleHoverStyling(title)}
                        onClick={() => handleFilterClick(title)}
                        onMouseOver={() => handleTitleHover(title)}
                        onMouseLeave={() => handleTitleLeave(title)}
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

                {/* <button
                  // style={onMouseEnterHover("all")}
                  className="button-components"
                  onClick={() => handleFilterClick("all")}
                >
                  All
                </button>

                <button
                  // style={onMouseEnterHover(toggleActive)}
                  className="button-components"
                  onClick={() => handleFilterClick("active")}
                >
                  Active
                </button>

                <button
                  // {...hover}
                  //style={onMouseEnterHover(toggleCompleted)}
                  className="button-components"
                  onClick={() => handleFilterClick("completed")}
                >
                  Completed
                </button> */}
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
