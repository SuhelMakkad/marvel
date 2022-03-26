import { useState, useEffect } from "react";

import PageHead from "../../components/PageHead";
import TopBar from "../../components/TopBar";
import BannerImage from "../../components/BannerImage";
import NavBar from "../../components/NavBar";
import Card, { LoadingCard } from "../../components/Card";
import CardLoadingInditactor from "../../components/CardLoadingInditactor";
import NoMoreToShow from "../../components/NoMoreToShow";
import Footer from "../../components/Footer";

import axios from "axios";

import useElementOnScreen from "../../hooks/useElementOnScreen";

import { to, data } from "../../utils";

import styles from "../../styles/Characters.module.css";

export default function Characters() {
  const [bannerHero, setBannerHero] = useState({});
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [showMoreCharacters, setShowMoreCharacters] = useState(true);
  const [containerRef, isBottomVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 1,
  });

  const loadingCardCount = 20;
  const bannerHerosId = [
    1009683, 1009368, 1009220, 1009664, 1009610, 1009697, 1009351, 1017108, 1010733,
  ];

  const getPlaceHoldersCards = () => {
    const placeHolderCards = [];

    for (let i = 0; i < loadingCardCount; i++) {
      placeHolderCards.push(<LoadingCard key={i} />);
    }

    return placeHolderCards;
  };

  const load20Characters = async () => {
    const getCharactersURL = `/api/getCharacters?offset=${offset}`;
    const [response, error] = await to(axios.get(getCharactersURL));

    if (error) {
      return;
    }

    const data = response.data;

    if (offset === response.data.total) {
      setShowMoreCharacters(false);
      return;
    }

    setOffset((prev) => prev + 20);
    setCharacters((prev) => [...prev, ...data.results]);

    // console.log(data);
    // setOffset(20);
    // setCharacters(data.results);
  };

  useEffect(async () => {
    const randomHeroId = bannerHerosId[Math.floor(Math.random() * bannerHerosId.length)];

    const getCharacterURL = `/api/getCharacter?id=${randomHeroId}`;
    const [response, error] = await to(axios.get(getCharacterURL));
    if (error) {
      return;
    }

    const bannerHero = response.data.results[0];

    setBannerHero(bannerHero);
    load20Characters();
  }, []);

  useEffect(() => {
    if (!isBottomVisible) return;
    load20Characters();
  }, [isBottomVisible]);

  return (
    <div>
      <PageHead title="Characters" />

      <TopBar />

      <BannerImage
        title={bannerHero.name}
        description={bannerHero.description}
        imageSrc={
          bannerHero.thumbnail &&
          `${bannerHero.thumbnail.path}/detail.${bannerHero.thumbnail.extension}`
        }
      />

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
            : getPlaceHoldersCards()}
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
