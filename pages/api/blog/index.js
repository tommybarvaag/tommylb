import { getAllFilesFrontMatter } from "../../../lib/fileSystem";

export default async (req, res) => {
  const allBlogFiles = await getAllFilesFrontMatter("blog");

  return res.status(200).json(allBlogFiles);
};
