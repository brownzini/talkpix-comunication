const { ExpressPeerServer } = require("peer");
const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "https://talkpix.com.br",
  "https://www.talkpix.com.br"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/",
});

peerServer.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use("/peerjs", peerServer);

const PORT = process.env.PORT || 443;
server.listen(PORT, () => {
  console.log(`PeerJS server rodando na porta ${PORT}`);
});
