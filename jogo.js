
//Tamanho da tela do jogo
var altura = 0
var largura = 0
//Vidas
var vidas = 1
//Tempo
var tempo = 30
//Velocidade em que o mosquito é criado
var velocidadeMosquito = 1500
//Pontuação
var pontuacao = 0 
//contagem regressiva
var contagemRegressiva = 3



//Efeitos sonoros
const bkgJogo = new Audio()
bkgJogo.src = "./song/mosca-voando.mp3"
const matei = new Audio()
matei.src = "./song/matei.mp3"
const regressSong = new Audio()
regressSong.src = "./song/regres.mp3"
const perderVida = new Audio()
perderVida.src = "./song/perder-vida.mp3"
const songStart = new Audio()
songStart.src = "./song/start.mp3"



     
   
 //Verificar o nivel do jogo após click no btn da index
function iniciarJogo(){
    songStart.play()
    setTimeout(() => {
      var nivelJogo = document.getElementById('nivel').value
      if(nivelJogo == 'n1'){
            window.location.href = "app.html?" + 'n1'
      } else if(nivelJogo == 'n2'){
            window.location.href = "app.html?" + 'n2'
      } else if(nivelJogo == 'n3'){
            window.location.href = "app.html?" + 'n3'
      } 
    }, 800);
}





function ajustaTamanhoPalcoJogo(){
  altura = window.innerHeight
  largura = window.innerWidth
}

ajustaTamanhoPalcoJogo();






//Executa tudo que roda no app.html
function game(){
   
   regressSong.play() //Primeiro bip de contagem




     //Definir nivel jogo
    var nivelUrl = window.location.search
    nivelUrl = nivelUrl.replace('?', '')
      if(nivelUrl == "n1"){
           tempo = 30
           velocidadeMosquito = 1500
      } else if(nivelUrl == "n2"){
        tempo = 40
        velocidadeMosquito = 1000
      } else if(nivelUrl == "n3"){
        tempo = 50
        velocidadeMosquito = 800
    }
    

   //Contagem regressiva para inicar o jogo
   var regressContagem =  setInterval(() => {
          contagemRegressiva--
          regressSong.play()
          document.getElementById('regress').textContent = contagemRegressiva
    }, 1000);

    bkgJogo.play()



//Tempo para inicar o jogo após contagem
setTimeout(() => {
      
      //Remover a contagem da tela e parar a repetição de contagem
      document.getElementById('regress').remove()
      clearInterval(regressContagem)   



       
       //Cronometro
var cronometro = setInterval(() => {
  if(tempo == 0){
      window.location.href = "vitoria.html?" + pontuacao
      clearInterval(cronometro)
  }

  tempo--
  document.querySelector('.cronometro').textContent = `Tempo restante: ${tempo}`
}, 1000);



  //Criar personagem 
setInterval(() => {

 //Gerar posição aleatória do personagem
 var posicaoX = Math.floor(Math.random() * largura) - 90
 var posicaoY = Math.floor(Math.random() * altura) - 90

 posicaoX = posicaoX < 0 ? 0 : posicaoX
 posicaoY = posicaoY < 0 ? 0 : posicaoY
 

 //condição para que se o mosquito existir o mesmo seja removido/ VIDAS
 if(document.getElementById('mosquito')){
       document.getElementById('mosquito').remove()

       if(vidas > 3){
            window.location.href = "fim-de-jogo.html?" + pontuacao
       } else {
         document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
         vidas++
         perderVida.play()
       }

 }

  var mosquito = document.createElement('img')
  mosquito.src = "./imagens/mosca.png"
  mosquito.className =  tamanhoAleatorio() 
  mosquito.style.left = posicaoX + 'px'
  mosquito.style.top = posicaoY + 'px'
  mosquito.style.position = "absolute"
  mosquito.id = 'mosquito'   //Para ver se tem o mosquito criado
  mosquito.addEventListener('click', ()=>{
     mosquito.remove()
     matei.play()
     pontuacao++
     document.getElementById('pontosPlacar').textContent = `Pontos: ${pontuacao}`
  })
  document.body.appendChild(mosquito)


 //Tamanho aleatório do mosquito
 function tamanhoAleatorio(){
   var classe = Math.floor(Math.random() * 3)
   switch(classe){
     case 0:
         return 'mosquito1'
     case 1:
         return 'mosquito2'
     case 2: 
         return 'mosquito3'     
   }
 }

}, velocidadeMosquito);


}, 3000);  //Tempo para inicar o jogo após contagem

      
}

