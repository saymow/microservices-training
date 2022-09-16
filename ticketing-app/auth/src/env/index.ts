const VARIABLES = {
  JWT_KEY: process.env.JWT_KEY,
};
const ENV = VARIABLES as Record<keyof typeof VARIABLES, string>;

function ensureEnvVariables() {
  Object.entries(VARIABLES).forEach(([key, value]) => {
    if (!value) {
      throw new Error(`${key} env variables is not defined.`);
    }
  });
}

export { ENV, ensureEnvVariables };
