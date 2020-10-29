const readingTime = require("reading-time");
const withMdxEnhanced = require("next-mdx-enhanced");

module.exports = withMdxEnhanced({
  layoutPath: "./src/layouts",
  defaultLayout: true,
  fileExtensions: ["mdx"],
  usesSrc: true,
  remarkPlugins: [
    require("remark-autolink-headings"),
    require("remark-slug"),
    require("remark-code-titles"),
    require("remark-capitalize")
  ],
  extendFrontMatter: {
    process: mdxContent => ({
      wordCount: mdxContent.split(/\s+/gu).length,
      readingTime: readingTime(mdxContent)
    })
  }
})({
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    iconSizes: [],
    domains: [],
    path: "/_next/image",
    loader: "default"
  }
});
