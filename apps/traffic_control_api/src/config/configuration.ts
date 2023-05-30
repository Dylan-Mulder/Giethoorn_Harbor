export default () => ({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: 'gh_traffic_control',
    password: 'nsg762dsak21',
    database: process.env.POSTGRES_DB
  });