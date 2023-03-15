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
import { useState, useEffect } from "react";

const exampleArr = [
  "Jog around the park",
  "meditation",
  "blahh",
  "blahhhh",
  "blahhhhhhhh",
];

const itemCount = exampleArr.length;

export default function Home() {
  const [toggleDarkMode, settoggleDarkMode] = useState(false);
  const [toggleLinkLayout, settoggleLinkLayout] = useState(false);
  const [toggleIcon, settoggleIcon] = useState(dayIcon);
  const [togglebgImageLight, settogglebgImageLight] = useState(bgDayLight);
  const [togglebgImageDark, settogglebgImageDark] = useState(bgDayDark);

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
          <Image className="image" src={togglebgImageDark} alt="" />
        ) : (
          <Image className="image" src={togglebgImageLight} alt="" />
        )}
      </div>

      <div className="eg"></div>

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
            <ul className="input-current">
              {exampleArr.map((item) => {
                return (
                  <li key={item} className="list-item flex-row spaceB">
                    <div className="flex-row gap">
                      <div className="checkSymbol grid-center">
                        <Image src={checkSymbol} alt="" />
                      </div>
                      {item}
                    </div>
                    <div className="XSymbol grid-center">
                      <Image src={Xsymbol} alt="" />
                    </div>
                  </li>
                );
              })}
            </ul>

            {toggleLinkLayout ? (
              <div className="infomation-panel flex-row gap">
                <div className="item-count">
                  <h2>{itemCount} items left</h2>
                </div>

                <div>
                  <Link className="text-link" href={""}>
                    All
                  </Link>
                </div>
                <div>
                  <Link className="text-link" href={""}>
                    Active
                  </Link>
                </div>
                <div>
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
                <div className="infomation-panel flex-row spaceB">
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
                All
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
