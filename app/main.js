const net = require("net");
const server = net.createServer((socket) => {
    socket.on("data", 'utf-8', (req) => {
        console.log(req);
        if (req.method == 'GET' && req.path == '/') {
            socket.write("HTTP/1.1 200 OK\r\n\r\n");
        } else {
            socket.write("HTTP/1.1 404 Not Found");
        }
        socket.end();
    });
    socket.on("close", () => {
        socket.end();
        server.close();
    });
});
server.listen(4221, "localhost");
