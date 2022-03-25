import { useState, useEffect } from "react";

import PageHead from "../../components/PageHead";
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import Card from "../../components/Card";
import Footer from "../../components/Footer";

import axios from "axios";

import { to } from "../../utils";

import styles from "../../styles/Characters.module.css";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(async () => {
    const [response, error] = await to(axios.get("/api/getCharacters"));
    if (error) {
      return;
    }
    const data = response.data;

    setOffset(data.offset);
    setCount(data.count);
    setCharacters(data.results);
  }, []);

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
                  description={character.series.items[0]?.name}
                  key={character.id}
                  title={character.name}
                  src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                />
              ))
            : "Loading..."}
        </div>
      </main>

      <Footer />
    </div>
  );
}
