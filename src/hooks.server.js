import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Broadcast message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message);
      }
    });
  });
});

export function handle({ event, resolve }) {
  if (event.url.pathname === '/websocket') {
    const { upgrade } = event.request;
    if (upgrade && upgrade.includes('websocket')) {
      return new Promise((fulfill) => {
        wss.handleUpgrade(event.request, event.socket, Buffer.alloc(0), (ws) => {
          wss.emit('connection', ws, event.request);
          fulfill(new Response(null, { status: 101 }));
        });
      });
    }
  }
  return resolve(event);
}