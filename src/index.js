const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const ipAddress = "http://127.0.0.1";
  const url = new URL(request.url, ipAddress);
  const userName = url.searchParams.get("hello");
  // Написать обработчик запроса:
  // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
  // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
  // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
  // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
  // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500
  if (!request.url.startsWith("/")) {
    response.status = 500;
    response.statusMessage = "ERROR";
    response.header = "Content-Type: text/plain";
    response.write("INVALID REQUEST");
    response.end();
    return;
  } else if (request.url === "/") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/plain";
    response.write("Hello, world");
    response.end();
    return;
  } else if (
    request.url.startsWith("/?users") ||
    request.url.startsWith("/?hello=") ||
    request.url.startsWith("/?hello")
  ) {
    if (request.url === "/?users") {
      response.status = 200;
      response.statusMessage = "OK";
      response.header = "Content-Type: application/json";
      response.write(getUsers());
      response.end();
      return;
    } else {
      if (userName === null || userName === "") {
        response.status = 400;
        response.statusMessage = "ERROR";
        response.header = "Content-Type: text/plain";
        response.write(`Enter a name`);
        response.end();
        return;
      } else {
        response.status = 200;
        response.statusMessage = "OK";
        response.header = "Content-Type: text/plain";
        response.write(`Hello, ${userName}`);
        response.end();
        return;
      }
    }
  } else {
    response.status = 500;
    response.statusMessage = "ERROR";
    response.header = "Content-Type: text/plain";
    response.write("INVALID REQUEST");
    response.end();
    return;
  }
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3003");
});
