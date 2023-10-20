const path = require("path");
const glob = require("glob");
const projectRoot = path.resolve(__dirname, "../");
const ignoreTests = process.env.IGNORE_TESTS === "true";
const isChromatic = !ignoreTests;
const getStories = () =>
  glob.sync(`${projectRoot}/src/**/*.@(mdx)`, {
    ...(ignoreTests && {
      ignore: `${projectRoot}/src/**/*.stories.@(js|mdx|tsx)`,
    }),
  });
const getCSFStories = () =>
  glob.sync(`${projectRoot}/src/**/*.stories.@(jsx|tsx)`, {
    ...(ignoreTests && {
      ignore: `${projectRoot}/src/**/*-test.stories.@(js|mdx|tsx)`,
    }),
  });
module.exports = {
  stories: [
    "./welcome-page/welcome.stories.js",
    "../docs/*.mdx",
    "../docs/*.stories.tsx",
    ...getStories(),
    ...getCSFStories(),
  ],
  core: {
    disableTelemetry: true,
  },
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/addon-viewport",
    "@storybook/addon-a11y",
    "@storybook/addon-google-analytics",
    "@storybook/addon-links",
    "@storybook/addon-toolbars",
    "@storybook/addon-mdx-gfm",
  ],
  staticDirs: ["../.assets", "../logo"],
  webpackFinal: async (config, { configType }) => {
    config.resolve = {
      alias: {
        helpers: path.resolve(__dirname, "__helpers__/"),
      },
      extensions: [".js", ".tsx", ".ts"],
    };

    // Find the rule that matches the condition
    const fontRule = config.module.rules.find((rule) =>
      rule.test.toString().includes("woff2")
    );
    if (fontRule && Array.isArray(fontRule.use)) {
      // Update the name property for the appropriate loader in the use array
      fontRule.use.forEach((loader) => {
        if (loader.loader && loader.loader.includes("file-loader")) {
          loader.options.name = "static/media/[name].[ext]";
        }
      });
    }

    return config;
  },
  ...(isChromatic && {
    previewHead: (head) => `
      ${head}
      <meta name="robots" content="noindex">
  `,
    managerHead: (head) => `
      ${head}
      <meta name="robots" content="noindex">
  `,
  }),
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
