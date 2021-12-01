var express = require("express");
var router = express.Router();

// All other GET requests not handled before will return our React app
router.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../ui/build", "index.html"));
});

module.exports = router;
