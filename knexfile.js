module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/quickbudget'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
