const axios = require('axios');
const { writeFileSync } = require("fs")

const getimgaiApiKey = require('../../credentials/getimg.json').apikey

const headers = {
    'Authorization': `Bearer ${getimgaiApiKey}`,
    'Content-Type': 'application/json'
};

async function saveImage(base64, filename) {
    writeFileSync(`./content/${filename}`, base64)
}

async function generate(content, filename) {
    const data = {
        model: "stable-diffusion-v1-5",
        prompt: content,
        negative_prompt: "Disfigured, cartoon, blurry",
        width: 512,
        height: 512,
        steps: 50,
        guidance: 7.5,
        seed: 42,
        scheduler: "dpmsolver++",
        output_format: "jpeg"
    };

    return axios.post('https://api.getimg.ai/v1/stable-diffusion/text-to-image', data, { headers: headers })
    .then(response => {
        console.log('> [getimgai-robot] Done...')
        const base64 = response.data.image
        const image = Buffer.from(base64, "base64")
        saveImage(image, filename)
    })
    .catch(error => {
        console.error(error);
    });
}

module.exports = {
    generate
}