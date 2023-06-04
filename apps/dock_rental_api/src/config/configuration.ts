export default () => ({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: 'gh_dock_rental',
    password: 'nWiuybw4o2o',
    database: process.env.POSTGRES_DATABASE
  });