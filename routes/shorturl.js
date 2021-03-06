const express = require("express");
const dns = require("dns");
const { add, getUrl } = require("../controllers/urlController");
const router = express.Router();
router.post('/new', async function (req, res) {
    try {
        console.log(req.body);
        const url = new URL(req.body.url);
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            throw new Error("invalid url");
        }
        dns.lookup(url.hostname, function (err) {
            if (err) {
                throw new Error("invalid url");
            }
        })
        const short_url = await add(req.body.url);
        res.json({
            original_url: req.body.url,
            short_url: short_url
        });

    } catch (err) {
        console.log(err);
        res.json({error: "invalid url"});
    }
});

router.get('/:short_url?', async function(req, res) {
    try {
        const short_url = req.params.short_url
        console.log(short_url);
        const original_url = await getUrl(short_url)
        res.redirect(301, original_url);
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router