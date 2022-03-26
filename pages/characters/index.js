import { useState, useEffect } from "react";

import PageHead from "../../components/PageHead";
import TopBar from "../../components/TopBar";
import BannerImage from "../../components/BannerImage";
import NavBar from "../../components/NavBar";
import Card from "../../components/Card";
import CardLoadingInditactor from "../../components/CardLoadingInditactor";
import NoMoreToShow from "../../components/NoMoreToShow";
import Footer from "../../components/Footer";

import axios from "axios";

import useElementOnScreen from "../../hooks/useElementOnScreen";

import { to, data } from "../../utils";

import styles from "../../styles/Characters.module.css";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [showMoreCharacters, setShowMoreCharacters] = useState(true);
  const [containerRef, isBottomVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 1,
  });

  useEffect(async () => {
    if (!isBottomVisible) return;

    const getCharactersURL = `/api/getCharacters?offset=${offset}`;
    const [response, error] = await to(axios.get(getCharactersURL));
    if (error) {
      return;
    }

    const data = response.data;

    console.log(data);
    if (offset === response.data.total) {
      setShowMoreCharacters(false);
      return;
    }
    setOffset((prev) => prev + 20);
    setCharacters((prev) => [...prev, ...data.results]);

    // console.log(data);
    // setOffset(20);
    // setCharacters(data.results);
  }, [isBottomVisible]);

  return (
    <div>
      <PageHead title="Characters" />

      <TopBar />

      <BannerImage imageSrc={"/index/thor-bg.png"} />

      <NavBar />

      <main className="mainWrapper">
        <div className="cardWrapper">
          {characters && characters.length
            ? characters.map((character) => (
                <Card
                  key={character.id}
                  title={character.name}
                  description={character.series?.items[0]?.name}
                  href={`/characters/${character.id}`}
                  src={
                    character.thumbnail &&
                    `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`
                  }
                />
              ))
            : "Loading..."}
        </div>
      </main>

      {showMoreCharacters ? (
        <div ref={containerRef}>
          <CardLoadingInditactor />
        </div>
      ) : (
        <NoMoreToShow />
      )}

      <Footer />
    </div>
  );
}
