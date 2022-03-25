import { useState, useEffect, useRef } from "react";

import PageHead from "../../components/PageHead";
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import Card from "../../components/Card";
import Footer from "../../components/Footer";

import axios from "axios";

import useElementOnScreen from "../../hooks/useElementOnScreen";

import { to } from "../../utils";

import styles from "../../styles/Characters.module.css";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [containerRef, isBottomVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 1,
  });

  console.log(characters);

  useEffect(async () => {
    const getCharactersURL = `/api/getCharacters?offset=${offset}`;
    const [response, error] = await to(axios.get(getCharactersURL));
    if (error) {
      return;
    }

    const data = response.data;
    console.log(data);
    setOffset((prev) => prev + 20);
    setCount(data.count);
    setCharacters((prev) => [...prev, ...data.results]);
  }, [isBottomVisible]);

  return (
    <div>
      <PageHead title="Characters" />

      <TopBar />

      <NavBar />

      <main className="mainWrapper">
        <div className="cardWrapper">
          {characters && characters.length
            ? characters.map((character) => (
                <Card
                  description={character.series?.items[0]?.name}
                  key={character.id}
                  title={character.name}
                  src={
                    character.thumbnail &&
                    `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`
                  }
                />
              ))
            : "Loading..."}
        </div>
      </main>

      {/* dummy elemt to detect scroll reach bottom */}
      <span ref={containerRef}></span>

      <Footer />
    </div>
  );
}
