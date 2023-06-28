const privateKey = "8c509daf27f714ba14feb113764582980a708647";
const publicKey = "20ea9778a1425ce9471bde5e5c8dcfc6";





function createHash(timeStamp) {

    const toBeHashed = timeStamp + privateKey + publicKey;
    const hashedMessage = md5(toBeHashed);
    return hashedMessage;

}

function getCharacterList() {
    const min = 1; // Valor mínimo do intervalo
    const max = 10; // Valor máximo do intervalo
    //tempo agora
    const timeStamp = Date.now().toString();
    //numero do herois
    const offset = Math.floor(Math.random() * (max - min + 1));
    
    //hash para validar a requisição
    const hash = createHash(timeStamp);
    
    const urlAPI = "http://gateway.marvel.com/v1/public/characters?limit=9&offset="+offset+"&ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash;

    // Criação de um objeto XMLHttpRequest para fazer requisições assíncronas
var xhttp = new XMLHttpRequest();

// Função que será executada quando o estado da requisição mudar
xhttp.onreadystatechange = function() {
  // Verifica se a requisição foi concluída e a resposta está pronta
  if (this.readyState == 4 && this.status == 200) {
    // Converte a resposta de texto em um objeto JSON
    var data = JSON.parse(this.responseText);
    // Chama a função getHistorys passando o objeto de dados como parâmetro
    getHistorys(data);
  }
};
    xhttp.open("GET", urlAPI, true);
    xhttp.send();
}


function showHistorys(elemento) {

    const codigo = elemento.parentNode.getElementsByTagName("h5")[1].textContent.substring(4, 11);//codigo do personagem
    console.log(codigo);
    const timeStamp = Date.now().toString();//tempo agora
    const hash = createHash(timeStamp);//hash para validar a requisição

    const urlAPI = "https://gateway.marvel.com:443/v1/public/characters/"+codigo+"/stories?ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash;
    console.log(urlAPI);
    
    // Criação de um objeto XMLHttpRequest para fazer requisições assíncronas
var xhttp = new XMLHttpRequest();

// Função que será executada quando o estado da requisição mudar
xhttp.onreadystatechange = function() {
  // Verifica se a requisição foi concluída e a resposta está pronta
  if (this.readyState == 4 && this.status == 200) {
    // Converte a resposta de texto em um objeto JSON
    var data = JSON.parse(this.responseText);
    // Chama a função getHistorys passando o objeto de dados como parâmetro
    getHistorys(data);
  }
};
    xhttp.open("GET", urlAPI, true);
    xhttp.send();

}
