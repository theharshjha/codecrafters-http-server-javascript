const net = require("net");
const server = net.createServer((socket) => {
    socket.on('data', (req) => {
        req = parse(req.toString('utf-8'));
        let PATH = req.path.split('/');
        if (req.method == 'GET' && PATH[1] == 'echo') {
            socket.write("HTTP/1.1 200 OK\r\n\r\n");
            socket.write("Content-Type: text/plain");
            socket.write("Content-Length: ", PATH[3].length);
            socket.write(PATH[3]);
        } else {
            socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
        }
        socket.end();

    })
    socket.on("close", () => {
        socket.end();
        server.close();
    });
});
const parse = (requestString) => {
    const lines = requestString.split("\r\n")
    const [startLines] = lines;
    const [method, path, protocol] = startLines.split(" ")
    return {
      method,
      path,
      protocol
    }
  }

server.listen(4221, "localhost");
