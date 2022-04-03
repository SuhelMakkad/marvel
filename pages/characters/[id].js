import { useRouter } from "next/router";

import PageHead from "../../components/PageHead";
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import ItemDetails from "../../components/ItemDetails";
import Footer from "../../components/Footer";

import axios from "axios";

import { to } from "../../utils";

import styles from "../../styles/Characters.module.css";
import Logo from "../../components/Logo";

export default function Character({ item }) {
  return item ? (
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
  ) : (
    ""
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
