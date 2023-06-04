export default () => ({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: 'gh_billing',
    password: 'varwcdy2uFDS',
    database: process.env.POSTGRES_DATABASE
  });