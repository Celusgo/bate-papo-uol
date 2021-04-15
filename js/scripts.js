let conversasServidor=[];

//Entrar na sala
const nomeUsuario = prompt("Escreva seu nome:");
const nomeEnviado = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants',{name: nomeUsuario});
nomeEnviado.then(sucessoLogin);
nomeEnviado.catch(nomeExistente);

function sucessoLogin(sucesso){
    const sucessoStatus = sucesso.status;
    console.log(sucessoStatus)
}

function nomeExistente(existente){
    while(existente.response.status === 400){
       nomeUsuario = prompt("Já há alguém com esse nome. Insira seu nome acompanhado do seu sobrenome."); 
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
const mensagensServidor = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages');
mensagensServidor.then(mensagensRecebidas);

const room = document.querySelector('.room');

function mensagensRecebidas(retorna){
    conversasServidor = retorna.data;
    for(let i=0; i < conversasServidor.length; i++){
        room.innerHTML +=`
        <div class="conversa">
            (${conversasServidor[i].time})
            ${conversasServidor[i].from} para ${conversasServidor[i].to}: ${conversasServidor[i].text}
        </div>
        `
    }
}
