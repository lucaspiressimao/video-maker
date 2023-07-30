const chatgpt = require('../helpers/openai/gpt.js')

const state = require('../helpers/state.js')

async function robot() {
  console.log('> [text-robot] Starting...')
  const content = state.load()

  await getScript(content)
  await sanitizeScript(content)

  state.save(content)

  async function getScript(content) {
    console.log('> [text-robot] Fetching content');
    const script = await chatgpt.ask(content.prefix, content.duration, content.searchTheme);
    content.script = script
    state.save(content)
    console.log('> [text-robot] Fetching done!')
  }
  async function sanitizeScript(content) {
    let script_object = {
      title: "",
      cenas: {}
    };

    const split_script = await content.script.split('\n');
    
    let lastscene = "";

    await split_script.forEach(script_line => {
      
      if (script_line.includes("Título")) {
        title = script_line.split('Título:')[1];
        script_object.title = title.replaceAll('"', '');
      }

      if (script_line.includes("Cena")) {
        lastscene = script_line.replaceAll(':', '').replaceAll(' ', '');
        script_object.cenas[lastscene] = {}
      }

      if (script_line.includes("Imagem") | script_line.includes("Descrição") ) {
        script_object.cenas[lastscene].figures = script_line.replaceAll('Imagem:', '').replaceAll('Descrição:', '').replaceAll('-  ', '').replaceAll('"', '').replaceAll('\\', '');
      }
      
      if (script_line.includes("Narração")) {
        script_object.cenas[lastscene].narracao = script_line.replaceAll('Narração:', '').replaceAll('-  ', '').replaceAll('"', '').replaceAll('\\', '');
      }
      
    });

    content.script_object = script_object
    state.save(content)
  }

}

module.exports = robot
