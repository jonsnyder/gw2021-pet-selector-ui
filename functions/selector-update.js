const run = require("./utils/run");

exports.handler = run(async ({ client, postBody, id, q }) => {
  await client.query(q.Update(q.Ref(q.Collection("selectors"), id), { data: postBody }));
  return "";
});
