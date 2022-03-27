import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import PageHead from "../../components/PageHead";
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import ItemDetails from "../../components/ItemDetails";
import Footer from "../../components/Footer";

import axios from "axios";

import { to } from "../../utils";

import styles from "../../styles/Characters.module.css";

export default function Character() {
  const [item, setItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(async () => {
    if (!id) return;

    const getItemURL = `/api/getCharacters/${id}`;
    const [response, error] = await to(axios.get(getItemURL));

    if (error) return;

    const data = response.data;
    setItem(data.results[0]);
  }, [id]);
  return (
    <div>
      <PageHead title={item.name} />

      <TopBar margin={true} />

      <NavBar />

      <main className={styles.main}>
        <div className="mainWrapper">
          <ItemDetails
            title={item.name}
            description={item.description}
            imageSrc={item.thumbnail && `${item.thumbnail.path}/detail.${item.thumbnail.extension}`}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
