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
        "MSN Messenger"
    ]
},

{
    sound: "sounds/MSN.m4a",
    answer: "MSN Messenger",
    options: [
        "MSN Messenger",
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

    } else {

        document.querySelector(".card").innerHTML = `
            <h2>Quiz Complete!</h2>
            <h1>${score}/${questions.length}</h1>
            <p>Thanks for taking part!</p>
        `;
    }
});

loadQuestion();
