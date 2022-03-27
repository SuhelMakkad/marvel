import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import PageHead from "../../components/PageHead";
import TopBar from "../../components/TopBar";
import BannerImage from "../../components/BannerImage";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

import axios from "axios";

import useElementOnScreen from "../../hooks/useElementOnScreen";

import { to } from "../../utils";

import styles from "../../styles/Characters.module.css";

export default function Character() {
  const [character, setCharacter] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(async () => {
    if (!id) return;

    const getCharacterURL = `/api/getCharacter?id=${id}`;
    const [response, error] = await to(axios.get(getCharacterURL));

    if (error) {
      return;
    }

    const data = response.data;

    setCharacter(data.results[0]);
  }, [id]);
  return (
    <div>
      <PageHead title={character.name} />

      <TopBar />

      <BannerImage
        imageSrc={
          character.thumbnail &&
          `${character.thumbnail.path}/detail.${character.thumbnail.extension}`
        }
      />

      <NavBar />

      <Footer />
    </div>
  );
}
