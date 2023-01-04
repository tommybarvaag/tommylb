import Heading from "@/components/heading";
import LinkButton from "@/components/linkButton";
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
      <Main>
        <Heading as="pageHeading">404 – Not Found</Heading>
        <Heading as="h4" className="mb-2">
          It looks like you're lost...
        </Heading>
        <Text>The page you're looking for no longer exists.</Text>
        <div>
          <LinkButton href="/">Return home</LinkButton>
        </div>
      </Main>
    </>
  );
}
