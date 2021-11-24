/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  // settings
  MINIMUM_PLAYERS: 3,
  MAXIMUM_PLAYERS: 8,
  BASE_POINTS: 50,
  GAME_ID_DICTIONARY: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  GAME_ID_LENGTH: 4,
  SHORT_ID_DICTIONARY:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  SHORT_ID_LENGTH: 8,
  LOCAL_STORAGE_KEY: "astra-draw",

  // timers
  POLLING_INTERVAL: 3000,
  TUTORIAL_LENGTH: 10000,
  ROUND_INPUT_TIMER: 59000,
  ROUND_VOTE_TIMER: 59000,
  ROUND_SCORE_TIMER: 10000,

  // game states
  ADDING_PLAYERS_PAGE: "addingPlayers",
  TUTORIAL_PAGE: "tutorial",
  SKETCH_INPUT_PAGE: "sketchInput",
  ROUND_INPUT_PAGE: "roundInput",
  ROUND_VOTE_PAGE: "roundVote",
  ROUND_SCORE_PAGE: "roundScore",
  FINAL_PAGE: "final",

  // gameplay
  ROUNDS: [
    {
      id: 1,
      title: "Let's Draw",
      scoreMultiplier: 1,
      prompts: [
        "Sketchy Cassandra",
        "Chaos Deployment",
        "Serverless Astronaut",
        "Streaming Monkey",
        "Cheese with Chet",
        "Mala is Missing",
        "Prim Pulsar",
        "Conniving Cloud",
      ],
    },
    // {
    //   id: 2,
    //   title: "Final Round",
    //   scoreMultiplier: 2,
    //   prompts: [
    //     "horse throwing a horseshoe",
    //     "shark waterskiing",
    //     "walrus in a beach chair",
    //     "circus elephant standing on a ball",
    //     "koala bear sitting on a trash can",
    //     "lizard putting on lipstick",
    //     "squirrel roasting a marshmallow.",
    //     "octopus with spoons for legs",
    //   ],
    // },
  ],
};
