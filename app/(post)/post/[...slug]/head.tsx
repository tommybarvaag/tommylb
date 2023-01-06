import MdxHead from "@/components/mdx/mdx-head";

export default function Head({ params }) {
  return (
    <MdxHead
      params={params}
      og={{
        type: "Post"
      }}
    />
  );
}
