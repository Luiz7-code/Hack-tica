/* ==========================================
   Gestão Saudável
   BANCO.JS
========================================== */

// Inicializa o banco de dados apenas uma vez

if (!localStorage.getItem("empresas")) {

    const empresas = [

        {

            nome: "Logicomp",

            area: "Tecnologia",

            icpr: 81,

            funcionarios: [

                {
                    nome: "Administrador",
                    usuario: "admin",
                    senha: "123",
                    tipo: "gestor",
                    setor: "RH",
                    pontos: []
                },

                {
                    nome: "João Silva",
                    usuario: "joao",
                    senha: "123",
                    tipo: "funcionario",
                    setor: "TI",
                    pontos: []
                },

                {
                    nome: "Maria Oliveira",
                    usuario: "maria",
                    senha: "123",
                    tipo: "funcionario",
                    setor: "RH",
                    pontos: []
                },

                {
                    nome: "Pedro Santos",
                    usuario: "pedro",
                    senha: "123",
                    tipo: "funcionario",
                    setor: "Financeiro",
                    pontos: []
                },

                {
                    nome: "Ana Costa",
                    usuario: "ana",
                    senha: "123",
                    tipo: "funcionario",
                    setor: "Marketing",
                    pontos: []
                },

                {
                    nome: "Lucas Almeida",
                    usuario: "lucas",
                    senha: "123",
                    tipo: "funcionario",
                    setor: "Produção",
                    pontos: []
                },

                {
                    nome: "Juliana Ferreira",
                    usuario: "juliana",
                    senha: "123",
                    tipo: "funcionario",
                    setor: "Comercial",
                    pontos: []
                }

            ]

        }

    ];

    localStorage.setItem(

        "empresas",

        JSON.stringify(empresas)

    );

}

/* ==========================================
   FUNÇÕES
========================================== */

function carregarEmpresas() {

    return JSON.parse(

        localStorage.getItem("empresas")

    ) || [];

}

function salvarEmpresas(empresas) {

    localStorage.setItem(

        "empresas",

        JSON.stringify(empresas)

    );

}

function salvarSessao(usuario, empresa) {

    localStorage.setItem(

        "usuarioLogado",

        JSON.stringify(usuario)

    );

    localStorage.setItem(

        "empresaAtual",

        empresa.nome

    );

}

function limparSessao() {

    localStorage.removeItem("usuarioLogado");

    localStorage.removeItem("empresaAtual");

}

function usuarioLogado() {

    return JSON.parse(

        localStorage.getItem("usuarioLogado")

    );

}

function empresaAtual() {

    const nome = localStorage.getItem("empresaAtual");

    const empresas = carregarEmpresas();

    return empresas.find(

        e => e.nome === nome

    );

}

/* ==========================================
   ICPO
========================================== */

function calcularICPO(empresa) {

    let soma = 0;

    let total = 0;

    empresa.funcionarios.forEach(f => {

        if (f.tipo !== "funcionario") return;

        total++;

        if (!f.pontos || f.pontos.length === 0) {

            soma += 80;

            return;

        }

        const ultimo = f.pontos[f.pontos.length - 1];

        switch (ultimo.humor) {

            case "disposto":
                soma += 100;
                break;

            case "neutro":
                soma += 50;
                break;

            case "sobrecarregado":
                soma += 20;
                break;

            default:
                soma += 80;

        }

    });

    if (total === 0) return 0;

    return Math.round(soma / total);

}

/* ==========================================
   UTILIDADES
========================================== */

function buscarUsuario(empresa, usuario, senha) {

    return empresa.funcionarios.find(f =>

        f.usuario === usuario &&

        f.senha === senha

    );

}

function salvarFuncionario(funcionario) {

    const empresas = carregarEmpresas();

    const nomeEmpresa = localStorage.getItem("empresaAtual");

    const empresa = empresas.find(

        e => e.nome === nomeEmpresa

    );

    if (!empresa) return;

    const indice = empresa.funcionarios.findIndex(

        f => f.usuario === funcionario.usuario

    );

    if (indice >= 0) {

        empresa.funcionarios[indice] = funcionario;

    }

    salvarEmpresas(empresas);

}