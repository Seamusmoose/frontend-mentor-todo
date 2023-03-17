import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import dayIcon from "../../public/icon-moon.svg";
import nightIcon from "../../public/icon-sun.svg";
import bgDayDark from "../../public/bg-desktop-dark.jpg";
import bgDayLight from "../../public/bg-desktop-light.jpg";
import bgDayMobileDark from "../../public/bg-mobile-dark.jpg";
import bgDayMobileLight from "../../public/bg-mobile-light.jpg";
import Xsymbol from "../../public/icon-cross.svg";
import checkSymbol from "../../public/icon-check.svg";
import { useState, useEffect, ChangeEvent } from "react";

const exampleArr = [
  "Jog around the park",
  "meditation",
  "blahh",
  "blahhhh",
  "blahhhhhhhh",
];

interface ITask {
  task: string;
  id: string;
  completed: boolean;
}

const itemCount = exampleArr.length;

export default function Home() {
  const [toggleDarkMode, settoggleDarkMode] = useState(false);
  const [toggleLinkLayout, settoggleLinkLayout] = useState(false);
  const [toggleIcon, settoggleIcon] = useState(dayIcon);
  const [togglebgImageLight, settogglebgImageLight] = useState(bgDayLight);
  const [togglebgImageDark, settogglebgImageDark] = useState(bgDayDark);
  const [todos, settodos] = useState<ITask[]>([]);
  const [task, setTask] = useState("");
  const [toggleAll, settoggleAll] = useState(false);
  const [toggleActive, settoggleActive] = useState(true);
  const [toggleCompleted, settoggleCompleted] = useState(false);

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (window.innerWidth >= 600) {
      settoggleLinkLayout(true);
    }

    if (window.innerWidth <= 600) {
      settoggleLinkLayout(false);
    }

    if (window.innerWidth >= 470) {
      settogglebgImageLight(bgDayLight);
    }

    if (window.innerWidth <= 470) {
      settogglebgImageLight(bgDayMobileLight);
    }

    if (isDark) {
      settoggleIcon(nightIcon);
    }

    if (!isDark) {
      settoggleIcon(dayIcon);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 600) {
        settoggleLinkLayout(true);
      }

      if (window.innerWidth <= 600) {
        settoggleLinkLayout(false);
      }

      if (window.innerWidth >= 600) {
        settogglebgImageLight(bgDayLight);
        settogglebgImageDark(bgDayDark);
      }

      if (window.innerWidth <= 600) {
        settogglebgImageLight(bgDayMobileLight);
        settogglebgImageDark(bgDayMobileDark);
      }
    });

    const interval = setInterval(() => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (isDark) {
        settoggleIcon(nightIcon);
        settoggleDarkMode(true);
      }

      if (!isDark) {
        settoggleIcon(dayIcon);
        settoggleDarkMode(false);
      }
    });
    return () => clearInterval(interval);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const randomID = Math.random().toString();

  const handleClick = () => {
    settodos((prevtodos) => [
      ...prevtodos,
      { task: task, id: randomID, completed: false },
    ]);
    // setTask("");
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

  console.log(todos);

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
            <div className="list-item flex-row spaceB gap">
              <div className="checkSymbol grid-center">
                <button onClick={handleClick}>
                  <Image src={checkSymbol} alt="" />
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
            <ul className="input-current">
              {todos?.map((item) => {
                if (toggleAll) {
                  return (
                    <li key={item.id} className="list-item flex-row spaceB">
                      <div className="flex-row gap">
                        <div className="checkSymbol grid-center">
                          <button>
                            <Image src={checkSymbol} alt="" />
                          </button>
                        </div>
                        {item.task}
                      </div>
                      <div className="XSymbol grid-center">
                        <button onClick={() => handleDeleteItem(item.id)}>
                          <Image src={Xsymbol} alt="" />
                        </button>
                      </div>
                    </li>
                  );
                }
                if (toggleActive) {
                  if (item.completed === false) {
                    return (
                      <li key={item.id} className="list-item flex-row spaceB">
                        <div className="flex-row gap">
                          <div className="checkSymbol grid-center">
                            <button onClick={() => handleCheckItem(item.id)}>
                              <Image src={checkSymbol} alt="" />
                            </button>
                          </div>
                          {item.task}
                        </div>
                        <div className="XSymbol grid-center">
                          <button onClick={() => handleDeleteItem(item.id)}>
                            <Image src={Xsymbol} alt="" />
                          </button>
                        </div>
                      </li>
                    );
                  }
                }
                if (toggleCompleted) {
                  if (item.completed === true) {
                    return (
                      <li key={item.id} className="list-item flex-row spaceB">
                        <div className="flex-row gap">
                          <div className="checkSymbol grid-center">
                            <button onClick={() => handleCheckItem(item.id)}>
                              <Image src={checkSymbol} alt="" />
                            </button>
                          </div>
                          {item.task}
                        </div>
                        <div className="XSymbol grid-center">
                          <button onClick={() => handleDeleteItem(item.id)}>
                            <Image src={Xsymbol} alt="" />
                          </button>
                        </div>
                      </li>
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
                  <button className="text-link" onClick={showAll}>
                    All
                  </button>
                </div>
                <div>
                  <button className="text-link" onClick={showActive}>
                    Active
                  </button>
                </div>
                <div>
                  <button className="text-link" onClick={showCompleted}>
                    Completed
                  </button>
                </div>

                <div className="clear-btn">
                  <button className="text-link" onClick={handleClearItems}>
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
                    <button className="text-link" onClick={handleClearItems}>
                      Clear completed
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {!toggleLinkLayout ? (
            <div className="links-container flex-row spaceB">
              <button className="text-link" onClick={showAll}>
                All
              </button>
              <button className="text-link" onClick={showActive}>
                Active
              </button>
              <button className="text-link" onClick={showCompleted}>
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
