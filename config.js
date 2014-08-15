// Config
module.exports = {
  evernote: {
    API_CONSUMER_KEY: 'adam187',
    API_CONSUMER_SECRET: '68a25c39507b793a',
    SANDBOX: true
  },
  mongodb: {
    db: 'sessions',
    collection: 'express_sessions',
    host: 'localhost',
    port: 27017
  },
  partials: {
    navbar: "partials/_navbar",
    login: "partials/_login",
    home: "partials/_home"
  }
}