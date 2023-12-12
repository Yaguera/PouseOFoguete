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
            var duration = 3 * 1000;
            var end = Date.now() + duration;

            (function frame() {
            // launch a few confetti from the left edge
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            // and launch a few from the right edge
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });

            // keep going until we are out of time
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
            }());
            clearInterval(intervalo)
        }
        
    }
    foguete.style.top = (370 - altitude) + "px";
    altitudeText.innerHTML = "Altitude: " + altitude.toFixed(2);
    combustivelText.innerHTML = "Combustível: " + combustivel;
    velocidadeText.innerHTML = "Velocidade: " + Math.abs(velocidade.toFixed(2)) + "m/s";
}

intervalo = window.setInterval(ciclo, 80)


document.addEventListener('mousedown', ligar);
document.addEventListener('touchstart', ligar);
document.addEventListener('mouseup', desligar);
document.addEventListener('touchend', desligar);