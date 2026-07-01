import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import tailwindcss from "eslint-plugin-tailwindcss";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...tailwindcss.configs["flat/recommended"],
  {
    rules: {
      "tailwindcss/no-custom-classname": "off"
    },
    settings: {
      tailwindcss: {
        callees: ["cn"]
      }
    }
  },
  {
    ignores: [".next/**", "node_modules/**", ".ref/**"]
  }
];

export default eslintConfig;
