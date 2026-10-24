
const test = require("node:test");
const assert = require("node:assert/strict");
const server = require("./app");

test("Home page displays DevOpsFlow", async () => {
  await new Promise((resolve) =>
    server.listen(0, "127.0.0.1", resolve)
  );

  try {
    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}/`);
    const body = await response.text();

    assert.equal(response.status, 200);
    assert.match(body, /DevOpsFlow/);
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve())
    );
  }
});

test("Health endpoint returns healthy status", async () => {
  await new Promise((resolve) =>
    server.listen(0, "127.0.0.1", resolve)
  );

  try {
    const address = server.address();
    const response = await fetch(
      `http://127.0.0.1:${address.port}/api/health`
    );
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.status, "healthy");
    assert.equal(data.application, "DevOpsFlow");
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve())
    );
  }
});
