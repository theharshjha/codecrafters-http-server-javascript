const net = require("net");
const server = net.createServer((socket) => {
    socket.on("data", (req) => {
        console.log(req);
        req = parseRequest(req.toString('utf-8'));
        if (req.method == 'GET' && req.path == '/') {
            socket.write("HTTP/1.1 200 OK\r\n\r\n");
        } else {
            socket.write("HTTP/1.1 404 Not Found");
        }
        socket.end();
        server.close();
    });
    const parseRequest = (requestString) => {
        const lines = requestString.split("\r\n")
        const [startLines] = lines;
        const [method, path, protocol] = startLines.split(" ")
        return {
            method,
            path,
            protocol
        }
    }
    socket.on("close", () => {
        socket.end();
        server.close();
    });
});
server.listen(4221, "localhost");
