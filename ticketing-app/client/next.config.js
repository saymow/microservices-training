module.exports = {
  webpack: (config) => {
    // Instead of watching for file changes, its going to pull in the files once every 300ms
    config.watchOptions.poll = 300;
    return config;
  },
};
