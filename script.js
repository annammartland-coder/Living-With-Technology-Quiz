const questions = [

{
    sound: "sounds/Nokia.m4a",
    answer: "Nokia",
    options: ["Nokia", "Teams", "Outlook", "Game Boy"]
},

{
    sound: "sounds/WindowsXP.m4a",
    answer: "Windows XP",
    options: ["Windows XP", "Slack", "MSN", "iPhone"]
},

{
    sound: "sounds/MSN.m4a",
    answer: "MSN",
    options: ["MSN", "Teams", "Outlook", "PlayStation"]
}

];

let currentQuestion = 0;
let score = 0;

const player = new Audio();

function loadQuestion() {

    const question = questions[currentQuestion];

    player.src = question.sound;

    document.getElementById("progress").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("progressFill").style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    document.getElementById("options").innerHTML =
        question.options.map(option => `
            <label class="option">
                <input type="radio"
                       name="answer"
                       value="${option}">
                ${option}
            </label>
        `).join("");
}

document.getElementById("playBtn").addEventListener("click", () => {
    player.currentTime = 0;
    player.play();
});

document.getElementById("nextBtn").addEventListener("click", () => {

    const selected =
        document.querySelector('input[name="answer"]:checked');

    if (!selected) {
        alert("Please select an answer.");
        return;
    }

    if (selected.value === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        document.querySelector(".quiz-section").innerHTML = `
            <div class="result-screen">
                <h1>${score}/${questions.length}</h1>
                <h2>🏆 Technology Time Traveller</h2>
                <p>
                    Thanks for taking part in the
                    Living With Technology challenge.
                </p>
            </div>
        `;
    }
});

loadQuestion();
