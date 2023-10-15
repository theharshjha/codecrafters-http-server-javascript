const net = require("net");
const server = net.createServer((socket) => {
    socket.on('data', (req) => {
        req = parse(req.toString('utf-8'));
        let PATH = req.path.split('/');
        console.log(PATH);
        if (req.method == 'GET' && path == '/') {
            socket.write("HTTP/1.1 200 OK\r\n\r\n");
        } else if (req.method == 'GET' && PATH[1] == 'echo') {
            socket.write("HTTP/1.1 200 OK\r\n\r\n");
            socket.write("Content-Type: text/plain\r\n\r\n");
            socket.write("Content-Length: {PATH[3].length}\r\n\r\n");
            socket.write("{PATH[3]}\r\n\r\n");
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
    console.log(lines);
    const [startLines] = lines;
    console.log(startLines);
    const [method, path, protocol] = startLines.split(" ")
    return {
      method,
      path,
      protocol
    }
  }

server.listen(4221, "localhost");
