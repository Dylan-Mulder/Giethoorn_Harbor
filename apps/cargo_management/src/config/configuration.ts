export default () => ({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: 'gh_cargo_management',
    password: 'kNY2772i9d',
    database: process.env.POSTGRES_DATABASE
  });