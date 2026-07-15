/* ==========================================
   FUNCIONARIO.JS
========================================== */

/* ========= VERIFICA LOGIN ========= */

const funcionario = usuarioLogado();
const empresa = empresaAtual();

if (!funcionario || funcionario.tipo !== "funcionario") {

    window.location.href = "index.html";

}

/* ========= NOME ========= */

const nomeFuncionario = document.getElementById("nomeFuncionario");

if (nomeFuncionario) {

    nomeFuncionario.innerHTML = funcionario.nome;

}

/* ========= LOGOUT ========= */

const btnLogout = document.getElementById("logoutFuncionario");

if (btnLogout) {

    btnLogout.onclick = () => {

        limparSessao();

        window.location.href = "index.html";

    };

}

/* ========= ETAPAS ========= */

const etapas = [

    "Entrada",

    "Saída para almoço",

    "Volta do almoço",

    "Saída"

];

const ids = [

    "statusEntrada",

    "statusSaidaAlmoco",

    "statusVoltaAlmoco",

    "statusSaida"

];

let etapaAtual = funcionario.pontos.length;

let humorSelecionado = "";

/* ========= HUMOR ========= */

const humores = document.querySelectorAll(".humor");

humores.forEach(card=>{

    card.onclick=()=>{

        humores.forEach(h=>{

            h.classList.remove("ativo");

        });

        card.classList.add("ativo");

        humorSelecionado=card.dataset.humor;

    };

});

/* ========= ATUALIZA TABELA ========= */

function atualizarTabela(){

    ids.forEach(id=>{

        const td=document.getElementById(id);

        if(td){

            td.innerHTML="⏳ Pendente";

        }

    });

    funcionario.pontos.forEach((registro,index)=>{

        const td=document.getElementById(ids[index]);

        if(td){

            td.innerHTML="✔ "+registro.hora;

        }

    });

}

atualizarTabela();

/* ========= RESTAURA ETAPA ========= */

const titulo = document.getElementById("tituloRegistro");

const botao = document.getElementById("registrarPonto");

if(etapaAtual>=etapas.length){

    titulo.innerHTML="Jornada concluída";

    botao.innerHTML="Todos os registros concluídos";

    botao.disabled=true;

}else{

    titulo.innerHTML=etapas[etapaAtual];

    botao.innerHTML="Registrar "+etapas[etapaAtual];

}

/* ========= REGISTRAR ========= */

botao.onclick=()=>{

    if(humorSelecionado==""){

        alert("Selecione uma emoção.");

        return;

    }

    const agora=new Date();

    const hora=agora.toLocaleTimeString("pt-BR",{

        hour:"2-digit",

        minute:"2-digit"

    });

    funcionario.pontos.push({

        etapa:etapas[etapaAtual],

        humor:humorSelecionado,

        hora:hora

    });

    salvarFuncionario(funcionario);

    document.getElementById("mensagemSucesso").style.display="block";

    document.getElementById("textoSucesso").innerHTML=

    etapas[etapaAtual]

    +

    " registrada às "

    +

    hora;

    atualizarTabela();

    etapaAtual++;

    humores.forEach(h=>{

        h.classList.remove("ativo");

    });

    humorSelecionado="";

    if(etapaAtual>=etapas.length){

        titulo.innerHTML="Jornada concluída";

        botao.innerHTML="Todos os registros concluídos";

        botao.disabled=true;

        return;

    }

    titulo.innerHTML=etapas[etapaAtual];

    botao.innerHTML="Registrar "+etapas[etapaAtual];

};

/* ========= INÍCIO ========= */

console.log("Funcionário carregado.");