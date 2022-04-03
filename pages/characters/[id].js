import { useRouter } from "next/router";

import PageHead from "../../components/PageHead";
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import ItemDetails from "../../components/ItemDetails";
import Footer from "../../components/Footer";

import axios from "axios";

import { to } from "../../utils";

import styles from "../../styles/Characters.module.css";
import ListGroup from "../../components/ListGroup";

export default function Character({ item }) {
  if (!item) return "";

  const { name, description, thumbnail, comics, events, series, characters } = item;
  const resources = Object.entries({ comics, events, series, characters });

  return (
    <div>
      <PageHead title={item.name} />

      <TopBar margin={true} />

      <NavBar />

      <main className={styles.main}>
        <div className="mainWrapper">
          <ItemDetails
            title={name}
            description={description}
            imageSrc={thumbnail && `${thumbnail.path}/detail.${thumbnail.extension}`}
          />

          <ListGroup items={resources} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const BASE_URL = process.env.BASE_URL;

  const [response, error] = await to(axios.get(`${BASE_URL}/api/getCharacters/${id}`));
  const item = await response.data.results[0];

  return {
    props: { item },
  };
}

export async function getStaticPaths() {
  return {
    paths: ["/characters/1011334"],
    fallback: true,
  };
}
