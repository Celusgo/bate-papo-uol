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
