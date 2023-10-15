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
            } else if (req.path.split('/')[1] != 'echo') {
                socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
            } else {
                socket.write('HTTP/1.1 200 OK\r\n');
                socket.write('Content-Type: text/plain\r\n');
                console.log(req.path);
                req.path = parsePath(req.path);
                socket.write(`Content-Length: ${req.path.data.length}\r\n\r\n`);
                socket.write(req.path.data);
            }
        } else {
            socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
        }
        socket.end();
    });
});
const parsePath = (path) => {
    console.log(path);
    const [data] = path.split('/').slice(2).join('/');
    return { data };
};
const parseReq = (req) => {
    const lines = req.split('\r\n');
    const [firstLine] = lines;
    const [method, path] = firstLine.split(" ");
    return { method, path };
};
server.listen(4221, "localhost");
