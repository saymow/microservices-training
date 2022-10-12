const VARIABLES = {
  JWT_KEY: process.env.JWT_KEY,
  MONGO_URI: process.env.MONGO_URI,
  NATS_CLIENT_ID: process.env.NATS_CLIENT_ID,
  NATS_URL: process.env.NATS_URL,
  NATS_CLUSTER_ID: process.env.NATS_CLUSTER_ID,
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
