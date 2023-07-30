const { Configuration, OpenAIApi } = require("openai");
const imageDownloader = require('image-downloader')
const openaiApiKey = require('../../credentials/openai.json').apikey

const configuration = new Configuration({
    apiKey: openaiApiKey,
});

async function downloadAndSave(url, fileName) {
    console.log('> [dalle-robot] Downloading image ...');
    return imageDownloader.image({
        url: url,
        dest: `../../content/${fileName}`
    })
}

async function generate(content, filename) {
    console.log('> [dalle-robot] Asking image...');
    const oai = await new OpenAIApi(configuration);

    try {
        response = await oai.createImage({
            prompt: content,
            n: 1,
            size: "1024x1024"
        })
        console.log('> [dalle-robot] Done image...');
        let url = response.data.data[0].url
        downloadAndSave(url, filename)
    } catch (error) {
        console.log('> [dalle-robot] Error getting image...');
        console.log(error);
    }
}

module.exports = {
    generate
}