import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // setState in mount effects is valid for reading browser APIs (localStorage, matchMedia)
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default eslintConfig;
