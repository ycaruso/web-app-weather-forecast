const formatarTextoCamelCase = texto => {
    texto = texto.toLowerCase();
    let palavras = texto.split(' ');
    texto = '';

    palavras.forEach((palavra, i) => {
        palavra = palavra.charAt(0).toUpperCase() + palavra.slice(1);
        i === palavras.length - 1 ? (texto += palavra) : (texto += palavra + ' ');
    });
    return texto;
};

export default formatarTextoCamelCase;