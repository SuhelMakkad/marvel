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

import styles from "../../styles/Series.module.css";

export default function Series() {
  const [bannerSeries, setBannerSeries] = useState({});
  const [series, setSeries] = useState([]);
  const [offset, setOffset] = useState(0);
  const [showMoreSeries, setShowMoreSeries] = useState(true);
  const [containerRef, isBottomVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 1,
  });

  const loadingCardCount = 20;
  const bannerSeriesId = [
    29695, 27932, 32777, 30534, 417, 28177, 29493, 13830, 31982, 16449, 14246, 31903,
  ];

  const getPlaceHoldersCards = () => {
    const placeHolderCards = [];

    for (let i = 0; i < loadingCardCount; i++) {
      placeHolderCards.push(<LoadingCard key={i} />);
    }

    return placeHolderCards;
  };

  const load20Series = async () => {
    const getSeriesURL = `/api/getSeries?offset=${offset}`;
    const [response, error] = await to(axios.get(getSeriesURL));

    if (error) {
      return;
    }

    const data = response.data;

    if (offset === response.data.total) {
      setShowMoreSeries(false);
      return;
    }

    setOffset((prev) => prev + data.count);
    setSeries((prev) => filterDuplicates([...prev, ...data.results], "id"));
  };

  useEffect(async () => {
    const randomSeriesId = bannerSeriesId[Math.floor(Math.random() * bannerSeriesId.length)];

    const getSeriesURL = `/api/getSeries/${randomSeriesId}`;
    const [response, error] = await to(axios.get(getSeriesURL));
    if (error) {
      return;
    }

    const bannerSeries = response.data.results[0];

    setBannerSeries(bannerSeries);
    load20Series();
  }, []);

  useEffect(() => {
    if (!isBottomVisible || !series.length) return;
    load20Series();
  }, [isBottomVisible]);

  return (
    <div>
      <PageHead title="Series" />

      <TopBar />

      <BannerImage
        title={bannerSeries.title}
        description={bannerSeries.description}
        href={`/series/${bannerSeries.id}`}
        imageSrc={
          bannerSeries.thumbnail &&
          `${bannerSeries.thumbnail.path}/detail.${bannerSeries.thumbnail.extension}`
        }
      />

      <NavBar />

      <main className="mainWrapper">
        <div className="cardWrapper">
          {series?.length
            ? series.map((s) => (
                <Card
                  key={s.id}
                  title={s.title}
                  description={`${s.startYear} -  ${s.endYear}`}
                  href={`/series/${s.id}`}
                  showIfImageAvaialbe={true}
                  src={
                    s.thumbnail && `${s.thumbnail.path}/portrait_uncanny.${s.thumbnail.extension}`
                  }
                />
              ))
            : getPlaceHoldersCards()}
        </div>
      </main>

      {showMoreSeries ? (
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
