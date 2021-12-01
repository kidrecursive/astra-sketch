var grpc = require('@grpc/grpc-js')
var sg = require("@stargate-oss/stargate-grpc-node-client")
var config = require("./config");
var { getRandomInt } = require("./utils")

const keyspace = config.KEYSPACE;

const bearerToken = new sg.StargateBearerToken(config.ASTRA_TOKEN);
const credentials = grpc.credentials.combineChannelCredentials(
  grpc.credentials.createSsl(), bearerToken);

// For Astra DB: passing the credentials created above
const stargateClient = new sg.StargateClient(config.ASTRA_URI, credentials);

// Create a promisified version of the client, so we don't need to use callbacks
const client = sg.promisifyStargateClient(stargateClient);

async function createSchema() {
  await client.executeQuery(new sg.Query().setCql(
    `CREATE TABLE IF NOT EXISTS ${keyspace}.game 
      (id text, 
       audience_size int, 
       page text, 
       request_duration int,
       round int,
       sketch text,
       PRIMARY KEY(id))`));
  await client.executeQuery(new sg.Query().setCql(
    `CREATE TABLE IF NOT EXISTS ${keyspace}.players 
      (gameid text, 
       name text, 
       vip boolean,
       score int,
       PRIMARY KEY(gameid, name))`));
  await client.executeQuery(new sg.Query().setCql(
    `CREATE TABLE IF NOT EXISTS ${keyspace}.sketches 
      (gameid text, 
       id text,
       answered boolean,
       player text,
       prompt text,
       round int,
       svg text,
       PRIMARY KEY(gameid, id))`));
  await client.executeQuery(new sg.Query().setCql(
    `CREATE TABLE IF NOT EXISTS ${keyspace}.answers 
      (gameid text, 
       id text,
       player text,
       content text,
       sketch text,
       PRIMARY KEY(gameid, id))`));
  await client.executeQuery(new sg.Query().setCql(
    `CREATE TABLE IF NOT EXISTS ${keyspace}.votes 
      (gameid text, 
       id text,
       answer text,
       player text,
       PRIMARY KEY(gameid, id))`));
}

async function getSvg() {
  const query = new sg.Query();
  query.setCql(`SELECT svg FROM ${keyspace}.sketches LIMIT 10`);
  const res = await client.executeQuery(query);
  if (res.hasResultSet() && res.getResultSet().getRowsList().length > 0) {
    const rows = res.getResultSet().getRowsList();
    var r = getRandomInt(rows.length); 
    var svg = rows[r].getValuesList()[0].getString();
    while(!svg && svg.length == 0) {
      r = getRandomInt(rows.length);
      svg = rows[r].getValuesList()[0].getString();
    }
    return svg;
  }
}

async function getGame(gameId) {
  let game = {};

  const gameQuery = new sg.Query();
  gameQuery.setCql(`SELECT JSON * FROM ${keyspace}.game WHERE id = '${gameId}'`);

  const playerQuery = new sg.Query();
  playerQuery.setCql(`SELECT JSON name, vip, score FROM ${keyspace}.players WHERE gameid = '${gameId}'`);

  const sketchQuery = new sg.Query();
  sketchQuery.setCql(`SELECT JSON id, answered, player, prompt, round, svg FROM ${keyspace}.sketches WHERE gameid = '${gameId}'`);

  const answerQuery = new sg.Query();
  answerQuery.setCql(`SELECT JSON id, content, player, sketch FROM ${keyspace}.answers WHERE gameid = '${gameId}'`);

  const voteQuery = new sg.Query();
  voteQuery.setCql(`SELECT JSON id, answer, player FROM ${keyspace}.votes WHERE gameid = '${gameId}'`);

  const gameRes = await client.executeQuery(gameQuery);
  if (gameRes.hasResultSet() && gameRes.getResultSet().getRowsList().length > 0) {
    const gameObj = JSON.parse(gameRes.getResultSet().getRowsList()[0].getValuesList()[0].getString());

    gameObj.audienceSize = gameObj.audience_size;
    delete gameObj.audience_size;
    gameObj.requestDuration = gameObj.request_duration;
    delete gameObj.request_duration;
    game.game = gameObj;
  }

  const playerRes = await client.executeQuery(playerQuery);
  let players = {};
  if (playerRes.hasResultSet() && playerRes.getResultSet().getRowsList().length > 0) {
    playerRes.getResultSet().getRowsList().forEach(row => {
      const player = JSON.parse(row.getValuesList()[0].getString());
      players[player.name] = player;
    });
  }
  game.players = players;

  const sketchRes = await client.executeQuery(sketchQuery);
  let sketches = {};
  if (sketchRes.hasResultSet() && sketchRes.getResultSet().getRowsList().length > 0) {
    sketchRes.getResultSet().getRowsList().forEach(row => {
      const sketch = JSON.parse(row.getValuesList()[0].getString());
      sketches[sketch.id] = sketch;
    });
  }
  game.sketches = sketches;

  const answerRes = await client.executeQuery(answerQuery);
  let answers = {};
  if (answerRes.hasResultSet() && answerRes.getResultSet().getRowsList().length > 0) {
    answerRes.getResultSet().getRowsList().forEach(row => {
      const answer = JSON.parse(row.getValuesList()[0].getString());
      answers[answer.id] = answer;
    });
  }
  game.answers = answers;

  const voteRes = await client.executeQuery(voteQuery);
  let votes = {};
  if (voteRes.hasResultSet() && voteRes.getResultSet().getRowsList().length > 0) {
    voteRes.getResultSet().getRowsList().forEach(row => {
      const vote = JSON.parse(row.getValuesList()[0].getString());
      votes[vote.id] = vote;
    });
  }
  game.votes = votes;

  return game;
}

module.exports.createSchema = createSchema;
module.exports.getSvg = getSvg;
module.exports.getGame = getGame;
module.exports.client = client;