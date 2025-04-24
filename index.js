const { ExpressPeerServer } = require("peer");
const express = require("express");

const app = express();
const server = require("http").createServer(app);

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/",
});

app.use("/peerjs", peerServer);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`PeerJS server rodando na porta ${PORT}`);
});
