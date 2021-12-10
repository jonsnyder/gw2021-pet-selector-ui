const run = require("./utils/run");

exports.handler = run(async ({ client, q }) => {
  const selectors = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("selectors")), { size: 100 }),
      q.Lambda("ref", q.Get(q.Var("ref")))
    )
  );
  return selectors.data.map(selector => {
    const {
      data,
      ref: { id }
    } = selector;
    return { ...data, id };
  });
});
