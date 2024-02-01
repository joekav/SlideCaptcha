const express = require('express');
const app = express();
const port = 3000;
const generatePayload = require('./src/gen.js');
const fs = require('fs');

app.use(express.json());

app.post('/solve', async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            error: "Invalid request body: no body provided"
        });
        return;

    } else if (!req.body.ddm.hash || !req.body.ddm.ua || !req.body.ddm.cid) {
        res.status(400).send({
            error: "Invalid request body: invalid ddm"
        });
        return;
    } else if (!req.body.background_image) {
        res.status(400).send({
            error: "Invalid request body: no image url"
        });
        return;
    }

    var response = await generatePayload.main(req.body)
    res.send(response);
});

app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
});
