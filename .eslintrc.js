module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  // Because the react-app-plugin already specifies the @typescript-eslint plugin,
  // we have to remove its use here. Otherwise, it will conflict with the child
  // configurations that use the react-app-plugin. We have to specify the
  // @typescript-eslint plugin and extend its configuration in each child, and
  // then inherit this files so we can at least share the rules.
  // plugins: ["@typescript-eslint"],
  extends: [
    // "eslint:recommended",
    // "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
  