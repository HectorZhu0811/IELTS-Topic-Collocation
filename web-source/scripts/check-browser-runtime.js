const {
  bundledNodeModules,
  findExplicitChromeExecutable,
  loadPlaywright,
} = require("./browser-runtime");

const { chromium } = loadPlaywright();
const explicitChromeExecutablePath = findExplicitChromeExecutable();

console.log(
  JSON.stringify(
    {
      bundledNodeModules,
      browserRuntime: explicitChromeExecutablePath ? "explicit-chrome" : "playwright-default",
      explicitChromeExecutablePath,
      playwrightChromiumLoaded: Boolean(chromium),
    },
    null,
    2
  )
);
