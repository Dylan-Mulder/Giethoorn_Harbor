export default () => ({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: 'gh_ecosystem',
    password: 'URY382992ef',
    database: process.env.POSTGRES_DATABASE
  });