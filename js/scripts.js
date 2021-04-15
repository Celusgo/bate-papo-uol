let conversasServidor=[];
let nomeUsuario;

//Entrar na sala
function perguntaNome(){
    nomeUsuario = prompt("Escreva seu nome:");
}
perguntaNome();

const nomeEnviado = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants',{name: nomeUsuario});
nomeEnviado.then(sucessoLogin);
nomeEnviado.catch(nomeExistente);

function sucessoLogin(sucesso){
    const sucessoStatus = sucesso.status;
    console.log(sucessoStatus)
}

function nomeExistente(existente){
    if(existente.response.status === 400){
       perguntaNome();       
    }
}
//

//Se manter na sala
function statusUsuario(){
    axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status',{name: nomeUsuario});
}
setInterval(statusUsuario, 5000);
//

//Carregar mensagens da sala
function carregarMensagens(){
    const mensagensServidor = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages');
    mensagensServidor.then(mensagensRecebidas);

const room = document.querySelector('.room');

function mensagensRecebidas(retorna){
    conversasServidor = retorna.data;
    room.innerHTML="";
    for(let i=0; i < conversasServidor.length; i++){
        if(conversasServidor[i].type == "message"){
            room.innerHTML +=`
        <div class="conversa">
            <p><span class='message-time'>(${conversasServidor[i].time})</span>
            <span class='username'>${conversasServidor[i].from}</span> <span class='user-message'>para</span> <span class='username'>${conversasServidor[i].to}</span>: <span class='user-message'>${conversasServidor[i].text}</span></p>
        </div>
        `
        }
        else if(conversasServidor[i].type == "status"){
            room.innerHTML +=`
        <div class="status">
            <p><span class='message-time'>(${conversasServidor[i].time})</span>
            <span class='username'>${conversasServidor[i].from}</span> <span class='user-message'>${conversasServidor[i].text}</span></p>
        </div>
        `
        }
        document.body.scrollTop = document.body.scrollHeight;
        document.documentElement.scrollTop = document.documentElement.scrollHeight;       
    }
}
}
setInterval(carregarMensagens, 3000);
