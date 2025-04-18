// -----------------------------------------
// VARIÁVEIS GLOBAIS
// -----------------------------------------
let nome = "", ra = 0, idade = 0, sexo = "", media = 0, resultado = "";
let arrayObj = [];

// -----------------------------------------
// REFERÊNCIAS DE ELEMENTOS
// -----------------------------------------
const infos = document.getElementById('infos');
const saida = document.getElementById('saidaInfos');
const fecharBtn = document.getElementById('fechar-btn');

// -----------------------------------------
// FUNÇÕES DE CADASTRO E VALIDAÇÃO
// -----------------------------------------

// Função para cadastrar um aluno
function cadastrar() {
    // Referências de elementos
    const inputNome = document.getElementById("nome");
    const inputRA = document.getElementById("ra");
    const inputIdade = document.getElementById("idade");
    const inputSexo = document.getElementById("sexo");
    const inputMedia = document.getElementById("media");
    const inputResultado = document.getElementById("resultado");

    // Obtem os valores dos inputs
    nome = inputNome.value.trim();
    ra = Number(inputRA.value.trim());
    idade = Number(inputIdade.value.trim());
    sexo = inputSexo.value.trim();
    media = inputMedia.value.trim();
    resultado = inputResultado.value.trim();

    // Limpa mensagens de erro e a marcação nas bordas
    mensagemErro.innerHTML = '';
    limparBordasErro();

    // Valida os dados do formulário
    if (nome === '') {
        mostrarErro("Preencha o campo do Nome!", inputNome);
        return;
    }
    if (isNaN(ra) || ra <= 0) {
        mostrarErro("Preencha o RA corretamente! (maior que 0)", inputRA);
        return;
    }
    if (isNaN(idade) || idade <= 0) {
        mostrarErro("Preencha a Idade corretamente! (maior que 0)", inputIdade);
        return;
    }
    if (sexo === '') {
        mostrarErro("Selecione o Sexo!", inputSexo);
        return;
    }
    if (media === '' || Number(media) < 0 || Number(media) > 10) {
        mostrarErro("Preencha a Média corretamente! (entre 0 e 10)", inputMedia);
        return;
    }
    if (resultado === '') {
        mostrarErro("Selecione o Resultado!", inputResultado);
        return;
    }

    // Criação de um objeto com os dados
    let novoObjeto = {
        nome: nome,
        ra: ra,
        idade: idade,
        sexo: sexo,
        media: Number(media),
        resultado: resultado
    };

    // Adiciona o novo aluno ao array de objetos
    arrayObj.push(novoObjeto);
    
    // Limpa todos os campos do formulário
    document.querySelectorAll('.input').forEach(input => input.value = '');

    // Mensagem de sucesso no cadastro
    let msg = ""
    arrayObj.forEach((item, index) => {
        msg = `<p><strong>Aluno "${nome}" Cadastrado com Sucesso!!</strong></p>`
    });

    // Mostra a mensagem de sucesso na tela
    mostrarInfos(msg);
}

// -----------------------------------------
// FUNÇÕES DE ORDENAÇÃO E FILTRAGEM
// -----------------------------------------

// Função de ordenação genérica usando o quickSort)
function ordenacao(vetor, chave, crescente=true) {
    quickSort(vetor, (elem1, elem2) => {
        const valor1 = elem1[chave];
        const valor2 = elem2[chave];
        console.log('Tipo de valor1:', typeof(valor1)); 
        console.log('Tipo de valor2:', typeof(valor2));

        // Verifica se é comparação de strings
        if (typeof valor1 === 'string' && typeof valor2 === 'string') {
            if (crescente) return valor2.localeCompare(valor1) <= 0;
            else return valor1.localeCompare(valor2) <= 0;
        } else {
            if (crescente) return valor1 > valor2;
            else return valor1 < valor2;
        }
    });
    return vetor;
}

// Função para ordenar por nome em ordem crescente e mostrar na tela
function ordenacaoNome() {
    let ordenadoNome = ordenacao(arrayObj, 'nome', true);
    mostrarArray("Relatório de Alunos em ordem crescente por Nome:", ordenadoNome);
}

// Função para ordenar por RA em ordem decrescente e mostrar na tela
function ordenacaoRA() {
    let ordenadoRA = ordenacao(arrayObj, 'ra', false);
    mostrarArray("Relatório de Alunos em ordem decrescente por RA:", ordenadoRA);
}

// Função de busca sequencial, filtra com base em uma função de comparação
function buscaSequencial(vetor, fnComp) {
    const resultado = [];
    for (let i = 0; i < vetor.length; i++) {
        if (fnComp(vetor[i])) resultado.push(vetor[i]);
    }
    return resultado;
}

// Função para comparar alunos aprovados
function compararAprovados(obj) {
    return obj.resultado.toLowerCase() === "aprovado";
}

// Função para ordenar por nome (crescente) e exibir apenas alunos aprovados
function ordenacaoAprovadosNome() {
    let ordenadoNome = ordenacao(arrayObj, 'nome', true);
    let ordenadoNomesAprovados = buscaSequencial(ordenadoNome, compararAprovados);
    mostrarArray("Relatório de Alunos em ordem crescente por Nome, apenas dos Aprovados:", ordenadoNomesAprovados);
}

// -----------------------------------------
// FUNÇÕES DE ORDENAÇÃO (ALGORITMO QUICKSORT)
// -----------------------------------------

// Função de ordenação quickSort
function quickSort(vetor, fnComp, ini = 0, fim = vetor.length - 1) {
    if (fim <= ini) return

    const pivot = fim
    let div = ini - 1

    for (let i = ini; i < fim; i++) {
        if (fnComp(vetor[pivot], vetor[i])) {
            div++
            if (div !== i) {
                [vetor[div], vetor[i]] = [vetor[i], vetor[div]]
            }
        }
    }

    div++

    if (fnComp(vetor[div], vetor[pivot]) && div !== pivot) {
        [vetor[div], vetor[pivot]] = [vetor[pivot], vetor[div]]
    }

    quickSort(vetor, fnComp, ini, div - 1)
    quickSort(vetor, fnComp, div + 1, fim)
}

// -----------------------------------------
// FUNÇÕES DE EXIBIÇÃO E INTERAÇÃO
// -----------------------------------------

// Função para exibir o array formatado
function mostrarArray(texto, array) {
    let conteudo = `<strong>${texto}</strong><br>`;

    // Verifica se o array está vazio
    if (array.length === 0) {
        conteudo += "<p>Nenhum dado encontrado.</p>";
    } else {
        array.forEach((item, index) => {
            conteudo += `
                <p><strong>Aluno ${index + 1}</strong></p>
                <p>Nome: ${item.nome}</p>
                <p>RA: ${item.ra}</p>
                <p>Idade: ${item.idade}</p>
                <p>Sexo: ${item.sexo}</p>
                <p>Média: ${item.media}</p>
                <p>Resultado: ${item.resultado}</p>
                <hr>
            `;
        });
    }

    // Mostra o array formatado na tela
    mostrarInfos(conteudo);
}

// Função para mostrar informações na tela
function mostrarInfos(texto = "Infos:") {
    saida.innerHTML = texto;
    infos.style.display = 'block';
    fecharBtn.style.display = 'inline';

}

// Função para fechar a exibição das informações
function fecharInfos() {
    infos.style.display = 'none';
    saida.innerText = 'none';
    fecharBtn.style.display = 'none';
}

// Função para exibir mensagens de erro e destacar campos inválidos
function mostrarErro(mensagem, input) {
    let mensagemErro = document.getElementById('mensagemErro');
    mensagemErro.innerHTML = mensagem;
    input.style.border = '2px solid darkred';
}

// Função para limpar bordas dos campos
function limparBordasErro() {
    let inputs = document.querySelectorAll('.input');
    inputs.forEach(input => {
        input.style.border = '';
    });
}