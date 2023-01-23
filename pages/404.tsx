import Heading from "@/components/heading";
import LinkButton from "@/components/link-button";
import Main from "@/components/main";
import Text from "@/components/text";
import Head from "next/head";
import "styles/global.css";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Tommy Lunde Barvåg</title>
      </Head>
      <Main className="pt-14 sm:pt-32">
        <Heading as="pageHeading">404 – Not Found</Heading>
        <Heading as="h3" className="mb-2">
          It looks like you&apos;re lost...
        </Heading>
        <Text>The page you&apos;re looking for no longer exists.</Text>
        <div>
          <LinkButton href="/">Return home</LinkButton>
        </div>
      </Main>
    </>
  );
}
