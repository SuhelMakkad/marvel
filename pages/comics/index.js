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

import { to, getMonthName, filterDuplicates } from "../../utils";

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
  const bannerComicsId = [
    65149, 49008, 100675, 61791, 66060, 62424, 61465, 20945, 30941, 61788, 76696, 56759, 98377,
    100621,
  ];

  const getPlaceHoldersCards = () => {
    const placeHolderCards = [];

    for (let i = 0; i < loadingCardCount; i++) {
      placeHolderCards.push(<LoadingCard key={i} />);
    }

    return placeHolderCards;
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

    setOffset((prev) => prev + data.count);
    setComics((prev) => filterDuplicates([...prev, ...data.results], "id"));
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
    if (!isBottomVisible || !comics.length) return;
    load20Comics();
  }, [isBottomVisible]);

  return (
    <div>
      <PageHead title="Comics" />

      <TopBar />

      <BannerImage
        title={bannerComic.title}
        description={bannerComic.description}
        href={`/comics/${bannerComic.id}`}
        imageSrc={
          bannerComic.thumbnail &&
          `${bannerComic.thumbnail.path}/detail.${bannerComic.thumbnail.extension}`
        }
      />

      <NavBar />

      <main className="mainWrapper">
        <div className="cardWrapper">
          {comics?.length
            ? comics.map((comic) => (
                <Card
                  key={comic.id}
                  title={comic.title}
                  description={getFocDate(comic.dates)}
                  href={`/comics/${comic.id}`}
                  showIfImageAvaialbe={true}
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
