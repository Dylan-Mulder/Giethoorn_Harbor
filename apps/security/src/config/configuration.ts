export default () => ({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: 'gh_security',
    password: 'NUF229kk8',
    database: process.env.POSTGRES_DB
  });