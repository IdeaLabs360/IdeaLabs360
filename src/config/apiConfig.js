// configurations shared between most or all environments can be stored in commonConfig
const commonConfig = {
  api: {
    baseUrl: "http://localhost:8080/idealabs360",
  },
};

const envConfigs = {
  dev: {
    api: {
      baseUrl: "http://localhost:8080/idealabs360",
    },
  },
  stg: {},
  prod: {
    api: {
      baseUrl: "https://api.idealabs360.com/idealabs360",
    },
  },
};

const appEnv = process.env.REACT_APP_ENV;
const config = envConfigs[appEnv];

// commonConfig and the config for the matching REACT_APP_ENV are combined.
// Values in the environment-specific config will overwrite commonConfig keys
// if they share the same name.
const apiConfig = { ...commonConfig, ...config };

export default apiConfig;
