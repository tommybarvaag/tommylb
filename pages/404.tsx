import Heading from "@/components/heading";
import LinkButton from "@/components/linkButton";
import Text from "@/components/text";
import Layout from "@/layouts/layout";

export default function NotFound() {
  return (
    <Layout>
      <div>
        <Heading as="pageHeading">404 – Not Found</Heading>
        <Heading as="h4" className="mb-2">
          It looks like you're lost...
        </Heading>
        <Text>The page you're looking for no longer exists.</Text>
        <div>
          <LinkButton href="/">Return home</LinkButton>
        </div>
      </div>
    </Layout>
  );
}
