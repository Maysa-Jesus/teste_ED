let nome = "", ra = 0, idade = 0, sexo = "", media = 0, resultado = ""
let arrayObj = []
const infos = document.getElementById('infos');
const saida = document.getElementById('saidaInfos');
const fecharBtn = document.getElementById('fechar-btn');

function cadastrar() {

    nome = document.getElementById("nome").value;
    ra = Number(document.getElementById("ra").value);
    idade = Number(document.getElementById("idade").value);
    sexo = document.getElementById("sexo").value;
    media = Number(document.getElementById("media").value);
    resultado = document.getElementById("resultado").value;

    let novoObjeto = {
        nome: nome,
        ra: ra,
        idade: idade,
        sexo: sexo,
        media: media,
        resultado: resultado
    };

    arrayObj.push(novoObjeto);

    document.getElementById('nome').value = '';
    document.getElementById('ra').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('sexo').value = '';
    document.getElementById('media').value = '';
    document.getElementById('resultado').value = '';

    let msg = ""
    arrayObj.forEach((item, index) => {
        msg += `<p><strong>Aluno ${index + 1} Cadastrado com Sucesso!!</strong></p>`
    });

    mostrarInfos(msg);

}

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

function ordenacaoNome() {
    quickSort(arrayObj,
        (elem1, elem2) => elem1.nome > elem2.nome)
    
    mostrarArray("Relatório de Alunos em ordem crescente por Nome:", arrayObj)
}

function ordenacaoRA(){
    quickSort(arrayObj,
        (elem1, elem2) => elem1.ra < elem2.ra)
    
    mostrarArray("Relatório de Alunos em ordem decrescente por RA:", arrayObj)
}


function ordenacaoAprovadosNome() {

    quickSort(arrayObj,
        (elem1, elem2) => elem1.nome > elem2.nome)

    const aprovados = [];

    function buscaSequencial(vetor, fnComp) {
        for (let i = 0; i < vetor.length; i++) {
            if (fnComp(vetor[i])) aprovados.push(vetor[i]);
        }
    }
    function comparaNome(obj) {
        return obj.resultado.toLowerCase() === "aprovado";
    }

    buscaSequencial(arrayObj, comparaNome)
    mostrarArray("Relatório de Alunos em ordem crescente por Nome, apenas dos Aprovados:", aprovados);
}

function mostrar() {
    mostrarArray("Cadastros", arrayObj);
}

function mostrarArray(texto, array) {
    let conteudo = `<strong>${texto}</strong><br>`;

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

    mostrarInfos(conteudo);
}

function mostrarInfos(texto = "Infos:") {
    saida.innerHTML = texto;
    infos.style.display = 'block';
    fecharBtn.style.display = 'inline';

}

function fecharInfos() {
    infos.style.display = 'none';
    saida.innerText = 'none';
    fecharBtn.style.display = 'none';
}
