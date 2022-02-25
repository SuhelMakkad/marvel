import TopBar from "../components/TopBar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return Component.name === "Home" || Component.name === "Error404" ? (
    <Component {...pageProps} />
  ) : (
    <>
      <TopBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
