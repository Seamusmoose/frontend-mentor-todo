import Head from "next/head";
import Image from "next/image";
import { useModeToggle } from "@/components/hooks/useModeToggle";
import { useState, useEffect, ChangeEvent, CSSProperties } from "react";
import { InputForm } from "@/components/InputForm";
import { InputList } from "@/components/InputList";
import { useTheme } from "next-themes";

interface ITask {
  task: string;
  id: string;
  completed: boolean;
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [task, setTask] = useState("");
  const [todos, settodos] = useState<ITask[]>([]);
  const [todosFiltered, settodosFiltered] = useState<ITask[]>(todos);

  const { toggleDarkMode, toggleIcon, togglebgImageLight, togglebgImageDark } =
    useModeToggle();

  const [toggleAll, settoggleAll] = useState(false);
  const [toggleActive, settoggleActive] = useState(true);
  const [toggleCompleted, settoggleCompleted] = useState(false);
  const [toggleLinkLayout, settoggleLinkLayout] = useState(false);

  // monitors width and height for menu change
  useEffect(() => {
    function handleResize() {
      settoggleLinkLayout(window.innerWidth >= 600);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  function getButtonStyle(active: boolean): React.CSSProperties {
    return {
      color: active ? "hsl(220, 98%, 61%" : "hsl(236, 9%, 61%)",
    };
  }

  const filteredItems = todos
    ?.filter((item) => {
      if (toggleAll) {
        return true;
      } else if (toggleActive) {
        return !item.completed;
      } else if (toggleCompleted) {
        return item.completed;
      } else {
        return false;
      }
    })
    .map((item) => (
      <InputList
        item={item}
        key={item.id}
        handleCheckItem={handleCheckItem}
        handleDeleteItem={handleDeleteItem}
      />
    ));

  const itemCount = filteredItems.length;

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

            <ul className="input-current">{filteredItems}</ul>

            {toggleLinkLayout ? (
              <div className="infomation-panel flex-row gap">
                <div className="item-count">
                  <h2>{itemCount} items left</h2>
                </div>

                <button
                  style={getButtonStyle(toggleAll)}
                  className="button-components"
                  onClick={() => handleFilterClick("all")}
                >
                  All
                </button>

                <button
                  style={getButtonStyle(toggleActive)}
                  className="button-components"
                  onClick={() => handleFilterClick("active")}
                >
                  Active
                </button>

                <button
                  style={getButtonStyle(toggleCompleted)}
                  className="button-components"
                  onClick={() => handleFilterClick("completed")}
                >
                  Completed
                </button>

                <div className="clear-btn">
                  <button
                    className="button-components"
                    onClick={handleClearItems}
                  >
                    Clear completed
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
              <button
                style={getButtonStyle(toggleAll)}
                className="button-components"
                onClick={() => handleFilterClick("all")}
              >
                All
              </button>

              <button
                style={getButtonStyle(toggleActive)}
                className="button-components"
                onClick={() => handleFilterClick("active")}
              >
                Active
              </button>

              <button
                style={getButtonStyle(toggleCompleted)}
                className="button-components"
                onClick={() => handleFilterClick("completed")}
              >
                Completed
              </button>
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
