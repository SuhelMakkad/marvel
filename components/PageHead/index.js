import Head from "next/head";
export default function PageHead({ title }) {
  return (
    <Head>
      <title>Marvel{title ? ` | ${title}` : ""}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
