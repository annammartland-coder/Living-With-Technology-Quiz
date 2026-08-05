const questions = [

{
    sound: "sounds/Nokia.m4a",
    answer: "Nokia",
    
    options: [
        "Nokia",
        "Outlook",
        "Teams",
        "Game Boy"
    ]
},

{
    sound: "sounds/WindowsXP.m4a",
    answer: "Windows XP",
    options: [
        "Windows XP",
        "Slack",
        "iPhone",
        "MSN"
    ]
},

{
    sound: "sounds/MSN.m4a",
    answer: "MSN",
    options: [
        "MSN",
        "PlayStation",
        "Outlook",
        "Teams"
    ]
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

    document.getElementById("options").innerHTML =
        question.options.map(option => `
            <label class="option">
                <input type="radio" name="answer" value="${option}">
                ${option}
            </label>
        `).join("");
}

document.getElementById("playBtn").addEventListener("click", () => {
    player.play();
});

document.getElementById("nextBtn").addEventListener("click", () => {

    const selected = document.querySelector(
        'input[name="answer"]:checked'
    );

    if (!selected) {
        alert("Please choose an answer.");
        return;
    }

    if (selected.value === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();
      document.getElementById("progressFill").style.width =
`${((currentQuestion + 1) / questions.length) * 100}%`;  

    } else {

       document.querySelector(".card").innerHTML = `
    <div class="result">

        <h1>🏆</h1>

        <h2>Technology Time Traveller</h2>

        <h1>${score}/${questions.length}</h1>

        <p>
            You've successfully navigated
            the sounds that shaped our
            digital lives.
        </p>

    </div>
`;
