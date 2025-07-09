
(() => {
    const canvas = document.getElementById('snakeGame');
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    const scoreEl = document.getElementById('score');
    const maxScoreEl = document.getElementById('maxScore');

    let snake, velocity, food, tailLength, score, maxScore;
    let gameOver = false;
    let gameInterval;

    const initGame = () => {
        clearInterval(gameInterval);
        snake = [{ x: 10, y: 10 }];
        velocity = { x: 1, y: 0 };
        food = { x: 15, y: 15 };
        tailLength = 5;
        score = 0;
        maxScore = localStorage.getItem('maxScore') || 0;
        gameOver = false;
        updateHUD();
        gameInterval = setInterval(draw, 100);
        document.getElementById('restartButton').style.display = 'none';
    };

    const updateHUD = () => {
        scoreEl.textContent = 'Pontuação: ' + score;
        maxScoreEl.textContent = 'Máxima: ' + maxScore;
    };

    const restartGame = () => {
        initGame();
    };

    const showRestartButton = () => {
        document.getElementById('restartButton').style.display = 'block';
    };

    window.addEventListener('beforeunload', () => {
        localStorage.removeItem('maxScore');
    });

    const draw = () => {
        ctx.fillStyle = '#fafafa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

        let headX = snake[snake.length - 1].x + velocity.x;
        let headY = snake[snake.length - 1].y + velocity.y;

        if (headX < 0) headX = tileCount - 1;
        if (headX >= tileCount) headX = 0;
        if (headY < 0) headY = tileCount - 1;
        if (headY >= tileCount) headY = 0;

        for (let part of snake) {
            if (part.x === headX && part.y === headY) {
                gameOver = true;
            }
        }

        if (gameOver) {
            if (score > maxScore) {
                maxScore = score;
                localStorage.setItem('maxScore', maxScore);
            }
            updateHUD();

            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Fim de jogo!', canvas.width / 2, canvas.height / 2);
            ctx.font = '16px Arial';
            ctx.fillText('Clique em "Tente Novamente" para reiniciar.', canvas.width / 2, canvas.height / 2 + 30);
            ctx.font = '20px Arial';
            ctx.fillText('Pontuação: ' + score, canvas.width / 2, canvas.height / 2 + 60);
            ctx.fillText('Máxima: ' + maxScore, canvas.width / 2, canvas.height / 2 + 90);

            showRestartButton();
            clearInterval(gameInterval);
            return;
        }

        snake.push({ x: headX, y: headY });

        if (headX === food.x && headY === food.y) {
            tailLength++;
            score++;
            updateHUD();
            placeFood();
        }

        while (snake.length > tailLength) {
            snake.shift();
        }

        ctx.fillStyle = '#27ae60';
        for (let part of snake) {
            ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
        }
    };

    const placeFood = () => {
        let newX, newY;
        do {
            newX = Math.floor(Math.random() * tileCount);
            newY = Math.floor(Math.random() * tileCount);
        } while (snake.some(part => part.x === newX && part.y === newY));
        food = { x: newX, y: newY };
    };

    window.addEventListener('keydown', e => {
        switch (e.key.toLowerCase()) {

            case 'w':
                if (velocity.y === 1) break;
                velocity = { x: 0, y: -1 };
                break;

            case 's':
                if (velocity.y === -1) break;
                velocity = { x: 0, y: 1 };
                break;

            case 'a':
                if (velocity.x === 1) break;
                velocity = { x: -1, y: 0 };
                break;

            case 'd':
                if (velocity.x === -1) break;
                velocity = { x: 1, y: 0 };
                break;
        }
    });

    document.getElementById('restartButton').addEventListener('click', restartGame);
    initGame();
})();
