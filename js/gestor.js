/* ==========================================
   GESTOR.JS
   PARTE 1
========================================== */

/* ========= VERIFICA LOGIN ========= */

const gestor = usuarioLogado();
const empresa = empresaAtual();

if (!gestor || gestor.tipo !== "gestor") {

    window.location.href = "login.html";

}

/* ========= LOGOUT ========= */

const btnLogout = document.getElementById("logout");

if (btnLogout) {

    btnLogout.onclick = () => {

        limparSessao();

        window.location.href = "login.html";

    };

}

/* ========= NOME ========= */

const nomeGestor = document.getElementById("nomeGestor");

if (nomeGestor) {

    nomeGestor.innerHTML = gestor.nome;

}

/* ========= ÚLTIMO ACESSO ========= */

const ultimo = document.getElementById("ultimoAcesso");

if (ultimo) {

    const agora = new Date();

    ultimo.innerHTML =

        agora.toLocaleDateString("pt-BR")

        +

        " às "

        +

        agora.toLocaleTimeString("pt-BR", {

            hour: "2-digit",

            minute: "2-digit"

        });

}

/* ========= MENU LATERAL ========= */

const botoes = document.querySelectorAll(".menu");

const paginas = document.querySelectorAll(".pagina");

botoes.forEach(botao => {

    botao.onclick = () => {

        botoes.forEach(b =>

            b.classList.remove("ativo")

        );

        paginas.forEach(p =>

            p.classList.remove("ativa")

        );

        botao.classList.add("ativo");

        const tela = document.getElementById(

            botao.dataset.tela

        );

        if (tela) {

            tela.classList.add("ativa");

        }

    };

});

/* ========= DASHBOARD ========= */

function atualizarDashboard() {

    document.getElementById("icpo").innerHTML =

        calcularICPO(empresa);

    document.getElementById("icpr").innerHTML =

        empresa.icpr;

    const funcionarios = empresa.funcionarios.filter(

        f => f.tipo == "funcionario"

    );

    document.getElementById("qtdFuncionarios").innerHTML =

        funcionarios.length;

    let registros = 0;

    funcionarios.forEach(f => {

        if (f.pontos) {

            registros += f.pontos.length;

        }

    });

    document.getElementById("registrosHoje").innerHTML =

        registros;

}

atualizarDashboard();
/* ==========================================
   GESTOR.JS
   PARTE 2
========================================== */

/* ========= CADASTRAR FUNCIONÁRIO ========= */

const btnCadastrarFuncionario =
document.getElementById("btnCadastrarFuncionario");

if(btnCadastrarFuncionario){

btnCadastrarFuncionario.onclick=()=>{

const nome=
document.getElementById("novoNome").value.trim();

const usuario=
document.getElementById("novoUsuario").value.trim();

const senha=
document.getElementById("novaSenha").value;

const setor=
document.getElementById("novoSetor").value.trim();

const tipo=
document.getElementById("novoTipo").value.toLowerCase();

if(nome==""||usuario==""||senha==""){

alert("Preencha todos os campos.");

return;

}

const empresas=carregarEmpresas();

const indiceEmpresa=empresas.findIndex(

e=>e.nome===empresa.nome

);

const existe=

empresas[indiceEmpresa].funcionarios.find(

f=>f.usuario===usuario

);

if(existe){

alert("Já existe um usuário com esse login.");

return;

}

empresas[indiceEmpresa].funcionarios.push({

nome:nome,

usuario:usuario,

senha:senha,

tipo:tipo,

setor:setor,

pontos:[]

});

salvarEmpresas(empresas);

alert("Funcionário cadastrado com sucesso!");

location.reload();

};

}

/* ========= TABELA ========= */

function carregarTabela(){

const tabela=

document.getElementById("tabelaFuncionarios");

if(!tabela)return;

tabela.innerHTML="";

empresa.funcionarios.forEach(f=>{

if(f.tipo!="funcionario")return;

let status="🟢 Saudável";

let icpi=80;

if(f.pontos && f.pontos.length){

const ultimo=

f.pontos[f.pontos.length-1];

switch(ultimo.humor){

case"disposto":

status="🟢 Saudável";

icpi=100;

break;

case"neutro":

status="🟡 Atenção";

icpi=50;

break;

case"sobrecarregado":

status="🔴 Crítico";

icpi=20;

break;

}

}

tabela.innerHTML+=`

<tr>

<td>${f.nome}</td>

<td>${f.setor}</td>

<td>${status}</td>

<td>${icpi}</td>

</tr>

`;

});

}

carregarTabela();

/* ========= DADOS DA EMPRESA ========= */

const empresaInfo=document.querySelector(".empresaGrid");

if(empresaInfo){

empresaInfo.innerHTML=`

<div>

<strong>Empresa</strong>

<p>${empresa.nome}</p>

</div>

<div>

<strong>Área</strong>

<p>${empresa.area}</p>

</div>

<div>

<strong>Funcionários</strong>

<p>${empresa.funcionarios.filter(f=>f.tipo=="funcionario").length}</p>

</div>

<div>

<strong>Gestores</strong>

<p>${empresa.funcionarios.filter(f=>f.tipo=="gestor").length}</p>

</div>

<div>

<strong>ICPO Atual</strong>

<p>${calcularICPO(empresa)}</p>

</div>

<div>

<strong>ICPR</strong>

<p>${empresa.icpr}</p>

</div>

`;

}
/* ==========================================
   GESTOR.JS
   PARTE 3
========================================== */

/* ========= STATUS DA EMPRESA ========= */

function atualizarStatusEmpresa(){

    const statusIcone=document.querySelector(".statusIcone");

    const titulo=document.querySelector(".statusEmpresa h2");

    const texto=document.querySelector(".statusEmpresa p");

    if(!statusIcone) return;

    const icpo=calcularICPO(empresa);

    if(icpo>=empresa.icpr){

        statusIcone.innerHTML="🟢";

        titulo.innerHTML="Saúde Psicossocial Boa";

        texto.innerHTML="Empresa acima do índice de referência.";

    }

    else if(icpo>=60){

        statusIcone.innerHTML="🟡";

        titulo.innerHTML="Situação de Atenção";

        texto.innerHTML="Alguns colaboradores precisam de acompanhamento.";

    }

    else{

        statusIcone.innerHTML="🔴";

        titulo.innerHTML="Situação Crítica";

        texto.innerHTML="É recomendada a implantação de ações de bem-estar.";

    }

}

atualizarStatusEmpresa();

/* ========= RECOMENDAÇÕES ========= */

function atualizarRecomendacoes(){

    const lista=document.querySelector(".listaRecomendacoes");

    if(!lista) return;

    lista.innerHTML="";

    const icpo=calcularICPO(empresa);

    if(icpo>=empresa.icpr){

        lista.innerHTML+=`

        <div class="recomendacao">

        ✔ Manter as ações de segurança psicológica.

        </div>

        `;

        lista.innerHTML+=`

        <div class="recomendacao">

        ✔ Continuar monitorando os indicadores.

        </div>

        `;

    }

    else{

        lista.innerHTML+=`

        <div class="recomendacao">

        ⚠ Implantar Projeto de Bem-Estar.

        </div>

        `;

        lista.innerHTML+=`

        <div class="recomendacao">

        ✔ Disponibilizar rede de psicólogos.

        </div>

        `;

        lista.innerHTML+=`

        <div class="recomendacao">

        ✔ Criar canal de denúncias.

        </div>

        `;

        lista.innerHTML+=`

        <div class="recomendacao">

        ✔ Promover rodas de conversa.

        </div>

        `;

        lista.innerHTML+=`

        <div class="recomendacao">

        ✔ Reavaliar os indicadores na próxima semana.

        </div>

        `;

    }

}

atualizarRecomendacoes();

/* ========= GRÁFICO ========= */

const canvas=document.getElementById("graficoICPO");

if(canvas){

const icpo=calcularICPO(empresa);

new Chart(canvas,{

type:"line",

data:{

labels:[

"Seg",

"Ter",

"Qua",

"Qui",

"Sex",

"Sáb",

"Hoje"

],

datasets:[{

label:"ICPO",

data:[

73,

76,

79,

81,

80,

83,

icpo

],

borderColor:"#2E7D32",

backgroundColor:"rgba(46,125,50,.12)",

fill:true,

borderWidth:4,

tension:.45,

pointRadius:5,

pointHoverRadius:8,

pointBackgroundColor:"#2E7D32"

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

plugins:{

legend:{

display:false

}

},

scales:{

x:{

grid:{

display:false

}

},

y:{

min:0,

max:100,

ticks:{

stepSize:20

}

}

}

}

});

}
/* ==========================================
   GESTOR.JS
   PARTE 4
========================================== */

/* ========= ATUALIZAÇÃO AUTOMÁTICA ========= */

function atualizarTudo(){

    carregarTabela();

    atualizarDashboard();

    atualizarStatusEmpresa();

    atualizarRecomendacoes();

}

/* Atualiza a cada 5 segundos */

setInterval(()=>{

    atualizarTudo();

},5000);

/* ========= RELÓGIO ========= */

function atualizarRelogio(){

    const campo=document.getElementById("ultimoAcesso");

    if(!campo) return;

    const agora=new Date();

    campo.innerHTML=

    agora.toLocaleDateString("pt-BR")

    +

    " às "

    +

    agora.toLocaleTimeString("pt-BR",{

        hour:"2-digit",

        minute:"2-digit",

        second:"2-digit"

    });

}

setInterval(atualizarRelogio,1000);

/* ========= LIMPAR FORMULÁRIO ========= */

function limparFormulario(){

    const ids=[

        "novoNome",

        "novoUsuario",

        "novaSenha",

        "novoSetor"

    ];

    ids.forEach(id=>{

        const campo=document.getElementById(id);

        if(campo){

            campo.value="";

        }

    });

    const tipo=document.getElementById("novoTipo");

    if(tipo){

        tipo.selectedIndex=0;

    }

}

/* ========= BOTÃO CADASTRAR ========= */

const btnCad=document.getElementById("btnCadastrarFuncionario");

if(btnCad){

    btnCad.addEventListener("click",()=>{

        setTimeout(()=>{

            limparFormulario();

            atualizarTudo();

        },300);

    });

}

/* ========= ATALHOS ========= */

document.addEventListener("keydown",(e)=>{

    if(e.key==="F5"){

        atualizarTudo();

    }

});

/* ========= INICIALIZA ========= */

window.onload=()=>{

    atualizarDashboard();

    carregarTabela();

    atualizarStatusEmpresa();

    atualizarRecomendacoes();

    atualizarRelogio();

}

console.log("Gestor carregado com sucesso.");