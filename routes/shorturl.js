const express = require("express");
const dns = require("dns");
const { add, getUrl } = require("../controllers/urlController");
const router = express.Router();
router.post('/new', async function (req, res) {
    try {
        const url = new URL(req.body)
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            throw new Error("invalid url");
        }
        dns.lookup(url.hostname, function (err) {
            if (err) {
                throw new Error("invalid url");
            }
        })
        await add(req.body);
        res.sendStatus(200);

    } catch (err) {
        console.log(err);
        res.json({error: "invalid url"});
    }
});

router.get('/:short_url', async function(req, res) {
    try {
        const short_url = req.params.short_url
        const original_url = await getUrl(short_url)
        res.redirect(original_url);
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router