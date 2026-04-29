const fs = require("fs");

// Ler o arquivo JSON
function lerTimes() {
  const dados = fs.readFileSync("times.json", "utf-8");
  return JSON.parse(dados);
}

//  Listar nome de todos os times
function listarTimes() {
  const times = lerTimes();
  times.forEach(t => console.log(t.nome));
}

// Times que começam com S (nome oficial)
function timesComS() {
  const times = lerTimes();
  times
    .filter(t => t.detalhes.nome_oficial.startsWith("S"))
    .forEach(t => console.log(t.detalhes.nome_oficial));
}

// Estádios ordenados por tamanho do nome
function estadiosOrdenados() {
  const times = lerTimes();

  const estadios = times.map(t => t.detalhes.estadio.nome);

  estadios
    .sort((a, b) => a.length - b.length)
    .forEach(e => console.log(e));
}

// Estádios de SP (nome, capacidade e cidade)
function estadiosSP() {
  const times = lerTimes();

  times
    .filter(t => t.detalhes.localizacao.estado === "SP")
    .forEach(t => {
      console.log(
        `${t.detalhes.estadio.nome} - ${t.detalhes.estadio.capacidade} - ${t.detalhes.localizacao.cidade}`
      );
    });
}

//Times do RS com mais de 7 letras
function timesRS() {
  const times = lerTimes();

  times
    .filter(
      t =>
        t.detalhes.localizacao.estado === "RS" &&
        t.nome.length > 7
    )
    .forEach(t => console.log(t.nome));
}

//  Nome do time + quantidade de títulos
function titulosPorTime() {
  const times = lerTimes();

  times.forEach(t => {
    const total = t.historico.principais_titulos.reduce(
      (soma, titulo) => soma + titulo.quantidade,
      0
    );

    console.log(`${t.nome} - ${total} títulos`);
  });
}

// Times com estádio > 50.000 capacidade
function grandesEstadios() {
  const times = lerTimes();

  times.filter(t => t.detalhes.estadio.capacidade > 50000).forEach(t => {
      console.log(
        `${t.nome} - ${t.detalhes.estadio.nome} - ${t.mascote}`
      );
    });
}

// Times e ídolos em ordem alfabética
function idolosOrdenados() {
  const times = lerTimes();

  times.forEach(t => {
    const idolos = t.historico.maiores_idolos.sort();
    console.log(`${t.nome}: ${idolos.join(", ")}`);
  });
}

// Quantidade de times por estado
function timesPorEstado() {
  const times = lerTimes();

  const contagem = {};

  times.forEach(t => {
    const estado = t.detalhes.localizacao.estado;

    if (!contagem[estado]) {
      contagem[estado] = 0;
    }

    contagem[estado]++;
  });

  console.log(contagem);
}

 listarTimes();
// timesComS();
// estadiosOrdenados();
// estadiosSP();
// timesRS();
// titulosPorTime();
// grandesEstadios();
// idolosOrdenados();
// timesPorEstado();