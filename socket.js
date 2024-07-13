const express = require('express');
const cors = require('cors');
const app = express();
const collab = require('@codemirror/collab')
const { Text, ChangeSet } = require('@codemirror/state')

const http = require('http');


/** @type {import('cors').CorsOptions} */
const corsConfig = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
};

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: corsConfig });

app.use(cors(corsConfig));

app.get('/', (_req, res) => {
  res.json({ message: 'Hello' })
});

//============================================================================
/** @type {collab.Update[]} */
let updates = []
let doc = Text.of(["Start document"])

/** @type {((value: any) => void)[]} */
let pending = []
io.on('connection', (socket) => {
  socket.on('pullUpdates', (version) => {
    if (version < updates.length) {
      socket.emit("pullUpdateResponse", JSON.stringify(updates.slice(version)))
    } else {
      pending.push((updates) => { socket.emit('pullUpdateResponse', JSON.stringify(updates.slice(version))) });
    }
  })

  socket.on('pushUpdates', (version, docUpdates) => {
    docUpdates = JSON.parse(docUpdates);

    try {
      if (version != updates.length) {
        socket.emit('pushUpdateResponse', false);
      } else {
        for (let update of docUpdates) {
          // Convert the JSON representation to an actual ChangeSet
          // instance
          let changes = ChangeSet.fromJSON(update.changes)
          updates.push({ changes, clientID: update.clientID })
          doc = changes.apply(doc)
        }
        socket.emit('pushUpdateResponse', true);

        while (pending.length) pending.pop()(updates)
      }
    } catch (error) {
      console.error(error)
    }
  })

  socket.on('getDocument', () => {
    socket.emit('getDocumentResponse', updates.length, doc.toString());
  })
});

//============================================================================

server.listen(3001, () => {
  console.log('='.repeat(20));
  console.log('listening on *:3001');
});