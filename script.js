const foguete = document.getElementById("idFoguete")
const foguete_status = document.querySelector(".status_foguete")
const altura = document.getElementById("informacao")
const altitudeText = document.getElementById("altitude")
const combustivelText = document.getElementById("combustivel")
const velocidadeText = document.getElementById("velocidade")
const restart_btn = document.getElementById("tryagain")
const somMotor = document.getElementById("somMotor")
const explosao = document.getElementById("explosao")
const aplausos = document.getElementById("aplausos")

let altitude = 297;
let combustivel = 45;
let velocidade = 0;
let aceleracao = 0;
let motorIsOn = false;
let intervalo;
let permitirMotor = true;

let ligar = () => {
    if(!permitirMotor) return;
    if(somMotor.paused) somMotor.play();
    
    motorIsOn = true;
    foguete.src = "src/fogueteLigado.png";
}

let desligar = () => {
    somMotor.pause();
    if(!permitirMotor) return;
    somMotor.curentTime = 0;
    motorIsOn = false;
    foguete.src = "src/fogueteDesligado.png";
}

let tryAgain = () => {
    const fail = document.querySelector(".fail")
    fail.style.display = "flex";

    fail.style.transform = "translate3d(0, -200%, 0)"; // Define a posição inicial antes da animação
  // Atrasa ligeiramente a aplicação da classe para garantir que a transição ocorra
  setTimeout(() => {
    fail.style.transform = "translate3d(0, 200%, 0)";
  },100);
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
            explosao.play();
            foguete.src = "src/Explosion.webp"
            permitirMotor = false;
            clearInterval(intervalo)
            tryAgain()
        }else{
            aplausos.play();
            desligar();
            var duration = 3 * 1000;
            var end = Date.now() + duration;
            permitirMotor = false;
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
    foguete.style.top = (471 - altitude) + "px";
    foguete_status.style.top = (471 - altitude) + "px";
    altura.style.top = (430 - altitude) + "px";
    altitudeText.innerHTML = altitude > 0  ? "HEIGHT: " + "<br>" + altitude.toFixed(2)+ "m": "Height: <br> 0 m";
    combustivelText.innerHTML = "FUEL: " + combustivel + "L";
    velocidadeText.innerHTML = "V: " + Math.abs(velocidade.toFixed(2)) + "m/s";
}

intervalo = window.setInterval(ciclo, 80)


document.addEventListener('mousedown', ligar);
document.addEventListener('touchstart', ligar);
document.addEventListener('mouseup', desligar);
document.addEventListener('touchend', desligar);