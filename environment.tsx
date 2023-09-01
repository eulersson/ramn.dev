type Environment = {
  disableCover: boolean;
  disableGraphics: boolean;
  disableHero: boolean;
  printComponentRendering: boolean;
};

const environments: { [key: string]: Environment } = {
  production: {
    disableCover: false,
    disableGraphics: false,
    disableHero: false,
    printComponentRendering: false
  },
  development: {
    disableCover: true,
    disableGraphics: true,
    disableHero: true,
    printComponentRendering: true
  },
};

// TODO: Make this dynamic with an environment variable?
export default environments.production;
