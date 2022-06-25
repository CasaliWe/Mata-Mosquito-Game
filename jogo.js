
//Tamanho da tela do jogo
var altura = 0
var largura = 0
//Vidas
var vidas = 1
//Tempo
var tempo = 10


function ajustaTamanhoPalcoJogo(){
    altura = window.innerHeight
    largura = window.innerWidth
}

ajustaTamanhoPalcoJogo();



//Cronometro
var cronometro = setInterval(() => {
     if(tempo == 0){
         window.location.href = "vitoria.html"
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
               window.location.href = "fim-de-jogo.html"
          } else {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
            vidas++
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

}, 1000);
