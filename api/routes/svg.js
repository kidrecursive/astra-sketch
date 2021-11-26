var grpc = require('../grpc')
var express = require('express');

var router = express.Router();

router.get('/random.svg', function(req, res, next) {
    grpc.getSvg(req.params.id).then(svg => {
        res.setHeader('Content-Type', 'image/svg+xml');
        res.status(200).write(svg);
        res.end();
    }).catch(err => {
        res.status(500).render('error', { message: "Error attempting to get svg", error: err });
    });
});

module.exports = router;
