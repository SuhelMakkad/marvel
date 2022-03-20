import PageHead from "../../components/PageHead";
import Card from "../../components/Card";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function Characters() {
  return (
    <div>
      <PageHead title="Characters" />

      <NavBar />

      <main className="mainWrapper">
        <div className="wrapper">{/* <Card /> */}</div>
      </main>

      <Footer />
    </div>
  );
}
