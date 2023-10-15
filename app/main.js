const net = require("net");
const fs = require('fs');
const server = net.createServer((socket) => {
    socket.on('close', () => {
        socket.end();
        server.close();
    });
    socket.on('data', (req) => {
        req = req.toString('utf-8');
        req = parseReq(req);
        if (req.method == "GET") {
            if (req.path == '/') {
                socket.write('HTTP/1.1 200 OK\r\n\r\n');
            } else if (req.path.split('/')[1] == 'user-agent') {
                socket.write('HTTP/1.1 200 OK\r\n');
                socket.write('Content-Type: text/plain\r\n');
                socket.write(`Content-Length: ${req.data.length}\r\n\r\n`);
                socket.write(req.data);
            } else if (req.path.split('/')[1] == 'echo') {
                socket.write('HTTP/1.1 200 OK\r\n');
                socket.write('Content-Type: text/plain\r\n');
                req.path = parsePath(req.path);
                socket.write(`Content-Length: ${req.path.data.length}\r\n\r\n`);
                socket.write(req.path.data);
            } else if (req.path.split('/')[1] == 'files') {
                const file = req.path.split('/')[2];
                const dir = process.argv[3];
                const files = fs.readdirSync(dir);
                if (!files.includes(file)) {
                    socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
                } else {
                    const data = fs.readfileSync(`${dir}/${file}`, 'utf-8');
                    ocket.write('HTTP/1.1 200 OK\r\n');
                    socket.write('Content-Type: application/octet-stream\r\n');
                    socket.write(`Content-Length: ${data.length}\r\n\r\n`);
                    socket.write(data);
                }
            } else {
                socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
            }
        } else {
            socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
        }
        socket.end();
    });
});
const parsePath = (path) => {
    const data = path.split('/').slice(2).join('/');
    return {data};
}
const parseReq = (req) => {
    const lines = req.split('\r\n');
    const [firstLine, , thirdLine] = lines;
    const [method, path] = firstLine.split(" ");
    const data = thirdLine.split(': ')[1];
    return { method, path, data };
};
server.listen(4221, "localhost");
