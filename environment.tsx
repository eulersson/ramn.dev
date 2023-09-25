type Environment = {
  debug: boolean;
  disableCover: boolean;
  disableGraphics: boolean;
  disableHero: boolean;
  printComponentRendering: boolean;
};

const environments: { [key: string]: Environment } = {
  production: {
    debug: false,
    disableCover: false,
    disableGraphics: false,
    disableHero: false,
    printComponentRendering: false,
  },
  development: {
    debug: true,
    disableCover: true,
    disableGraphics: true,
    disableHero: false,
    printComponentRendering: true,
  },
};

// TODO: Make this dynamic with an environment variable?
export default environments.production;
