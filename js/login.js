/* ==========================================
   LOGIN.JS
========================================== */

const btnLogin = document.getElementById("btnLogin");

if(btnLogin){

btnLogin.onclick=()=>{

    const nomeEmpresa=document.getElementById("empresa").value.trim();

    const usuario=document.getElementById("usuario").value.trim();

    const senha=document.getElementById("senha").value;

    const empresas=carregarEmpresas();

    const empresa=empresas.find(

        e=>e.nome.toLowerCase()==nomeEmpresa.toLowerCase()

    );

    if(!empresa){

        alert("Empresa não encontrada.");

        return;

    }

    const funcionario=buscarUsuario(

        empresa,

        usuario,

        senha

    );

    if(!funcionario){

        alert("Usuário ou senha incorretos.");

        return;

    }

    salvarSessao(

        funcionario,

        empresa

    );

    if(funcionario.tipo=="gestor"){

        window.location.href="gestor.html";

    }else{

        window.location.href="funcionario.html";

    }

};

}

/* ==========================================
   MOSTRAR SENHA
========================================== */

const mostrarSenha=document.getElementById("mostrarSenha");

if(mostrarSenha){

mostrarSenha.onclick=()=>{

    const campo=document.getElementById("senha");

    if(campo.type=="password"){

        campo.type="text";

        mostrarSenha.innerHTML='<i class="fa-solid fa-eye-slash"></i>';

    }else{

        campo.type="password";

        mostrarSenha.innerHTML='<i class="fa-solid fa-eye"></i>';

    }

};

}

/* ==========================================
   CADASTRAR EMPRESA
========================================== */

const btnCadastro=document.getElementById("btnCadastro");

if(btnCadastro){

btnCadastro.onclick=()=>{

    window.location.href="cadastro.html";

};

}

/* ==========================================
   LIMPAR SESSÃO
========================================== */

limparSessao();