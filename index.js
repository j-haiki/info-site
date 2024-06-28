const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer(function (req, res) {
    const ErrorPage = fs.readFileSync(
      __dirname + "/404.html",
      "utf-8",
      (err, data) => {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(data);
      }
    );

    const q = url.parse(req.url, true);
    let filename = "";
    if (q.pathname === "/") {
      filename = "." + "/index.html";
    } else {
      filename = "." + q.pathname + ".html";
    }

    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end(ErrorPage);
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
