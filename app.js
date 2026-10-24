
const http = require("http");

const PORT = process.env.PORT || 3000;

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevOpsFlow Dashboard</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #101827;
      color: #f8fafc;
    }
    header {
      background: #172338;
      padding: 24px 8%;
      border-bottom: 1px solid #344256;
    }
    header h1 { color: #60a5fa; margin: 0; }
    main { max-width: 1000px; margin: 40px auto; padding: 20px; }
    .hero, .card {
      background: #1b293e;
      padding: 25px;
      border-radius: 12px;
      margin-bottom: 20px;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 18px;
    }
    .status { color: #4ade80; font-weight: bold; }
    .button {
      display: inline-block;
      background: #2563eb;
      color: white;
      padding: 12px 18px;
      border-radius: 8px;
      text-decoration: none;
    }
    footer { text-align: center; padding: 25px; color: #a8b4c7; }
  </style>
</head>
<body>
  <header>
    <h1>DevOpsFlow</h1>
    <p>Continuous Integration and Continuous Deployment</p>
  </header>
  <main>
    <section class="hero">
      <h2>Welcome to DevOpsFlow 🚀</h2>
      <p>A demo application using Jenkins, Docker, GitHub and AWS EC2.</p>
      <p>Application status: <span class="status">Running</span></p>
      <a class="button" href="/api/health">Check Application Health</a>
    </section>
    <section class="cards">
      <div class="card">
        <h3>01. Build</h3>
        <p>Jenkins builds the Docker image.</p>
      </div>
      <div class="card">
        <h3>02. Test</h3>
        <p>Automated tests verify the application.</p>
      </div>
      <div class="card">
        <h3>03. Deploy</h3>
        <p>Docker runs the application.</p>
      </div>
    </section>
    <section class="card">
      <h3>Project Information</h3>
      <p>Task: 2 - Jenkins CI/CD Pipeline</p>
      <p>Technology: Node.js, Jenkins, Docker, GitHub and AWS EC2</p>
    </section>
  </main>
  <footer>DevOpsFlow | Student DevOps Project</footer>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  if (req.url === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({
      status: "healthy",
      application: "DevOpsFlow"
    }));
  }

  if (req.url === "/" || req.url === "/index.html") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return res.end(html);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

if (require.main === module) {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`DevOpsFlow running on port ${PORT}`);
  });
}

module.exports = server;
