document.getElementById('calcForm').addEventListener('submit', function(e){
    e.preventDefault(); // evita que a página recarregue

    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const op = document.getElementById('operation').value;

    let resultado;

    switch(op){
        case '+': resultado = num1 + num2; break;
        case '-': resultado = num1 - num2; break;
        case '*': resultado = num1 * num2; break;
        case '/': 
            if(num2 === 0){
                resultado = "Erro: divisão por zero!";
            } else {
                resultado = num1 / num2;
            }
            break;
        default: resultado = "Operação inválida!";
    }

    document.getElementById('calcResult').textContent = resultado;
});
document.getElementById('calcForm').addEventListener('reset', function () {
    document.getElementById('calcResult').textContent = '---';
});
