// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const environment = process.env.GRIDSOME_ENV;

module.exports = {
  siteName: "Mi web",
  icon: "./src/favicon.png",
  siteDescription: "Omar Pecos - Desarrollador Full Stack",
  plugins: [],
  pathPrefix: environment === "production" ? "/web" : "",
};
