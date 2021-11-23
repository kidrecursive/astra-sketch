
## Game API

### Game flow example


* VIP creates game: 

    `POST /games/ABCD`

    ```
    {
        "vip": "Mike"
    }
    ```

* Players add themselves (names do not have to be unique, UUID assigned)
    * Add players `POST /games/ABCD/player/Chris` (generated UUID: 3ba05333-ce37-403d-bb2d-8a69681b1558)
    * Add players `POST /games/ABCD/player/Danielle` (generated UUID: aa581d07-8ae5-4dfb-890b-8133067f8c8f)

* VIP creates topics


    `POST /games/instances/0`

    Note: Use uuids of players pulled from game object state

    ```
    {
        "players": [ "3ba05333-ce37-403d-bb2d-8a69681b1558", "aa581d07-8ae5-4dfb-890b-8133067f8c8f" ]
    }
    ```

* VIP updates games state for players to draw sketchs "DRAW_SKETCH"

    `PUT /games/ABCD/state/DRAW_SKETCH`


* Players upload SVGs
    * `PUT /localhost:3000/games/ABCD/instances/0/topics/3ba05333-ce37-403d-bb2d-8a69681b1558/svg`

        ```
        {
            "svg": "<svg data>"
        }
        ```

    * `PUT /localhost:3000/games/ABCD/instances/0/topics/aa581d07-8ae5-4dfb-890b-8133067f8c8f/svg`

        ```
        {
            "svg": "<svg data>"
        }
        ```

* VIP updates games topic/state for players to guess

    `PUT /games/ABCD/topic/aa581d07-8ae5-4dfb-890b-8133067f8c8f`

    `PUT /games/ABCD/state/GUESS`

* Players submit guesses

    * `PUT /games/abc/instances/0/guesses/aa581d07-8ae5-4dfb-890b-8133067f8c8f/guess/3ba05333-ce37-403d-bb2d-8a69681b1558`

        ```
        {
            "guess": "Chaos Monkey"
        }
        ```

    * `PUT /games/abc/instances/0/guesses/aa581d07-8ae5-4dfb-890b-8133067f8c8f/guess/aa581d07-8ae5-4dfb-890b-8133067f8c8f`

        ```
        {
            "guess": "Deploy Monkey"
        }
        ```

* VIP updates games state for players to vote on guessses

    `PUT /games/ABCD/state/VOTE`

* Players submit votes

    Note: Their voting for the same guess

    * `PUT /games/abc/instances/0/guesses/aa581d07-8ae5-4dfb-890b-8133067f8c8f/vote/3ba05333-ce37-403d-bb2d-8a69681b1558`

        ```
        {
            "player": "3ba05333-ce37-403d-bb2d-8a69681b1558"
        }
        ```

    * `PUT /games/abc/instances/0/guesses/aa581d07-8ae5-4dfb-890b-8133067f8c8f/vote/3ba05333-ce37-403d-bb2d-8a69681b1558`

        ```
        {
            "player": "aa581d07-8ae5-4dfb-890b-8133067f8c8f"
        }
        ```

* VIP updates games state to finish game

    `PUT /games/ABCD/state/DONE`


### New Game: `POST /games/:id`

Creates a new game (and VIP player).

Input:

```
{
    "vip": "<name>"
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

