const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const WebSocket = require("ws");

// web socket stuff

const wss = new WebSocket.Server({ port: 10080 });

const clients = [];

wss.on("connection", function connection(ws) {
  console.log("received connection:", ws);
  clients.push(ws);
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });
});

// serial port stuff

const name = "/dev/cu.usbmodem146101"; // replace this to work for you

const port = new SerialPort(name, { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: "\n" }));

port.on("open", () => {
  console.log("serial port open");
});

parser.on("data", (data) => {
  clients.forEach((c) => c.send(data));
});
