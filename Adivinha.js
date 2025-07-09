let numeroSecreto = Math.floor(Math.random() * 10) + 1;

const guessBtn = document.getElementById('guessBtn');
const guessInput = document.getElementById('guessInput');
const guessMessage = document.getElementById('guessMessage');
const restartBtn = document.getElementById('restartBtn');

guessBtn.addEventListener('click', function(){
    const palpite = Number(guessInput.value);

    if(!palpite || palpite < 1 || palpite > 10){
        guessMessage.textContent = 'Por favor, digite um número válido entre 1 e 10.';
        return;
    }

    if(palpite === numeroSecreto){
        guessMessage.textContent = 'Parabéns! Você acertou!';
        guessBtn.disabled = true;
        guessInput.disabled = true;
        restartBtn.style.display = 'inline';
    } else {
        guessMessage.textContent = `Errou! Tente novamente.`;
    }

    guessInput.value = '';
    guessInput.focus();
});

restartBtn.addEventListener('click', function(){
    numeroSecreto = Math.floor(Math.random() * 10) + 1;
    guessMessage.textContent = '';
    guessInput.disabled = false;
    guessBtn.disabled = false;
    restartBtn.style.display = 'none';
    guessInput.focus();
});
