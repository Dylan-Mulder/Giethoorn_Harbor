export default () => ({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: 'gh_publications',
    password: 'pAKsf8273gaS',
    database: process.env.POSTGRES_DB
  });