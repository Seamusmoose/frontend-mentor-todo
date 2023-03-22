import Head from "next/head";
import Image from "next/image";
import { useTheme } from "@/components/hooks/useTheme";
import { useState, useEffect, ChangeEvent, CSSProperties } from "react";
import { InputForm } from "@/components/InputForm";
import { InputList } from "@/components/InputList";

interface ITask {
  task: string;
  id: string;
  completed: boolean;
}

export default function Home() {
  const [task, setTask] = useState("");
  const [todos, settodos] = useState<ITask[]>([]);
  const [todosFiltered, settodosFiltered] = useState<ITask[]>(todos);

  const { toggleDarkMode, toggleIcon, togglebgImageLight, togglebgImageDark } =
    useTheme();

  const [toggleAll, settoggleAll] = useState(false);
  const [toggleActive, settoggleActive] = useState(true);
  const [toggleCompleted, settoggleCompleted] = useState(false);
  const [toggleLinkLayout, settoggleLinkLayout] = useState(false);

  const itemCount = todosFiltered.length;

  // monitors width and height for menu change
  useEffect(() => {
    if (window.innerWidth >= 600) {
      settoggleLinkLayout(true);
    }

    if (window.innerWidth <= 600) {
      settoggleLinkLayout(false);

      window.addEventListener("resize", () => {
        if (window.innerWidth >= 600) {
          settoggleLinkLayout(true);
        }

        if (window.innerWidth <= 600) {
          settoggleLinkLayout(false);
        }
      });
    }
  }, []);

  // monitors darkMode

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleClick = () => {
    const randomID = Math.random().toString();

    if (task === "") {
      alert("please fill in task");
    } else {
      settodos((prevtodos) => [
        ...prevtodos,
        { task: task, id: randomID, completed: false },
      ]);

      setTask("");
    }
  };

  const handleDeleteItem = (id: string) => {
    const updatedState = todos.filter((item) => item.id !== id);
    settodos(updatedState);
  };

  const handleCheckItem = (id: string) => {
    const updatedState = todos.map((item) => {
      if (item.id === id) {
        return { ...item, completed: true };
      }
      return item;
    });

    settodos(updatedState);
  };

  // console.log(todos);

  const filterByActive = () => {
    const filteredbyActive = todos.filter((item) => item.completed === false);
    settodosFiltered(filteredbyActive);
  };

  const filteByCompleted = () => {
    const filteredbyCompleted = todos.filter((item) => item.completed === true);
    settodos(filteredbyCompleted);
  };

  const handleClearItems = () => {
    settodos([]);
  };

  const showActive = () => {
    settoggleActive(true);
    settoggleAll(false);
    settoggleCompleted(false);
  };

  const showAll = () => {
    settoggleActive(false);
    settoggleAll(true);
    settoggleCompleted(false);
  };

  const showCompleted = () => {
    settoggleActive(false);
    settoggleAll(false);
    settoggleCompleted(true);
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
              {todos?.map((item) => {
                if (toggleAll) {
                  return (
                    <InputList
                      item={item}
                      key={item.id}
                      handleCheckItem={handleCheckItem}
                      handleDeleteItem={handleDeleteItem}
                    />
                  );
                }
                if (toggleActive) {
                  if (item.completed === false) {
                    return (
                      <InputList
                        item={item}
                        key={item.id}
                        handleCheckItem={handleCheckItem}
                        handleDeleteItem={handleDeleteItem}
                      />
                    );
                  }
                }
                if (toggleCompleted) {
                  if (item.completed === true) {
                    return (
                      <InputList
                        item={item}
                        key={item.id}
                        handleCheckItem={handleCheckItem}
                        handleDeleteItem={handleDeleteItem}
                      />
                    );
                  }
                }
              })}
            </ul>

            {toggleLinkLayout ? (
              <div className="infomation-panel flex-row gap">
                <div className="item-count">
                  <h2>{itemCount} items left</h2>
                </div>

                <div>
                  <button
                    style={
                      toggleAll
                        ? { color: "hsl(220, 98%, 61%" }
                        : { color: "hsl(236, 9%, 61%)" }
                    }
                    className="button-components"
                    onClick={showAll}
                  >
                    All
                  </button>
                </div>
                <div>
                  <button
                    style={
                      toggleActive
                        ? { color: "hsl(220, 98%, 61%" }
                        : { color: "hsl(236, 9%, 61%)" }
                    }
                    className="button-components"
                    onClick={showActive}
                  >
                    Active
                  </button>
                </div>
                <div>
                  <button
                    style={
                      toggleCompleted
                        ? { color: "hsl(220, 98%, 61%" }
                        : { color: "hsl(236, 9%, 61%)" }
                    }
                    className="button-components"
                    onClick={showCompleted}
                  >
                    Completed
                  </button>
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
                style={
                  toggleAll
                    ? { color: "hsl(220, 98%, 61%" }
                    : { color: "hsl(236, 9%, 61%)" }
                }
                className="button-components"
                onClick={showAll}
              >
                All
              </button>
              <button
                style={
                  toggleActive
                    ? { color: "hsl(220, 98%, 61%" }
                    : { color: "hsl(236, 9%, 61%)" }
                }
                className="button-components"
                onClick={filterByActive}
              >
                Active
              </button>
              <button
                style={
                  toggleCompleted
                    ? { color: "hsl(220, 98%, 61%" }
                    : { color: "hsl(236, 9%, 61%)" }
                }
                className="button-components"
                onClick={filteByCompleted}
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

{
  /* <ul className="input-current">
              {todos?.map((item) => {
                const isItemCompleted = item.completed;
                return (
                  <li key={item.id} className="list-item flex-row spaceB">
                    <div className="flex-row gap">
                      <div
                        style={ButtonCheckStyling(isItemCompleted)}
                        className="checkSymbol grid-center"
                      >
                        <button onClick={() => handleCheckItem(item.id)}>
                          <Image src={checkSymbol} alt="" />
                        </button>
                      </div>
                      <div
                        style={
                          item.completed
                            ? {
                                textDecoration: "line-through",
                                color: "hsl(233, 11%, 84%)",
                              }
                            : {}
                        }
                      >
                        {item.task}
                      </div>
                    </div>
                    <div className="XSymbol grid-center">
                      <button onClick={() => handleDeleteItem(item.id)}>
                        <Image src={Xsymbol} alt="" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul> */
}
