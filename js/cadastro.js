/* ==========================================
   CADASTRO.JS
========================================== */

const btnCriarEmpresa = document.getElementById("btnCriarEmpresa");

if(btnCriarEmpresa){

btnCriarEmpresa.onclick=()=>{

    const nomeEmpresa=document.getElementById("empresaNome").value.trim();

    const area=document.getElementById("empresaArea").value;

    const nomeGestor=document.getElementById("gestorNome").value.trim();

    const usuario=document.getElementById("gestorUsuario").value.trim();

    const senha=document.getElementById("gestorSenha").value;

    const confirmar=document.getElementById("confirmarSenha").value;

    if(

        nomeEmpresa=="" ||

        nomeGestor=="" ||

        usuario=="" ||

        senha==""

    ){

        alert("Preencha todos os campos.");

        return;

    }

    if(senha!=confirmar){

        alert("As senhas não coincidem.");

        return;

    }

    const empresas=carregarEmpresas();

    const existe=empresas.find(

        e=>e.nome.toLowerCase()==nomeEmpresa.toLowerCase()

    );

    if(existe){

        alert("Essa empresa já está cadastrada.");

        return;

    }

    empresas.push({

        nome:nomeEmpresa,

        area:area,

        icpr:80,

        funcionarios:[

            {

                nome:nomeGestor,

                usuario:usuario,

                senha:senha,

                tipo:"gestor",

                setor:"Administração",

                pontos:[]

            }

        ]

    });

    salvarEmpresas(empresas);

    alert("Empresa cadastrada com sucesso!");

    window.location.href="login.html";

};

}

/* ==========================================
   BOTÃO VOLTAR
========================================== */

const btnVoltar=document.getElementById("btnVoltar");

if(btnVoltar){

btnVoltar.onclick=()=>{

    window.location.href="login.html";

};

}