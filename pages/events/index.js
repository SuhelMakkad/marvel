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

import styles from "../../styles/Events.module.css";

export default function Events() {
  const [bannerEvents, setBannerEvents] = useState({});
  const [events, setEvents] = useState([]);
  const [offset, setOffset] = useState(0);
  const [showMoreEvents, setShowMoreEvents] = useState(true);
  const [containerRef, isBottomVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 1,
  });

  const loadingCardCount = 20;
  const bannerEventsId = [280, 308, 60, 276, 327, 321, 212, 315, 251, 240];

  const getPlaceHoldersCards = () => {
    const placeHolderCards = [];

    for (let i = 0; i < loadingCardCount; i++) {
      placeHolderCards.push(<LoadingCard key={i} />);
    }

    return placeHolderCards;
  };

  const load20Events = async () => {
    const getEventsURL = `/api/getEvents?offset=${offset}`;
    const [response, error] = await to(axios.get(getEventsURL));

    if (error) {
      return;
    }

    const data = response.data;

    if (offset === response.data.total) {
      setShowMoreEvents(false);
      return;
    }

    setOffset((prev) => prev + data.count);
    setEvents((prev) => filterDuplicates([...prev, ...data.results], "id"));
  };

  const getFormatedDate = (date) => {
    if (!date) return "";

    const formatedDate = new Date(date);
    const monthName = getMonthName(formatedDate);

    /* Invalid Date */
    if (!monthName) return "";

    return `${monthName} ${formatedDate.getFullYear()}`;
  };

  const getDateRange = (startDate, endDate) => {
    const formatedStartDate = getFormatedDate(startDate);
    const formatedEndDate = getFormatedDate(endDate);

    if (!formatedStartDate || !formatedEndDate) return;
    return `${formatedStartDate} - ${formatedEndDate}`;
  };

  useEffect(async () => {
    const randomEventsId = bannerEventsId[Math.floor(Math.random() * bannerEventsId.length)];

    const getEventsURL = `/api/getEvents/${randomEventsId}`;
    const [response, error] = await to(axios.get(getEventsURL));
    if (error) {
      return;
    }

    const bannerEvents = response.data.results[0];

    setBannerEvents(bannerEvents);
    load20Events();
  }, []);

  useEffect(() => {
    if (!isBottomVisible || !events.length) return;
    load20Events();
  }, [isBottomVisible]);

  return (
    <div>
      <PageHead title="Events" />

      <TopBar />

      <BannerImage
        title={bannerEvents.title}
        description={bannerEvents.description}
        href={`/events/${bannerEvents.id}`}
        imageSrc={
          bannerEvents.thumbnail &&
          `${bannerEvents.thumbnail.path}.${bannerEvents.thumbnail.extension}`
        }
      />

      <NavBar />

      <main className="mainWrapper">
        <div className="cardWrapper">
          {events?.length
            ? events.map((event) => (
                <Card
                  key={event.id}
                  title={event.title}
                  description={getDateRange(event.start, event.end)}
                  href={`/events/${event.id}`}
                  showIfImageAvaialbe={true}
                  src={
                    event.thumbnail &&
                    `${event.thumbnail.path}/portrait_uncanny.${event.thumbnail.extension}`
                  }
                />
              ))
            : getPlaceHoldersCards()}
        </div>
      </main>

      {showMoreEvents ? (
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
