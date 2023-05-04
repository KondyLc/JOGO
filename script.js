const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds'); 

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const verificarColisao = () => {
    const marioDimensoes = mario.getBoundingClientRect();
    const pipeDimensoes = pipe.getBoundingClientRect();

    if (
        marioDimensoes.bottom >= pipeDimensoes.top &&
        marioDimensoes.top <= pipeDimensoes.bottom &&
        marioDimensoes.right >= pipeDimensoes.left &&
        marioDimensoes.left <= pipeDimensoes.right
    ) {
        clouds.style.animationPlayState = 'paused';

        pipe.style.animation = 'none';
        mario.src = './img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);
    }
};

const loop = setInterval(() => {
    verificarColisao();

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition < 120 && pipePosition + 77 > 0 && marioPosition < 98) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;



        clearInterval(loop);

        const gameOver = document.createElement('div');
        gameOver.classList.add('game-over');
        gameOver.innerHTML = '<h1>Game Over</h1>';
        document.body.appendChild(gameOver);
        gameOver.style.display = 'block';

    }
 
     


}, 10);

document.addEventListener('keydown', jump);