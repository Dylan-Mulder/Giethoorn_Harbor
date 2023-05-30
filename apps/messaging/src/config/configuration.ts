export default () => ({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: 'gh_messaging',
    password: 'MmMmMQmqnhfy26',
    database: process.env.POSTGRES_DATABASE
  });