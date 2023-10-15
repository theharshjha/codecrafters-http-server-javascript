const net = require("net");
const server = net.createServer((socket) => {
    socket.on('close', () => {
        socket.end();
        server.close();
    });
    socket.on('data', (req) => {
        req = req.toString('utf-8');
        req = parseReq(req);
        if (req.method == 'GET') {
            if (req.path == '/') {
                socket.write('HTTP/1.1 200 OK\r\n\r\n');
            } else if (req.path.split('/')[1] == 'user-agent' || req.path.split('/')[1] == 'echo') {
                socket.write('HTTP/1.1 200 OK\r\n');
                socket.write('Content-Type: text/plain\r\n');
                socket.write(`Content-Length: ${req.data.length}\r\n\r\n`);
                socket.write(req.data);

            } else {
                socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
            }
        } else {
            socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
        }
        socket.end();
    });
});
const parseReq = (req) => {
    const lines = req.split('\r\n');
    const [firstLine, , thirdLine] = lines;
    const [method, path] = firstLine.split(" ");
    const data = thirdLine.split(': ')[1];
    return { method, path, data };
};
server.listen(4221, "localhost");
