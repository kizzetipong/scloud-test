var env = process.env.NODE_ENV || 'dev'

function config(envParam = {}) {
  var retConfig = {}
  env = envParam.NODE_ENV || env
  switch (env) {
  case 'production':
  case 'staging':
  case 'dev':
  case 'development':
  case 'test':
  default:
    retConfig = {
      database: { //TODO: setup postgres and connect real database
        uri: 'postgres://{user}:{password}@localhost:{port}/{dbname}}',
        options: {
          pool: {
            max: 5,
            idle: 30000,
            acquire: 60000,
          },
          logging: false,
        },
      },
      api: {
        url: 'http://localhost',
        port: '3000',
      },
    }
    break
  }
  return retConfig
}

module.exports = config