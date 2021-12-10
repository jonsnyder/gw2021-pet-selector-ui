const faunadb = require("faunadb");
const q = faunadb.query;

module.exports = func => async (event, context) => {

  const container = {
    get client() {
      return new faunadb.Client({
        secret: process.env.FAUNADB_SERVER_SECRET
      });
    },
    get postBody() {
      return JSON.parse(event.body);
    },
    get id() {
      return event.path.match(/([^\/]*)\/*$/)[0];
    },
    q
  };

  try {
    const body = await func(container);
    return {
      statusCode: 200,
      body: JSON.stringify(body)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
};

