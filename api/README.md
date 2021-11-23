
## Game API

### New Game: `POST /games/:id`

Creates a new game (and VIP player).

Input:

```
{
    vip: <name>
}
```

### Add Player: `POST /games/:id/players/:name`

Adds a player to an existing game.

### Get Game: `GET /games/:id`

Gets the entire game state JSON object.

## Streaming API

## Server-side events `GET /streaming/:id`

Listens to server-side events. Returns the entire game state as the payload.

```javascript
const eventSource = new EventSource("/stream/abc");
eventSource.onmessage = function (event) {
    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = event.data;
}
```

### Testing Page `http://localhost:3000/stream.html`

Use to viewing game state updating in realtime.

