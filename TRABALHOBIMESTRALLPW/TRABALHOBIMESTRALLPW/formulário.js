document.addEventListener('DOMContentLoaded', function() {
  // Respostas corretas (valores dos inputs)
  const respostasCorretas = {
    "questão1": "1a",
    "questão2": "2c",
    "questão3": "3d",
    "questão4": "4d",
    "questão5": "5a",
    "questão6": "6c",
    "questão7": "7d",
    "questão8": "8b",
    "questão9": "9c",
    "questão10": "10a"
  };

  const submitBtn = document.createElement('button');
  submitBtn.id = 'submit-btn';
  submitBtn.textContent = 'Enviar Respostas';
  document.querySelector('main').appendChild(submitBtn);

  const resultadoDiv = document.createElement('div');
  resultadoDiv.id = 'resultado';
  document.querySelector('main').appendChild(resultadoDiv);

  // Verificar respostas ao clicar no botão
  submitBtn.addEventListener('click', function() {
    let pontuacao = 0;
    let respostasUsuario = {};

    // Coletar respostas
    document.querySelectorAll('input[type="radio"]:checked').forEach(input => {
      respostasUsuario[input.name] = input.value;
    });

    // Verificar cada questão
    for (const questao in respostasCorretas) {
      if (respostasUsuario[questao] === respostasCorretas[questao]) {
        pontuacao += 10;
      }
    }

    // Exibir resultado
    resultadoDiv.style.display = 'block';
    resultadoDiv.innerHTML = `
      <p>Você acertou ${pontuacao / 10} de 10 questões!</p>
      <p class="pontuacao-final">Pontuação: ${pontuacao}/120</p>
      <p>${getMensagemFinal(pontuacao)}</p>
    `;
    resultadoDiv.className = pontuacao >= 60 ? 'correto' : 'incorreto';
  });

  // Mensagem personalizada
  function getMensagemFinal(pontos) {
    if (pontos === 120) return " Excelente! Você domina as relações ecológicas!";
    if (pontos >= 80) return "Bom trabalho! Quase lá!";
    if (pontos >= 60) return " Revise os conceitos e tente novamente!";
    return " Estude mais e tente outra vez!";
  }

 
  
});