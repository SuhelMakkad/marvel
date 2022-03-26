import PageHead from "../../components/PageHead";
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function Comics() {
  return (
    <div>
      <PageHead title="Comics" />

      <TopBar imageSrc={"/index/thor-bg.png"} />

      <NavBar />

      <Footer />
    </div>
  );
}
