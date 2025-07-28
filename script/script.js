const meuToggle = document.querySelector('#menu-toggle')
const nav = document.getElementById('nav')
const fechar = document.querySelector('.fechar')
const setaTopo = document.querySelector('#btn-inicio')

const galeria = document.getElementById('galeria')
const btnHamburguer = document.getElementById('btn-hamburguer')
const btnRefri = document.getElementById('btn-refrigerante')
const btnTodos = document.getElementById('btn-todos')
const resumo = document.getElementById('resumo') // Seleciona o elemento com id 'resumo' para exibir o resumo do pedido
const carrinho = [] // Inicializa um array vazio para armazenar os itens do carrinho
let tot = document.getElementById('tot') // Seleciona o elemento com id 'total' para exibir o total do carrinho


const produtos  = [
     {
        Categoria: 'Refrigerantes',
        nome: 'Coca-cola 2L',
        preco: 6.50,
        imagem: 'img/refri.png'
     },
     {
        Categoria: 'Refrigerantes',
        nome: 'Fanta uva 1L',
        preco: 4.50,
        imagem: 'img/refri.png'
     },

     {
        Categoria: 'Refrigerantes',
        nome: 'Sprite 500ml',
        preco: 8.00,
        imagem: 'img/refri.png'
     },
     {
        Categoria: 'Refrigerantes',
        nome: 'Suco Natural (Laranja , Limão) 250ml',
        preco: 7.50,
        imagem: 'img/suco.png' 
     },

     {
        Categoria: 'Hamburguer',
        descricao: 'Pão , Alface , tomate, batata-palha, presunto ,  ovo ,  bife  , bacon,',
        nome: 'Godão-Ligth',
        preco: 15.00,
        imagem: 'img/img-principal.png'
     },
     {
        Categoria: 'Hamburguer',
        nome: 'X-Godão',
        descricao: 'Pão , Alface , tomate, batata-palha , mussarela , presunto ,  ovos ,  bife , molho especial',
        preco: 22.50,
        imagem: 'img/img-principal.png'
     },

     {
        Categoria: 'Hamburguer',
        descricao: 'Pão , Alface , tomate, batata-palha, mussarela , presunto ,  ovo , 2 bife , bacon, frango desfiado',
        nome: 'Godão-Tudo',
        preco: 28.90,
        imagem: 'img/img-principal.png'
     },

]


function renderizaProdutos(listaDeProdutos) { // Cria uma função com parametro Lista de produtos
    galeria.innerHTML = ''; // Limpa a galeria

    // Verifica se a lista está vazia
    if (listaDeProdutos.length === 0) {
        galeria.innerHTML = '<p class="aviso-sem-produto">Nenhum produto encontrado</p>'; // CORRIGIDO: Texto da mensagem
        return;
    }

    // CORRIGIDO: Sintaxe do forEach
    listaDeProdutos.forEach(produto => { // cria uma funcao do tipo arrow onde pega meu parametro listadeprodutos.forEach onde vai vasculhar minha primeira lista e retonar cada item e dentro do forEach vc escolhe oque vai fazer com os itens , produto e um nome temporario nao e minha lista
        // Cria uma constante cardProduto onde vai criar uma div dinamicamente com class produto que esta sendo estilizada direto no meu css 
        const cardProduto = ` 
            <div class="produto">
                <img src="${produto.imagem}" alt="Imagem de ${produto.nome}"> 
                <h3>${produto.nome}</h3>
                ${produto.descricao ? `<p class="descricao">${produto.descricao}</p>` : ''}
                <p class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
                <a href="#" class="comprar">Adicionar</a>
            </div>
        `; // ${produto.image} {produto.descrição} etc... esta buscando dentro da minha lista meus objetos com essa atribuição
        //aqui voce ver que está criando h3, p, img dinamicamente que esta estilizado diretto nocss
        //poduto,.preco.tofixed(2).replace ('.',',') o valor de preco vai ter 2 casa decimais apos a virgula que vai  conter ponto e virrgula e uma formatação 
        // ADICIONADO: Adiciona o card gerado à galeria
        galeria.innerHTML += cardProduto; 
    });
}

btnHamburguer.addEventListener('click', (event) =>{
    event.preventDefault() //Impede que o link recarregue a pagina
    const produtoFiltrado = produtos.filter(p => p.Categoria === 'Hamburguer') // cria uma constante de filtro onde vou acessar valores especificos da lista  para p.Categoria(na minha lista) todos tem que ser identid oa Hamburguer
    renderizaProdutos(produtoFiltrado) // executa a função de renderiza produtos (com novo parametro produto filtrado)
})



btnRefri.addEventListener('click', (event) => {
    event.preventDefault()
     const produtosFiltrados = produtos.filter(p => p.Categoria === 'Refrigerantes');
    renderizaProdutos(produtosFiltrados)
})

btnTodos.addEventListener('click', (event) =>{
    event.preventDefault()
    renderizaProdutos(produtos)
} )

// Abir menu lateral

meuToggle.addEventListener('click', () =>{ // pega minha constante meuToggle que seletor id#html adiciona um evento 'click' , logo apos vem um arrow function () => {} oque sera executado apos o click oque esta dentro da function arrow
    nav.classList.add('show') // se já tem "show", remove. Se não tem, adiciona. // estamos criando uma classe via css e js para integrar ao html assim manipulando via js
})

// Fechar menu lateral no X

fechar.addEventListener('click' , function() {
    nav.classList.remove('show') // se ja tem a classe show remove 
})

galeria.addEventListener('click', (event) => {
    event.preventDefault() // Impede o comportamento padrão do link
    if (event.target.classList.contains('comprar')) {
        const card = event.target.closest('.produto'); // Encontra o card mais próximo do elemento clicado
        const nomeProdutro = card.querySelector('h3').textContent // Acessa o nome do produto dentro do card  
        const precoProduto = card.querySelector('.preco').textContent   // Acessa o preco do produto dentro do card
        resumo.style.color = '#FFD700'; // Define a cor do texto do resumo 
        let total = 0; // Inicializa a variável total
        carrinho.push({ nome: nomeProdutro, preco: precoProduto}); // Adiciona o produto ao carrinh
        carrinho.forEach(produtos =>{
            let precoLimpo = produtos.preco.replace('R$', '').replace(',', '.').trim(); // Limpa o texto do preço para converter corretamente   
            total += parseFloat(precoLimpo); // Converte o preço para número e adiciona ao total
        })
        resumo.innerHTML += `<p>${nomeProdutro} - R$ ${precoProduto}</p>`;
        tot.innerHTML = ''; // Limpa o conteúdo anterior do total
        tot.innerHTML += `<p>Total: R$ ${total}`
        tot.classList.add('tot') // Adiciona a classe 'tot' para estilizar o total

    }
})

 function controlaSeta(){
    const larguraTela = window.innerWidth
    if(larguraTela >= 768){
        setaTopo.style.display = 'none'
        return //para função
        
    }
    if(window.scrollY < 250){ // esta dizendo que toda minha tela visivel quando scrola < 250 executa função mo caso a seta fica invisivel
        setaTopo.style.display = 'none'
    } else if(window.scrollY >= 250 && window.scrollY <= 2100){ // aqui se o scrol for maior que 250 e menor q 2100 aparece com cores vemrelho e amarelo
        setaTopo.style.display = 'block'
        setaTopo.style.background = '#8B1D1D'
        setaTopo.style.color = '#FFD700'
    }else{ // caso nao for nenhuma das condições executa essa bloco
        setaTopo.style.display = 'block'
        setaTopo.style.background = '#FFD700'
        setaTopo.style.color = '#8B1D1D'
    }      
}
    // Chamar ao rolar
    window.addEventListener('scroll', controlaSeta)
    // Chamar ao carregar
    const produtosIniciais = produtos.filter(p => p.Categoria === "Hamburguer")
    window.addEventListener('DOMContentLoaded', controlaSeta)
    window.addEventListener('DOMContentLoaded',() => {
        controlaSeta()

        renderizaProdutos(produtosIniciais)
    })
    
