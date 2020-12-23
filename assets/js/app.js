const BASE_URL = "http://localhost:1337";

async function carregarDados(colecao) {
  const resposta = await fetch(BASE_URL + colecao);
  const dados = await resposta.json();
  return dados;
}

async function buscarSapatos() {
  const sapatos = carregarDados("/calcados");
  return sapatos;
}

async function buscarSpatosPorCategoria(categoria) {
  const categoreries = await carregarDados("/categorias?slug=" + categoria);
  return categoreries[0].shoes;
}

async function incluirDestaquesDOM() {
    const sapatos = await buscarSpatosPorCategoria('destaques')
    const constainerDestaques = document.querySelector('.featured__container')

    for (const sapato of sapatos) {
        const { name, price, image } = sapato,
            preco = price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

        constainerDestaques.innerHTML += `
        <article class="shoe">
          <img src="${BASE_URL}${image.url}" alt="" class="shoe__img" />
          <span class="shoe__name">${name}</span>
          <span class="shoe__price">${preco}</span>
          <p class="shoe__pay-info"> <span>5x</span> de <span>R$ 99,99</span> sem juros*</p>
          <div class="shoe__colors">
            <div class="shoe__color"></div>
            <div class="shoe__color"></div>
            <div class="shoe__color"></div>
          </div>
        </article>
        `
    }
}

incluirDestaquesDOM()