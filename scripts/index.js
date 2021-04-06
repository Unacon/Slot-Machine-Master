// valor disponível para aposta
let availableToBet = 500;

// itens para aposta
const items = [
  {
    id: 1,
    reward: 1000,
    name: 'Batman',
    src: './assets/img/batman.png',
  }, {
    id: 2,
    reward: 120,
    name: 'SpiderMan',
    src: './assets/img/spiderman.png',
  }, {
    id: 3,
    reward: -40,
    name: 'Deadpool',
    src: './assets/img/deadpool.png',
  }, {
    id: 4,
    reward: -5000,
    name: 'Bomb',
    src: './assets/img/bomb.png',
  },
];

// - Recurperar os elementos do `DOM` via `JS`
// Botao 'spin', 'cards', 'dinheiro' e 'title'

const titleElement = document.querySelector('.title');
const moneyElement = document.querySelector('#balance');
const spinElement = document.querySelector('#spin-button');
const cardsElement = document.querySelectorAll('.slot-item');

// ATUALIZAR DINHEIRO COM VARIAVEL availableToBet
moneyElement.innerHTML = `$${availableToBet}`;

//EVENTO CLICK DO BUTÃO SPIN
spinElement.addEventListener('click',(event) => {
  if(availableToBet > 0){ //VALIDAÇÃO DO PREÇO
    machine(() => {  // FUNÇÃO COM CALLBACK
      titleElement.innerHTML = 'HERO MACHINE';
      cardName = []; //INJETA RESULTADOS NO ARRAY PARA VALIDAÇÃO DE RESULTADO
      cardsElement.forEach((card) =>{        
        cardName.push(card.title);
      });
      
      //VALIDA SE TODOS SÃO IGUAIS
      const victory = cardsEqual();

      //VALIDA VITORIA
      validVictory(victory); 
    });
  }else{
    titleElement.innerHTML="O senhor(a) não tem mais dinheiro";
  }
});

function cardsEqual(){
  const victory = cardName.filter((card) =>{
    if(cardName[0] === card) {
      return true;
    }
    return false;
  });
  if(victory.length === 3){
    return true;
  }else{
    return false;
  }
}

function validVictory(victory){
  //VERIFICA NOVAMENTE A ENTRADA
  if(victory){        
    cardName = cardsElement[0].title; //PEGA TITULO DO PRIMEIRO CARD
    items.forEach((item) =>{
      if(cardName == item.name){   //ANALISA PREÇO DO CARD E APLICA NO VALOR FINAL         
        availableToBet += item.reward;
        moneyElement.innerHTML = `$ ${availableToBet}`;
        titleElement.innerHTML = `${cardName} aplicou ${item.reward} na sua carteira`;
        setTimeout(() =>{
          titleElement.innerHTML = 'HERO MACHINE';
        },2000);       
      };
    });      
  };
}

function machine (callBack){
  titleElement.innerHTML = 'TESTANDO A SORTE';
  let resultSlotId = [ 0, 0, 0]; // CADA VALUE REFERE AO CARD NO SLOT

  //GIF PARA DAR SENSAÇÃO DE ALEATORIDADE
  cardsElement.forEach((card) =>{
    card.setAttribute('src','./assets/img/shuffling.gif');    
  });
   
  //LAÇO PARA ESCOLHER OS CARDS PARA CADA ITEM, ALEATORIAMENTE  
  for( let i = 0; i<50 ; i++){//50 RANDONS PARA CADA SLOT       
    resultSlotId.forEach((slot) =>{      
      resultSlotId[slot] = getRandomInt();      
    });     
  }
  
  //DELAY DE 2s PARA MOSTRAR O RESULTADO
  setTimeout(() => {
    cardsElement.forEach((card, key) =>{
      //PEGA DADOS DO LAÇO E INJETA NAS VARIAVEIS
      const newid = resultSlotId[key]; //PEGA O ID DE CADA SLOT
      const newdate = items[newid]; // PEGA O CARD PELO ID
      
      //ATRIBUI AS VARIAVEIS PARA O HTML
      card.setAttribute('src',newdate.src);
      card.setAttribute('title',newdate.name);
      card.setAttribute('alt',newdate.name);           
    });    
    callBack();     
  },2000);   
  
}

function getRandomInt(){
  return Math.floor(Math.random() * 4);
}