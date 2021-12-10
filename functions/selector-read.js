const run = require("./utils/run");

exports.handler = run(async ({ client, q, id }) => {
  const response = await client.query(q.Get(q.Ref(q.Collection("selectors"), id)));
  return response.data;
});
