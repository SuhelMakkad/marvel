import Head from "next/head";
import Card from "../../components/Card";
import NavBar from "../../components/NavBar";

export default function Characters() {
  return (
    <div>
      <NavBar pageName="characters" />
      <div className="mainWrapper">
        <div className="wrapper">
          {/* <Card /> */}
        </div>
      </div>
    </div>
  );
}
