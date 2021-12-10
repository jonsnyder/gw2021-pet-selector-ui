const run = require("./utils/run");

exports.handler = run(async ({ client, q, postBody }) => {
  await client.query(q.Create(q.Ref("classes/selectors"), { data: postBody}));
  return "";
});
