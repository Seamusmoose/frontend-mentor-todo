import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import nightIcon from "../../public/images/icon-moon.svg";
import dayIcon from "../../public/images/icon-sun.svg";
import { useState, useEffect } from "react";

const exampleArr = [
  "Jog around the park",
  "meditation",
  "blahh",
  "blahhhh",
  "blahhhhhhhh",
];

const toDoItems = exampleArr.map((i) => {
  return (
    <ul className="input-current" key={i}>
      <li className="list-item flex-row">{i}</li>
    </ul>
  );
});

const itemCount = exampleArr.length;

export default function Home() {
  const [toggleDarkMode, settoggleDarkMode] = useState(false);
  const [toggleLinkLayout, settoggleLinkLayout] = useState(false);
  const [toggleIcon, settoggleIcon] = useState(dayIcon);

  const icon = dayIcon;

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    window.addEventListener("resize", () => {
      // console.log(window.innerWidth);

      if (window.innerWidth >= 600) {
        settoggleLinkLayout(true);
      }

      if (window.innerWidth <= 600) {
        settoggleLinkLayout(false);
      }
    });

    if (isDark) {
      settoggleDarkMode(true);
      settoggleIcon(nightIcon);
    }

    if (!isDark) {
      settoggleDarkMode(false);
      settoggleIcon(dayIcon);
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

      <div className="container grid-center">
        <div className="card">
          <div className="input-container flex-column">
            <div className="flex-row spaceB">
              <h1>To Do</h1>
              <div className="image-container">
                <Image
                  src={toggleIcon}
                  width={50}
                  height={50}
                  alt=""
                  priority
                />
              </div>
            </div>
            <input
              className="input-new-item"
              type="text"
              placeholder="add new todo"
            />
            {toDoItems}

            {toggleLinkLayout ? (
              <div className="infomation-panel flex-row">
                <div className="item-count">
                  <h2>{itemCount} items left</h2>
                </div>
                <div className="active-buttons flex-row">
                  <Link className="text-link" href={""}>
                    All
                  </Link>
                  <Link className="text-link" href={""}>
                    Active
                  </Link>
                  <Link className="text-link" href={""}>
                    Completed
                  </Link>
                </div>
                <div className="clear-btn">
                  <Link className="text-link" href={""}>
                    Clear completed
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="infomation-panel flex-row">
                  <div className="item-count">
                    <h2>{itemCount} items left</h2>
                  </div>
                  <div className="clear-btn">
                    <Link className="text-link" href={""}>
                      Clear completed
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {!toggleLinkLayout ? (
            <div className="links-container flex-row spaceB">
              <Link className="text-link" href={""}>
                Allllll
              </Link>
              <Link className="text-link" href={""}>
                Active
              </Link>
              <Link className="text-link" href={""}>
                Completed
              </Link>
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
