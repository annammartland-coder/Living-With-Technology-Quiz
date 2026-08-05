const questions = [
    {
        sound: "sounds/Nokia.m4a",
        answer: "Nokia",
        options: [
            "Nokia",
            "Windows XP",
            "iPhone",
            "MSN"
        ]
    },
    {
        sound: "sounds/WindowsXP.m4a",
        answer: "Windows XP",
        options: [
            "Windows XP",
            "Nokia",
            "MSN",
            "iPhone"
        ]
    },
    {
        sound: "sounds/MSN.m4a",
        answer: "MSN",
        options: [
            "MSN",
            "Windows XP",
            "iPhone",
            "Nokia"
        ]
    },
    {
        sound: "sounds/Iphone.m4a",
        answer: "iPhone",
        options: [
            "iPhone",
            "MSN",
            "Windows XP",
            "Nokia"
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

    document.getElementById("progressFill").style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    document.getElementById("options").innerHTML =
        question.options.map(option => `
            <label class="option">
                <input
                    type="radio"
                    name="answer"
                    value="${option}">
                ${option}
            </label>
        `).join("");

    document.getElementById("feedback").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {

    loadQuestion();

    document.getElementById("playBtn").addEventListener("click", () => {
        player.currentTime = 0;
        player.play().catch(error => {
            console.error("Audio error:", error);
        });
    });

    document.getElementById("nextBtn").addEventListener("click", () => {

        const selected = document.querySelector(
            'input[name="answer"]:checked'
        );

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

            let badge = "📱 Digital Explorer";

            if (score === questions.length) {
                badge = "🏆 Technology Time Traveller";
            } else if (score >= 3) {
                badge = "💻 Tech Enthusiast";
            }

            document.querySelector(".quiz-section").innerHTML = `
                <div class="result-screen">
                    <h1>${score}/${questions.length}</h1>
                    <h2>${badge}</h2>
                    <p>
                        Thanks for taking part in the
                        Living With Technology challenge!
                    </p>
                </div>
            `;
        }
    });

});
