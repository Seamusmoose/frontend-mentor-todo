import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import nightIcon from "../../public/images/icon-moon.svg";
import dayIcon from "../../public/images/icon-sun.svg";
import { useState, useEffect } from "react";

export default function Home() {
  const [toggleDarkMode, settoggleDarkMode] = useState(false);

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    console.log(isDark);

    if (isDark) {
      settoggleDarkMode(true);
    }
  }, []);
  return (
    <>
      <Head>
        <title>Front-end Mentor To Do List</title>
        <meta name="description" content="Front-end Mentor To Do List" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className="input-container">
          <h1>To Do</h1>
          <div className="image-container">
            <Image
              src={toggleDarkMode ? nightIcon : dayIcon}
              width={200}
              height={200}
              alt=""
            />
          </div>
          <input
            className="input-new-item"
            type="text"
            placeholder="add new todo"
          />
          <ul className="input-current">
            <li>
              <button>x</button>
              <p>submitted item</p>
            </li>
          </ul>
        </div>
        <div className="infomation-panel">
          <h2>... items left</h2>
          <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
          </div>
          <button>Clear completed</button>
        </div>
        <h3>drag and drop to re-order list</h3>
      </div>
    </>
  );
}
