const foguete = document.getElementById("idFoguete")
const altitudeText = document.getElementById("altitude")
const combustivelText = document.getElementById("combustivel")
const velocidadeText = document.getElementById("velocidade")

let altitude = 297;
let combustivel = 45;
let velocidade = 0;
let aceleracao = 0;
let motorIsOn = false;
let intervalo;

let ligar = () => {
    motorIsOn = true;
    foguete.src = "src/fogueteLigado.png";
}

let desligar = () => {
    motorIsOn = false;
    foguete.src = "src/fogueteDesligado.png";
}

let ciclo = () => {
        if(combustivel <= 0) {
            desligar()
        }
    if(motorIsOn) {
        aceleracao = 0.2; 
        combustivel--;
    } else {
        aceleracao = -0.3;
    }
    velocidade += aceleracao;
    altitude += velocidade;
    
    
    if(altitude <= 0){
        if(velocidade <= -2.4){
            foguete.src = "src/Explosion.webp"
            
            clearInterval(intervalo)
        }else{
            alert('Pouso bem sucedido')
            clearInterval(intervalo)
        }
        
    }
    foguete.style.top = (370 - altitude) + "px";
    altitudeText.innerHTML = "Altitude: " + altitude.toFixed(2);
    combustivelText.innerHTML = "Combustível: " + combustivel;
    velocidadeText.innerHTML = "Velocidade: " + Math.abs(velocidade.toFixed(2)) + "m/s";
}

intervalo = window.setInterval(ciclo, 100)


document.addEventListener('mousedown', ligar);
document.addEventListener('touchstart', ligar);
document.addEventListener('mouseup', desligar);
document.addEventListener('touchend', desligar);