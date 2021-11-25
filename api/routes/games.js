var sg = require('@stargate-oss/stargate-grpc-node-client')
var grpc = require('../grpc')
var config = require('../config')
var express = require('express');
var { publishGameChange } = require('../pulsar')

var router = express.Router();

var grpc = require("../grpc");

// Get full game state object
router.get('/:id', function(req, res, next) {
    grpc.getGame(req.params.id).then(game => {
        res.status(200).write(JSON.stringify(game, null, 2));
        res.end();
    }).catch(err => {
        res.status(500).render('error', { message: "Error attempting to get game", error: err });
    });
});

// Upsert game
router.put('/:id', function(req, res, next) {
    if (req.body) {
        const query = new sg.Query();
        let body = req.body;

        if (body.hasOwnProperty('audienceSize')) {
            body.audience_size = body.audienceSize;
            delete body.audienceSize;
        }

        if (body.hasOwnProperty('requestDuration')) {
            body.request_duration = body.requestDuration;
            delete body.requestDuration;
        }

        query.setCql(`INSERT INTO ${config.KEYSPACE}.game JSON '${JSON.stringify(req.body)}' DEFAULT UNSET`);
        grpc.client.executeQuery(query).then((response) => {
            publishGameChange(req.params.id);
            res.status(200).write(JSON.stringify({}));
            res.end();
        }).catch((err) => {
            res.status(500).render('error', { message: "Error attempting to add new game", error: err });
        });

    } else {
        res.status(400).render( 'error', { message: "body not provided", error: new Error("body not provided")})
    }
});

//router.put('/:id', function(req, res, next) {
//    if (req.body) {
//        const query = new sg.Query();
//        let body = req.body;
//        let update = "";
//
//        let values = new sg.Values();
//
//        if (body.hasOwnProperty('page')) {
//            update += "page = ?"
//            let value = new sg.Value().setString(body.page);
//            values.addValues(value);
//        }
//
//        if (body.hasOwnProperty('sketch')) {
//            if (update.length > 0) {
//                update += ", ";
//            }
//            update += "sketch = ?"
//            let value = new sg.Value().setString(body.sketch);
//            values.addValues(value);
//        }
//
//        if (body.hasOwnProperty('round')) {
//            if (update.length > 0) {
//                update += ", ";
//            }
//            update += "round = ?"
//            let value = new sg.Value().setInt(body.round);
//            values.addValues(value);
//        }
//
//        let id = new sg.Value().setString(req.params.id);
//        values.addValues(id);
//
//        query.setCql(`UPDATE ${config.KEYSPACE}.game SET ${update} WHERE id = ?'`);
//        query.setValues(values);
//
//        grpc.client.executeQuery(query).then((response) => {
//            publishGameChange(req.params.id);
//            res.status(200).end();
//        }).catch((err) => {
//            res.status(500).render('error', { message: "Error attempting to add new game", error: err });
//        });
//    } else {
//        res.status(400).render( 'error', { message: "body not provided", error: new Error("body not provided")})
//    }
//});

// Upsert player(s)
router.put('/:id/players', function(req, res, next) {
    if (req.body) {
        let body = req.body;
        if (Array.isArray(body)) {
            let batch = new sg.Batch();
            batch.setType(sg.Batch.Type.LOGGED);
            body.forEach(player => {
                const query = new sg.Query();
                player.gameid = req.params.id;
                query.setCql(`INSERT INTO ${config.KEYSPACE}.players JSON '${JSON.stringify(player)}' DEFAULT UNSET`);
                batch.addQueries(query);
            });
            grpc.client.executeBatch(batch).then((response) => {
                publishGameChange(req.params.id);
                res.status(200).write(JSON.stringify({}));
                res.end();
            }).catch((err) => {
                res.status(500).render('error', { message: "Error attempting to add new players", error: err });
            });
        } else {
            const query = new sg.Query();
            body.gameid = req.params.id;
            query.setCql(`INSERT INTO ${config.KEYSPACE}.players JSON '${JSON.stringify(body)}' DEFAULT UNSET`);
            grpc.client.executeQuery(query).then((response) => {
                publishGameChange(req.params.id);
                res.status(200).write(JSON.stringify({}));
                res.end();
            }).catch((err) => {
                res.status(500).render('error', { message: "Error attempting to add new player", error: err });
            });
        }
    } else {
        res.status(400).render( 'error', { message: "body not provided", error: new Error("body not provided")})
    }
});


// Upsert sketch(es)
router.put('/:id/sketches', function(req, res, next) {
    if (req.body) {
        let body = req.body;
        if (Array.isArray(body)) {
            let batch = new sg.Batch();
            batch.setType(sg.Batch.Type.LOGGED);
            body.forEach(sketch => {
                const query = new sg.Query();
                sketch.gameid = req.params.id;
                query.setCql(`INSERT INTO ${config.KEYSPACE}.sketches JSON '${JSON.stringify(sketch)}' DEFAULT UNSET`);
                batch.addQueries(query);
            });
            grpc.client.executeBatch(batch).then((response) => {
                publishGameChange(req.params.id);
                res.status(200).write(JSON.stringify({}));
                res.end();
            }).catch((err) => {
                res.status(500).render('error', { message: "Error attempting to add new sketches", error: err });
            });
        } else {
            const query = new sg.Query();
            body.gameid = req.params.id;
            query.setCql(`INSERT INTO ${config.KEYSPACE}.sketches JSON '${JSON.stringify(body)}' DEFAULT UNSET`);
            grpc.client.executeQuery(query).then((response) => {
                publishGameChange(req.params.id);
                res.status(200).write(JSON.stringify({}));
                res.end();
            }).catch((err) => {
                res.status(500).render('error', { message: "Error attempting to add new sketch", error: err });
            });
        }
    } else {
        res.status(400).render( 'error', { message: "body not provided", error: new Error("body not provided")})
    }
});

// Upsert answer(s)
router.put('/:id/answers', function(req, res, next) {
    if (req.body) {
        let body = req.body;
        if (Array.isArray(body)) {
            let batch = new sg.Batch();
            batch.setType(sg.Batch.Type.LOGGED);
            body.forEach(answer => {
                const query = new sg.Query();
                answer.gameid = req.params.id;
                query.setCql(`INSERT INTO ${config.KEYSPACE}.answers JSON '${JSON.stringify(answer)}' DEFAULT UNSET`);
                batch.addQueries(query);
            });
            grpc.client.executeBatch(batch).then((response) => {
                publishGameChange(req.params.id);
                res.status(200).write(JSON.stringify({}));
                res.end();
            }).catch((err) => {
                res.status(500).render('error', { message: "Error attempting to add new answer", error: err });
            });
        } else {
            const query = new sg.Query();
            body.gameid = req.params.id;
            query.setCql(`INSERT INTO ${config.KEYSPACE}.answers JSON '${JSON.stringify(body)}' DEFAULT UNSET`);
            grpc.client.executeQuery(query).then((response) => {
                publishGameChange(req.params.id);
                res.status(200).write(JSON.stringify({}));
                res.end();
            }).catch((err) => {
                res.status(500).render('error', { message: "Error attempting to add new answer", error: err });
            });
        }
    } else {
        res.status(400).render( 'error', { message: "body not provided", error: new Error("body not provided")})
    }
});

// Upsert vote(s)
router.put('/:id/votes', function(req, res, next) {
    if (req.body) {
        let body = req.body;
        if (Array.isArray(body)) {
            let batch = new sg.Batch();
            batch.setType(sg.Batch.Type.LOGGED);
            body.forEach(vote => {
                const query = new sg.Query();
                vote.gameid = req.params.id;
                query.setCql(`INSERT INTO ${config.KEYSPACE}.votes JSON '${JSON.stringify(vote)}' DEFAULT UNSET`);
                batch.addQueries(query);
            });
            grpc.client.executeBatch(batch).then((response) => {
                publishGameChange(req.params.id);
                res.status(200).write(JSON.stringify({}));
                res.end();
            }).catch((err) => {
                res.status(500).render('error', { message: "Error attempting to add new votes", error: err });
            });
        } else {
            const query = new sg.Query();
            body.gameid = req.params.id;
            query.setCql(`INSERT INTO ${config.KEYSPACE}.votes JSON '${JSON.stringify(body)}' DEFAULT UNSET`);
            grpc.client.executeQuery(query).then((response) => {
                publishGameChange(req.params.id);
                res.status(200).write(JSON.stringify({}));
                res.end();
            }).catch((err) => {
                res.status(500).render('error', { message: "Error attempting to add new vote", error: err });
            });
        }
    } else {
        res.status(400).render( 'error', { message: "body not provided", error: new Error("body not provided")})
    }
});

module.exports = router;