import ProgressBar from "@badrap/bar-of-progress";
import router from "next/router";
import "../styles/globals.css";

const progress = new ProgressBar({
  size: 2,
  color: "#f0131e",
  className: "bar-of-progress",
  delay: 100,
});

router.events.on("routeChangeStart", progress.start);
router.events.on("routeChangeComplete", progress.finish);
router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
