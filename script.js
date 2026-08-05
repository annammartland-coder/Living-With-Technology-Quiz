// Shuffle function

function shuffleArray(array) {

    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}


// Questions

let questions = [

{
    sound: "sounds/Nokia.m4a",
    answer: "Nokia",
    options: ["Nokia", "Samsung", "iPhone", "Teams"]
},

{
    sound: "sounds/WindowsXP.m4a",
    answer: "Windows XP",
    options: ["Windows XP", "Netflix", "MSN", "Slack"]
},

{
    sound: "sounds/MSN.m4a",
    answer: "MSN",
    options: ["MSN", "Outlook", "Teams", "Samsung"]
},

{
    sound: "sounds/Iphone.m4a",
    answer: "iPhone",
    options: ["iPhone", "Samsung", "Nokia", "Slack"]
},

{
    sound: "sounds/Teams.m4a",
    answer: "Teams",
    options: ["Teams", "Slack", "Outlook", "MSN"]
},

{
    sound: "sounds/Slack.m4a",
    answer: "Slack",
    options: ["Slack", "Teams", "Outlook", "Netflix"]
},

{
    sound: "sounds/Outlook.m4a",
    answer: "Outlook",
    options: ["Outlook", "Teams", "Slack", "MSN"]
},

{
    sound: "sounds/Netflix.m4a",
    answer: "Netflix",
    options: ["Netflix", "Windows XP", "PlayStation", "Wii"]
},

{
    sound: "sounds/PlayStation.m4a",
    answer: "PlayStation",
    options: ["PlayStation", "Game Boy", "Netflix", "Wii"]
},

{
    sound: "sounds/GameBoy.m4a",
    answer: "Game Boy",
    options: ["Game Boy", "PlayStation", "Nokia", "MSN"]
},

{
    sound: "sounds/Samsung.m4a",
    answer: "Samsung",
    options: ["Samsung", "iPhone", "Nokia", "Windows XP"]
},

{
    sound: "sounds/Wii.m4a",
    answer: "Wii",
    options: ["Wii", "PlayStation", "Netflix", "Game Boy"]
}

];


// Randomise question order

questions = shuffleArray(questions);


// Variables

let currentQuestion = 0;
let score = 0;

const player = new Audio();


// Load question

function loadQuestion() {

    const question = questions[currentQuestion];

    player.src = question.sound;

    document.getElementById("progress").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("progressFill").style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    const shuffledOptions = shuffleArray(question.options);

    document.getElementById("options").innerHTML =
        shuffledOptions.map(option => `
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


// Wait for page to load

document.addEventListener("DOMContentLoaded", () => {

    loadQuestion();

    // Play sound button

    document.getElementById("playBtn").addEventListener("click", () => {

        player.currentTime = 0;

        player.play().catch(error => {
            console.error("Audio error:", error);
        });

    });

    // Submit answer

    document.getElementById("nextBtn").addEventListener("click", () => {

        const selected = document.querySelector(
            'input[name="answer"]:checked'
        );

        if (!selected) {

            alert("Please select an answer.");

            return;
        }

        if (
            selected.value ===
            questions[currentQuestion].answer
        ) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < questions.length) {

            loadQuestion();

        } else {

            let badge;

            if (score === 12) {

                badge =
                    "🏆 Technology Time Traveller";

            } else if (score >= 10) {

                badge =
                    "🚀 Digital Pioneer";

            } else if (score >= 7) {

                badge =
                    "💻 Tech Enthusiast";

            } else if (score >= 4) {

                badge =
                    "🔌 Connected User";

            } else {

                badge =
                    "📱 Digital Explorer";
            }

            document.querySelector(".quiz-section")
                .innerHTML = `

                <div class="result-screen">

                    <h1>${score}/12</h1>

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
