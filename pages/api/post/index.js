import { getAllFilesFrontMatter } from "../../../lib/fileSystem";

export default async (req, res) => {
  const allPostFiles = await getAllFilesFrontMatter("post");

  return res.status(200).json(allPostFiles);
};
