const urlModel = require('../models/url');
const self = {
    add: async function (url) {
        let max_url = await self.getMax();
        const newUrl = new urlModel({
            original_url: url,
            short_url: ++max_url
        })
        await newUrl.save();
        return ++max_url;
    },

    getMax: async function () {
        const urlData = await urlModel.findOne({}).sort({short_url: -1});
        if (urlData) return urlData.short_url;
        else return 0;
    },

    getUrl: async function (short_url) {
        const urlData = await urlModel.findOne({ short_url });
        if (urlData) return urlData.original_url;
        else return 0;
    }
}

module.exports = self