function getPrompt(type, time, theme) {
    return `Quero que você atue como um roteirista. 
    Seu público são pessoas de 18 a 80 anos. Elas vão ver o seu roteiro no youtube e facebook.
    Você irá criar um roteiro atraente, cativante e criativo para um vídeo com o estilo de vídeos sobre ${type}.
    A duração do vídeo deve ser ${time}.
    Você deve responder com o roteiro e mais nada. Excluir da resposta qualquer nota, explicação ou marcações. 
    Vou te passar o tema e você deve criar no mínimo 10 cenas, cada cena deve conter uma lista de figuras com descrição detalhada de cada imagem como se fosse uma descrição para cegos,
    a lista de figuras quando tiver mais de uma deve ser separada por # e não por virgula,
    bem como uma narração cativante que contenha ao menos 4 linhas.
    Você deve remover qualquer marcação ou descrição sobre o narrador.
    Deve possuir um título.
    O tema é ${theme}.`
}

module.exports = {
    getPrompt
  }