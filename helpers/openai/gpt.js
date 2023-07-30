const axios = require('axios');

const openaiApiKey = require('../../credentials/openai.json').apikey
const openaiApiUrl = require('../../credentials/openai.json').apiurl

const roteiro = require('../../templates/chatgpt/roteiro_gpt35.js')

function ask(prefix, duration, searchTheme) {
    console.log('> [chatgpt-robot] Asking...')
    const prompt = roteiro.getPrompt(prefix, duration, searchTheme);
    
    const headers = {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
    };

    const data = {
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: prompt
            }
        ]
    };

    return axios.post(openaiApiUrl, data, { headers: headers })
        .then(response => {
            console.log('> [chatgpt-robot] Done...')
            return response.data.choices[0].message.content;
        })
        .catch(error => {
            console.error(error);
        });

}

module.exports = {
    ask
}