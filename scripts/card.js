/* Desenvolva sua lógica aqui... */
function rendercriacaocard(array) {
  const ulcard = document.querySelector(".ul_vagas");
  array.forEach((produto) => {
    const produto2 = criacaocard(produto);
    ulcard.appendChild(produto2);
  });
}
function criacaocard(produto) {
  const licard = document.createElement("li");
  licard.classList.add("licard");
  const titulocard = document.createElement("h2");
  titulocard.classList.add("titulo_card");
  const div_pai_cargo_cidade_card = document.createElement("div");
  div_pai_cargo_cidade_card.classList.add("div_pai_cargo_cidade");
  
  const span_cargo_card = document.createElement("span");
  span_cargo_card.classList.add("span_cargo_card");
  const span_cidade_card = document.createElement("span");
  span_cidade_card.classList.add("span_cidade_card");
  const descricao_card = document.createElement("p");
  descricao_card.classList.add("descricao_card");
  const div_pai_tipotrabalho_botao = document.createElement("div");
  div_pai_tipotrabalho_botao.classList.add("div_pai_tipotrabalho_botao");
  const tipo_trabalho_card = document.createElement("span");
  tipo_trabalho_card.classList.add("tipo_trabalho_card1");
  const tipo_trabalho_card2 = document.createElement("span");
  tipo_trabalho_card2.classList.add("tipo_trabalho_card2");
  const botao_candidatar = document.createElement("button");
  botao_candidatar.classList.add("botao_candidatar", "mudar_botao");

  licard.classList.add("licard");

  titulocard.innerHTML = produto.title;
  span_cargo_card.innerHTML = produto.enterprise;
  span_cidade_card.innerHTML = produto.location;
  descricao_card.innerHTML = produto.descrition;
  tipo_trabalho_card.innerHTML = produto.modalities[0];

  tipo_trabalho_card2.innerHTML = produto.modalities[1];
  botao_candidatar.dataset.id = produto.id;
  botao_candidatar.innerHTML = "Candidatar";

  div_pai_cargo_cidade_card.append(span_cargo_card, span_cidade_card);
  div_pai_tipotrabalho_botao.append(
    tipo_trabalho_card,
    tipo_trabalho_card2,
    botao_candidatar
  );

  botao_candidatar.addEventListener("click", function () {
    let mudar_botao = document.getElementsByClassName("mudar_botao");
    mudar_botao.innerHTML = "Remover candidatura";
  });

  botao_candidatar.addEventListener("click", (evento) => {
    const exite_elemento = cart_selecionadas.find((meu_elemento) => {
      return meu_elemento.id == produto.id;
    });
    if (exite_elemento) {
      const produto_index = cart_selecionadas.indexOf(produto);
      cart_selecionadas.splice(produto_index, 1);
    } else {
      const produto_procurar = jobsData.find((elem) => {
        return elem.id == produto.id;
      });

      //console.log(produto_procurar)
      const produto_novo = {
        ...produto_procurar,
        cartid: cart_selecionadas.length + 1,
      };

      cart_selecionadas.push(produto_novo);
      const produto_json = JSON.stringify(cart_selecionadas);
      localStorage.setItem("vagas-selecionadas", produto_json);
    }
    render_vagas_selecionadas(cart_selecionadas);
  });

  licard.append(
    titulocard,
    div_pai_cargo_cidade_card,
    descricao_card,
    div_pai_tipotrabalho_botao
  );
  return licard;
}

function analisa_cart_storage() {
  const cart_local = localStorage.getItem("vagas-selecionadas");
  if (cart_local) {
    const cart_json = JSON.parse(cart_local);
    // console.log(cart_json)

    cart_selecionadas = [...cart_json];
    //  console.log(cart_selecionadas)
  }
}
analisa_cart_storage();

rendercriacaocard(jobsData);

//vagas selecionadas
function render_vagas_selecionadas(array) {
  const ul_vagas_selecionadas = document.querySelector(".vagas_selecionadas");
  ul_vagas_selecionadas.innerHTML = "";
  if (cart_selecionadas.length <= 0) {
    const funcao_status = mudar_status_vagas();
    ul_vagas_selecionadas.appendChild(funcao_status);
  } else {
    array.forEach((produto) => {
      const meu_produto = criacao_card_vagas_selecionas(produto);
      ul_vagas_selecionadas.appendChild(meu_produto);
      // console.log(array);
    });
    remove_vagas(array);
  }
}

function mudar_status_vagas() {
  const status_vaga = document.createElement("p");
  status_vaga.innerHTML = "Você ainda não aplicou para nenhuma vaga";
  status_vaga.classList.add("status_vaga");
  return status_vaga;
}

function criacao_card_vagas_selecionas(produto) {
  const li_vaga_selecionada = document.createElement("li");
  li_vaga_selecionada.classList.add("li_vaga_selecionada");
  const div_pai_titulo_botao = document.createElement("div");
  div_pai_titulo_botao.classList.add("div_pai_titulo_botao");
  const titulo_vaga_selecionada = document.createElement("h2");
  titulo_vaga_selecionada.classList.add("titulo_vaga_selecionada_card");
  const botao_remover_vaga_selecionada = document.createElement("img");

  const div_pai_cargo_cidade_vagas_selecionadas = document.createElement("div");
  const span_cargo_vagas_selecionadas = document.createElement("span");
  span_cargo_vagas_selecionadas.classList.add("span_cargo_vagas_selecionadas");
  const span_cidade_vagas_selecionadas = document.createElement("span");
  span_cidade_vagas_selecionadas.classList.add(
    "span_cidade_vagas_selecionadas"
  );

  titulo_vaga_selecionada.innerHTML = produto.title;
  span_cargo_vagas_selecionadas.innerHTML = produto.enterprise;
  span_cidade_vagas_selecionadas.innerHTML = produto.location;
  botao_remover_vaga_selecionada.classList.add(
    "botao_remover_vaga_selecionada"
  );
  botao_remover_vaga_selecionada.dataset.cartid = produto.cartid;
  botao_remover_vaga_selecionada.src = "../../assets/img/trash.png";

  div_pai_titulo_botao.append(
    titulo_vaga_selecionada,
    botao_remover_vaga_selecionada
  );

  div_pai_cargo_cidade_vagas_selecionadas.append(
    span_cargo_vagas_selecionadas,
    span_cidade_vagas_selecionadas
  );
  li_vaga_selecionada.append(
    div_pai_titulo_botao,
    div_pai_cargo_cidade_vagas_selecionadas
  );
  return li_vaga_selecionada;
}
/*function add_vagas_selecionadas() {
  const botoes = document.querySelectorAll(".botao_candidatar");
  botoes.forEach((botao) => {
    botao.addEventListener("click", (evento) => {
      const produto_procurar = jobsData.find((produto) => {
        return (produto.id = Number(evento.target.dataset.id));
      });
      const produto_novo = {
        ...produto_procurar,
        cartid: cart_selecionadas.length + 1,
      };
      cart_selecionadas.push(produto_novo);
      render_vagas_selecionadas(cart_selecionadas);
    });
  });
}*/
function remove_vagas(array) {
  const botaos_remover = document.querySelectorAll(
    ".botao_remover_vaga_selecionada"
  );
  botaos_remover.forEach((botao) => {
    botao.addEventListener("click", (event) => {
      const procurar_produto = array.find((produto) => {
        return produto.cartid === Number(event.target.dataset.cartid);
      });
      const produto_index = array.indexOf(procurar_produto);
      array.splice(produto_index, 1);
      const produtos_json = JSON.stringify(cart_selecionadas);
      localStorage.setItem("vagas-selecionadas", produtos_json);
      render_vagas_selecionadas(array);
    });
  });
}
render_vagas_selecionadas(cart_selecionadas);
