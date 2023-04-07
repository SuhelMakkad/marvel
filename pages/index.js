import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import Menu from "../components/Menu";
import PageHead from "../components/PageHead";

import styles from "../styles/Home.module.css";

export default function Home() {
  const heros = [
    {
      name: "Doctor Strange",
      class: "drStrange",
      path: "dr-strange",
      height: 1073,
      width: 803,
      description:
        "The son of Odin uses his mighty abilities as the God of Thunder to protect his home Asgard and planet Earth alike.",
    },
    {
      name: "Thor",
      class: "thor",
      path: "thor",
      height: 1023,
      width: 714,
      description:
        "Recipient of the Super-Soldier serum, World War II hero Steve Rogers fights for American ideals as one of the world’s mightiest heroes and the leader of the Avengers.",
    },
    {
      name: "Captain America",
      class: "captainAmerica",
      path: "captain-america",
      height: 1014,
      width: 628,
      description:
        "Formerly a renowned surgeon, Doctor Stephen Strange now serves as the Sorcerer Supreme—Earth’s foremost protector against magical and mystical threats.",
    },
    {
      name: "Iron Man",
      class: "ironMan",
      path: "iron-man",
      height: 1044,
      width: 1024,
      description:
        "Genius. Billionaire. Philanthropist. Tony Stark's confidence is only matched by his high-flying abilities as the hero called Iron Man.",
    },
  ];

  const heroImg = useRef();
  const marvelLogo = useRef();
  const [currentHero, setCurrentHero] = useState(0);

  const changeHero = () => {
    marvelLogo.current.style.setProperty("--clip-path", "circle(150% at 6rem 4rem)");
    marvelLogo.current.style.pointerEvents = "none";
    setTimeout(() => {
      setCurrentHero((prev) => {
        return (prev + 1) % heros.length;
      });

      marvelLogo.current.style.setProperty("--clip-path", "circle(0% at 6rem 4rem)");
      marvelLogo.current.style.pointerEvents = "";
    }, 1000);
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!heroImg.current) return document.removeEventListener("mousemove", onMouseMove);
      const translateX = Math.min(e.clientX / 150, 3);
      const translateY = Math.min(e.clientY / 150, 5);

      heroImg.current.style.transform = `translate(${-translateX}%, ${-translateY - 50}%)`;
    };

    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div className={styles.wrapper}>
      <PageHead title={heros[currentHero].name} />

      <div className={styles.bgHome + " " + styles[heros[currentHero].class + "Bg"]}></div>

      <main className={styles.main}>
        <nav className={styles.navbar}>
          <button ref={marvelLogo} onClick={changeHero} className={styles.marvelLogo}>
            MARVEL
          </button>
          <Menu />
        </nav>

        <div className={styles.text}>
          <h1 className={styles.title}>{heros[currentHero].name}</h1>
          <p className={styles.description}>{heros[currentHero].description}</p>
        </div>

        <div ref={heroImg} className={styles.heroImgWrapper}>
          <Image
            className={styles.heroImg + " " + styles[heros[currentHero].class]}
            src={`/index/${heros[currentHero].path}.png`}
            alt={heros[currentHero].name}
            height={heros[currentHero].height}
            width={heros[currentHero].width}
          />
        </div>

        <Link href="/characters" className={styles.exploreBtn}>
          explore
        </Link>
      </main>
    </div>
  );
}
