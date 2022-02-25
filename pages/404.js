import Head from "next/head";
import Error from "../components/Errors";

export default function Error404() {
  return (
    <>
      <Head>
        <title>Marvel | 404</title>
        <meta name="404" content="Page Not Found" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Error title="404 | Page Not Found" />
      </div>
    </>
  );
}
