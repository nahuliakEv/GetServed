var express = require("express");
var router = express.Router();

router.get('/', (request, response) => {
    response.send("restore password");
});

module.exports = router;