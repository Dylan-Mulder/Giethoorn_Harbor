export default () => ({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: 'gh_refilling',
    password: 'jw8s0F4',
    database: process.env.POSTGRES_DATABASE
  });