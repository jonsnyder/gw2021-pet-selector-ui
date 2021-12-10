const run = require("./utils/run");

exports.handler = run(async ({ client, q, id }) => {
  await client.query(q.Delete(q.Ref(q.Collection("selectors"), id)));
  return "";
});
