const quizData = [
  {
      question: "O século 21 trouxe grandes desafios às escolas, educadores, famílias e alunos. Neste contexto, as metodologias ativas são cada vez mais importantes, pois contribuem para o desenvolvimento de crianças e adolescentes em suas múltiplas dimensões a partir das experiências de aprendizagens. Dessa forma, as metodologias ativas contribuem para o desenvolvimento de:",
      a: "Habilidades sociais.",
      b: "Habilidades cognitivas.",
      c: "Habilidades emocionais.",
      d: "Habilidades cognitivas e socioemocionais.",
      correct: "d",
  }
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const modalResult = document.getElementById("modal-result");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  let answer = undefined;

  answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
          answer = answerEl.id;
      }
  });

  return answer;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => {
      answerEl.checked = false;
  });
}

submitBtn.addEventListener("click", () => {
  // check to see the answer
  const answer = getSelected();

  if (answer) {
      if (answer === quizData[currentQuiz].correct) {
          score++;
      }

      currentQuiz++;
      if (currentQuiz < quizData.length) {
          loadQuiz();
      } else {
        $('#resultModal').modal('show');

        if(score !== 0) {
          modalResult.innerHTML = `
            <div class="alert-result" role="alert">
              <h2>Parabéns, você acertou!</h2>
            </div>
          `;
        } else {
          modalResult.innerHTML = `
            <div class="alert-result" role="alert">
              <h2>Que pena, não foi desta vez...</h2>
              <h3>Alternativa correta: D</h3>
              <p>
                As metodologias ativas contribuem para o desenvolvimento de 
                habilidades cognitivas e socioemocionais inserindo o aluno como protagonista dos processos de aprendizagem, contribuindo para a resolução de problemas e 
                conflitos e na construção de relacionamentos saudáveis e empáticos.
              </p>
            </div>
          `;
        }
      }
  }
});

$('#resultModal').on('hidden.bs.modal', function (event) {
  location.reload();
})