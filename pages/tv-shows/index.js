import PageHead from "../../components/PageHead";
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function TvShows() {
  return (
    <div>
      <PageHead title="Tv Shows" />

      <TopBar imageSrc={"/index/thor-bg.png"} />

      <NavBar />

      <Footer />
    </div>
  );
}
