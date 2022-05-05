const quizData = [
  {
      question: "No livro Dia de excursão, do 2º ano, projeto 3,  a Turma do Pleno vai ao jardim botânico com os educadores. Durante a visita, Babi e Aninha se perdem, por isso, sentem emoções e sentimentos desagradáveis, como medo, susto e ameaça. O que você imagina que acontece no final desta história?",
      a: "A professora da turma encontra as meninas no bambuzal.",
      b: "Babi e Aninha conseguem ajuda de um adulto confiável e, assim, encontram a professora da turma.",
      c: "Babi e Aninha ficam no bambuzal  paralisadas pelo medo que sentem até que um dos educadores as encontra.",
      d: "As personagens não têm coragem de pedir ajuda às pessoas e, de tanto andar no jardim botânico, reencontram a turma.",
      correct: "b",
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
              <h3>Alternativa correta: B</h3>
              <p>
                Babi e Aninha conseguem ajuda com um funcionário do jardim 
                botânico, que as leva até o guichê de informações para 
                anunciar que elas estão lá e, assim, reencontram a 
                professora Marcela.
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