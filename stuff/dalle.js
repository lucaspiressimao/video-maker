const { Configuration, OpenAIApi } = require("openai");
const openaiApiKey = require('../credentials/openai.json').apikey

const configuration = new Configuration({
    apiKey: openaiApiKey,
});

async function generate(content) {
    console.log('> [dalle-robot] Asking image...');
    const oai = await new OpenAIApi(configuration);
    
    try {
        response = await oai.createImage({
            prompt: content,
            n: 1,
            size: "1024x1024"
        })    
        console.log('> [dalle-robot] Done image...', response.data.data[0].url);
        return response.data.data[0].url;
    } catch (error) {
        console.log('> [dalle-robot] Error getting image...');
        console.log(error);
    }
}

// generate("uma fotografia da lápide do túmulo de Oppenheimer com a famosa citação 'Agora eu me tornei a Morte, a destruidora de mundos', que ele expressou ao testemunhar o poder destrutivo da bomba atômica.")
generate("a home built in a huge Soap bubble, windows, doors, porches, awnings, middle of SPACE, cyberpunk lights, Hyper Detail, 8K, HD, Octane Rendering, Unreal Engine, V-Ray, full hd -- s5000 --uplight --q 3 --stop 80--w 0.5 --ar 1:3")