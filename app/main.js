const { Socket } = require("dgram");
const net = require("net");
const server = net.createServer((socket) => {
    socket.on('close', () => {
        socket.end();
        server.closed();
    });
    socket.on('data', (req) => {
        req = req.toString('utf-8');
        parse(req);
        let res = 'HTTP/1.1';
        socket.write(res);
        socket.end();
    });
});
const parse  = (req) => {
    const lines = req.split('\r\n');
    console.log(lines);
    const [startLines, blah] = lines;
    console.log(startLines);
    console.log(blah);
}
// const parseRequest = (requestString) => {

//     const lines = requestString.split("\r\n")

//     const [startLines] = lines;

//     const [method, path, protocol] = startLines.split(" ")

//     return {

//         method,

//         path,

//         protocol

//     }
    server.listen(4221, "localhost");
