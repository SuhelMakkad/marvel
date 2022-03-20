import PageHead from "../../components/PageHead";
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import Card from "../../components/Card";
import Footer from "../../components/Footer";

export default function Characters() {
  return (
    <div>
      <PageHead title="Characters" />

      <TopBar />

      <NavBar />

      <main className="mainWrapper">
        <div className="wrapper">{/* <Card /> */}</div>
      </main>

      <Footer />
    </div>
  );
}
