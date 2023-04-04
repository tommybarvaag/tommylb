import { defineDocumentType, makeSource } from "contentlayer/source-files";
import fs from "fs";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

function rehypeComponent() {
  return async tree => {
    visit(tree, node => {
      const { value: src } = getNodeAttributeByName(node, "src") || {};

      if (node.name === "ComponentExample") {
        const source = getComponentSourceFileContent(node);
        if (!source) {
          return;
        }

        // Replace the Example component with a pre element.
        node.children?.push(
          u("element", {
            tagName: "pre",
            properties: {
              __src__: src
            },
            children: [
              u("element", {
                tagName: "code",
                properties: {
                  className: ["language-tsx"]
                },
                children: [
                  {
                    type: "text",
                    value: source
                  }
                ]
              })
            ]
          })
        );

        const extractClassname = getNodeAttributeByName(node, "extractClassname");
        if (
          extractClassname &&
          typeof extractClassname.value !== "undefined" &&
          extractClassname.value !== "false"
        ) {
          // Extract className from string
          // TODO: Use @swc/core and a visitor to extract this.
          // For now, a simple regex should do.
          const values = source.match(/className="(.*)"/);
          const className = values ? values[1] : "";

          // Add the className as a jsx prop so we can pass it to the copy button.
          node.attributes?.push({
            name: "extractedClassNames",
            type: "mdxJsxAttribute",
            value: className
          });

          // Add a pre element with the className only.
          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {},
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"]
                  },
                  children: [
                    {
                      type: "text",
                      value: className
                    }
                  ]
                })
              ]
            })
          );
        }
      }

      if (node.name === "ComponentSource") {
        const source = getComponentSourceFileContent(node);
        if (!source) {
          return;
        }

        // Replace the Source component with a pre element.
        node.children?.push(
          u("element", {
            tagName: "pre",
            properties: {
              __src__: src
            },
            children: [
              u("element", {
                tagName: "code",
                properties: {
                  className: ["language-tsx"]
                },
                children: [
                  {
                    type: "text",
                    value: source
                  }
                ]
              })
            ]
          })
        );
      }
    });
  };
}

function getNodeAttributeByName(node, name) {
  return node.attributes?.find(attribute => attribute.name === name);
}

function getComponentSourceFileContent(node) {
  const src = getNodeAttributeByName(node, "src")?.value;

  if (!src) {
    return null;
  }

  // Read the source file.
  const filePath = path.join(process.cwd(), src);
  const source = fs.readFileSync(filePath, "utf8");

  return source;
}

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: doc => `/${doc._raw.flattenedPath}`
  },
  tweetIds: {
    type: "array",
    resolve: doc => {
      const tweetMatches = doc.body.raw.match(/<Tweet\sid="[0-9]+"\s\/>/g);
      return tweetMatches?.map(tweet => tweet.match(/[0-9]+/g)[0]) || [];
    }
  },
  slugAsParams: {
    type: "string",
    resolve: doc => doc._raw.flattenedPath.split("/").slice(1).join("/")
  }
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `post/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string"
    },
    shortDescription: {
      type: "string"
    },
    date: {
      type: "date",
      required: true
    },
    published: {
      type: "boolean",
      default: true
    },
    image: {
      type: "string",
      required: false
    },
    authors: {
      // Reference types are not embedded.
      // Until this is fixed, we can use a simple list.
      // type: "reference",
      // of: Author,
      type: "list",
      of: { type: "string" },
      required: true
    }
  },
  computedFields
}));

export const Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: `author/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string"
    },
    avatar: {
      type: "string",
      required: true
    },
    twitter: {
      type: "string",
      required: true
    }
  },
  computedFields
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Author],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeComponent,
      [
        rehypePrettyCode,
        {
          theme: "css-variables",
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          }
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["auto-link-heading "]
          }
        }
      ]
    ]
  }
});
