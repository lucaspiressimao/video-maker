const axios = require('axios');
const { writeFileSync } = require("fs")

const getimgaiApiKey = "key-2MbKgxQhd3OmRRvUpdh8bFnSKhoYBRZ8cL9YutnEDvK4QVzd1uyiepXzB6pPxAHSPnZ1E42yOiCe2BdTGHJDUP4cMK2LZ8c5"

const headers = {
    'Authorization': `Bearer ${getimgaiApiKey}`,
    'Content-Type': 'application/json'
};

const data = {
    model: "stable-diffusion-v1-5",
    prompt: "Oppenheimer dealing with the weight of his own creations, facing protests from pacifist demonstrators against the use of the atomic bomb.",
    negative_prompt: "Disfigured, cartoon, blurry",
    width: 512,
    height: 512,
    steps: 50,
    guidance: 7.5,
    seed: 42,
    scheduler: "dpmsolver++",
    output_format: "jpeg"
};

axios.post('https://api.getimg.ai/v1/stable-diffusion/text-to-image', data, { headers: headers })
    .then(response => {
        console.log('> [getimgai-robot] Done...')
        const base64 = response.data.image
        const image = Buffer.from(base64, "base64")

        writeFileSync("image.png", image)
    })
    .catch(error => {
        console.error(error);
    });