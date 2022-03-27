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

import { to, getMonthName } from "../../utils";

import styles from "../../styles/Comics.module.css";

export default function Comics() {
  const [bannerComic, setBannerComic] = useState({});
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(0);
  const [showMoreComics, setShowMoreComics] = useState(true);
  const [containerRef, isBottomVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 1,
  });

  const loadingCardCount = 20;
  const bannerComicsId = [82967];

  const getPlaceHoldersCards = () => {
    const placeHolderCards = [];

    for (let i = 0; i < loadingCardCount; i++) {
      placeHolderCards.push(<LoadingCard key={i} />);
    }

    return placeHolderCards;
  };

  const load20Comics = async () => {
    const getComicsURL = `/api/getComics?offset=${offset}`;
    const [response, error] = await to(axios.get(getComicsURL));

    if (error) {
      return;
    }

    const data = response.data;

    if (offset === response.data.total) {
      setShowMoreComics(false);
      return;
    }

    setOffset((prev) => prev + 20);
    setComics((prev) => [...prev, ...data.results]);
  };

  const getFocDate = (dates) => {
    if (!dates) return "";

    const focDate = dates.filter((date) => date.type === "focDate")[0];

    if (!focDate) return "";

    const date = new Date(focDate.date);
    const monthName = getMonthName(date);

    /* Invalid Date */
    if (!monthName) return "";

    return `${monthName} ${date.getDate()}, ${date.getFullYear()}`;
  };

  useEffect(async () => {
    const randomComicId = bannerComicsId[Math.floor(Math.random() * bannerComicsId.length)];

    const getComicURL = `/api/getComics/${randomComicId}`;
    const [response, error] = await to(axios.get(getComicURL));
    if (error) {
      return;
    }

    const bannerComic = response.data.results[0];

    setBannerComic(bannerComic);
    load20Comics();
  }, []);

  useEffect(() => {
    if (!isBottomVisible) return;
    load20Comics();
  }, [isBottomVisible]);
  console.log(comics);

  return (
    <div>
      <PageHead title="Comics" />

      <TopBar />

      <BannerImage
        title={bannerComic.title}
        description={bannerComic.description}
        imageSrc={
          bannerComic.thumbnail &&
          `${bannerComic.thumbnail.path}/detail.${bannerComic.thumbnail.extension}`
        }
      />

      <NavBar />

      <main className="mainWrapper">
        <div className="cardWrapper">
          {comics && comics.length
            ? comics.map((comic) => (
                <Card
                  key={comic.id}
                  title={comic.title}
                  description={getFocDate(comic.dates)}
                  href={`/comics/${comic.id}`}
                  src={
                    comic.thumbnail &&
                    `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`
                  }
                />
              ))
            : getPlaceHoldersCards()}
        </div>
      </main>

      {showMoreComics ? (
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
