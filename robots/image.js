const state = require('../helpers/state.js')
const getimg = require('../helpers/getimgai/getimg.js')
// const dalle = require('../helpers/openai/dalle.js')

async function robot() {
    console.log('> [image-robot] Starting...')
    const content = state.load()

    await generateAllImages(content)

    state.save(content)

    async function generateAllImages(content) {
        let cenas = content.script_object.cenas

        Object.keys(cenas).forEach(key => {
            imagem = cenas[key].figures
            createImage(imagem, key)
        });
    }

    async function createImage(imagem, cena) {
        console.log('> [image-robot] Building image ...');
        getimg.generate(imagem,`${cena}_image.jpg`)
        // dalle.generate(imagem, `${cena}_image.jpg`);
    }
}

module.exports = robot
