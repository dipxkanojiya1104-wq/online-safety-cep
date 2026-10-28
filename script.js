// SafeSteps CEP project website
// For the Google Form feedback button, paste your published Google Form URL below.
const GOOGLE_FORM_URL = "";

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const toast = document.getElementById("toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

const tipMessages = {
  password: "Use a long, unique password for every important account. Never share passwords in chats.",
  privacy: "Before posting, ask: would I be comfortable with a stranger seeing this? Check your audience and location settings.",
  scams: "Pause before clicking. Check the sender and website address, and never share passwords or verification codes.",
  bullying: "Don't reply with insults. Save evidence, block and report the account, and tell a trusted adult.",
  contacts: "Keep personal details private. If an online contact asks for secrecy or a meeting, tell a trusted adult.",
  help: "You deserve help. Stop the interaction, keep evidence if safe, and speak to a trusted adult."
};
document.querySelectorAll("[data-tip]").forEach(button => {
  button.addEventListener("click", () => showToast(tipMessages[button.dataset.tip]));
});

// Interactive safety quiz
const questions = [
  {
    question: "A message says you won a prize and asks you to click a strange link. What should you do?",
    options: ["Click quickly before it expires", "Share it with all your friends", "Avoid the link and check with a trusted adult", "Reply with your home address"],
    answer: 2,
    explanation: "Unexpected prizes and urgent messages can be scams. Don't click suspicious links or share personal details."
  },
  {
    question: "Which is the safest password habit?",
    options: ["Use your name and birth year", "Use a long, unique password for each account", "Use the same password everywhere", "Tell your password to a friend"],
    answer: 1,
    explanation: "Long, unique passwords help prevent one exposed account from putting other accounts at risk."
  },
  {
    question: "Someone online asks which school you attend and where you live. What is safest?",
    options: ["Tell them so they trust you", "Post the details publicly", "Send a photo of your ID", "Keep those details private and tell a trusted adult if pressured"],
    answer: 3,
    explanation: "School, home address, ID documents, and live location are private information."
  },
  {
    question: "You see a classmate being bullied in a group chat. What can you do?",
    options: ["Join in so others like you", "Save evidence, report or block, and tell a trusted adult", "Forward the hurtful messages for fun", "Post the messages publicly"],
    answer: 1,
    explanation: "Don't amplify bullying. Save evidence where safe, report the behaviour, and get help from a trusted adult."
  },
  {
    question: "A person you met online wants to meet you alone and says not to tell your parents. What should you do?",
    options: ["Go alone to prove you're brave", "Keep it secret", "Don't meet alone; tell a trusted adult", "Send your live location to the person"],
    answer: 2,
    explanation: "Requests for secrecy and private meetings are warning signs. Don't go alone; talk to a trusted adult."
  }
];
let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;
let answered = false;
const quizContent = document.getElementById("quizContent");
const questionCount = document.getElementById("questionCount");
const progressFill = document.getElementById("progressFill");
const nextQuestion = document.getElementById("nextQuestion");
const quizHint = document.getElementById("quizHint");

function renderQuestion() {
  const q = questions[currentQuestion];
  selectedAnswer = null;
  answered = false;
  questionCount.textContent = `QUESTION ${currentQuestion + 1} OF ${questions.length}`;
  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
  quizContent.innerHTML = `
    <h3 class="quiz-question">${q.question}</h3>
    <div class="answer-list">
      ${q.options.map((option, index) => `
        <button class="answer-option" type="button" data-answer="${index}">
          <span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${option}</span>
        </button>`).join("")}
    </div>
    <p id="answerFeedback" aria-live="polite" style="font-size:12px;color:#65718a;margin:13px 0 0"></p>`;
  quizContent.querySelectorAll("[data-answer]").forEach(button => {
    button.addEventListener("click", () => {
      if (answered) return;
      selectedAnswer = Number(button.dataset.answer);
      quizContent.querySelectorAll("[data-answer]").forEach(item => item.classList.toggle("selected", item === button));
      nextQuestion.disabled = false;
      quizHint.textContent = "Ready to check your answer?";
    });
  });
  nextQuestion.disabled = true;
  nextQuestion.textContent = "Check answer →";
  quizHint.textContent = "Pick the best answer.";
}

nextQuestion.addEventListener("click", () => {
  if (selectedAnswer === null) return;
  const q = questions[currentQuestion];
  if (!answered) {
    answered = true;
    if (selectedAnswer === q.answer) score++;
    quizContent.querySelectorAll("[data-answer]").forEach((button, index) => {
      button.disabled = true;
      if (index === q.answer) button.classList.add("correct");
      else if (index === selectedAnswer) button.classList.add("wrong");
    });
    document.getElementById("answerFeedback").textContent =
      `${selectedAnswer === q.answer ? "That's right! " : "Not quite. "} ${q.explanation}`;
    progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    quizHint.textContent = `${score} correct so far`;
    nextQuestion.textContent = currentQuestion === questions.length - 1 ? "See my result →" : "Next question →";
  } else {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      showQuizResult();
    }
  }
});

function showQuizResult() {
  questionCount.textContent = "QUIZ COMPLETE";
  progressFill.style.width = "100%";
  const percent = Math.round((score / questions.length) * 100);
  const message = score === questions.length
    ? "Fantastic! You're building strong online safety habits."
    : score >= 3
      ? "Good work! Review the tips and keep practising safe habits."
      : "Every learner starts somewhere. Review the safety tips and try again.";
  quizContent.innerHTML = `<div class="quiz-result"><div class="result-icon">${score >= 4 ? "🏆" : "🛡️"}</div><h3>You scored ${score} / ${questions.length}</h3><p>${message}</p><p><strong>${percent}%</strong> correct answers</p></div>`;
  quizHint.textContent = "Small safe choices make a big difference.";
  nextQuestion.disabled = false;
  nextQuestion.textContent = "Try again ↻";
  nextQuestion.onclick = () => {
    currentQuestion = 0;
    score = 0;
    nextQuestion.onclick = null;
    renderQuestion();
  };
}
renderQuestion();

// Demo login/signup. This is intentionally browser-only and is NOT secure authentication.
const authModal = document.getElementById("authModal");
const openAuth = document.getElementById("openAuth");
const closeAuth = document.getElementById("closeAuth");
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const authTitle = document.getElementById("authTitle");
const authName = document.getElementById("authName");
const nameLabel = document.getElementById("nameLabel");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const authSubmit = document.getElementById("authSubmit");
const authForm = document.getElementById("authForm");
const formMessage = document.getElementById("formMessage");
let authMode = "login";

function setAuthMode(mode) {
  authMode = mode;
  const signup = mode === "signup";
  authTitle.textContent = signup ? "Create your account." : "Good to see you.";
  authName.hidden = !signup;
  nameLabel.hidden = !signup;
  authName.required = signup;
  authPassword.autocomplete = signup ? "new-password" : "current-password";
  authSubmit.textContent = signup ? "Create demo account →" : "Login →";
  loginTab.classList.toggle("active", !signup);
  signupTab.classList.toggle("active", signup);
  formMessage.textContent = "";
  formMessage.className = "form-message";
}
function showAuth() {
  authModal.hidden = false;
  document.body.style.overflow = "hidden";
  setAuthMode("login");
  authEmail.focus();
}
function hideAuth() {
  authModal.hidden = true;
  document.body.style.overflow = "";
  formMessage.textContent = "";
}
openAuth.addEventListener("click", showAuth);
closeAuth.addEventListener("click", hideAuth);
loginTab.addEventListener("click", () => setAuthMode("login"));
signupTab.addEventListener("click", () => setAuthMode("signup"));
authModal.addEventListener("click", event => { if (event.target === authModal) hideAuth(); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && !authModal.hidden) hideAuth(); });

authForm.addEventListener("submit", event => {
  event.preventDefault();
  const email = authEmail.value.trim().toLowerCase();
  const password = authPassword.value;
  // localStorage is for a classroom prototype only; it is not safe for real user credentials.
  const key = "safesteps_demo_accounts";
  let accounts;
  try { accounts = JSON.parse(localStorage.getItem(key) || "{}"); }
  catch { accounts = {}; }
  if (authMode === "signup") {
    const name = authName.value.trim();
    if (!name) return;
    if (accounts[email]) {
      formMessage.textContent = "An account with this email already exists in this browser.";
      return;
    }
    accounts[email] = { name, password };
    localStorage.setItem(key, JSON.stringify(accounts));
    formMessage.textContent = "Demo account created! You can now log in in this browser.";
    formMessage.classList.add("success");
    authForm.reset();
    setAuthMode("login");
  } else {
    if (accounts[email] && accounts[email].password === password) {
      formMessage.textContent = `Welcome back, ${accounts[email].name}! Demo login successful.`;
      formMessage.classList.add("success");
      showToast(`Welcome back, ${accounts[email].name}!`);
    } else {
      formMessage.textContent = "No matching demo account found. Sign up first in this browser.";
    }
  }
});

// Connect the feedback button to the user's Google Form once its URL is available.
const feedbackLink = document.getElementById("feedbackLink");
const feedbackNote = document.getElementById("feedbackNote");
if (GOOGLE_FORM_URL.trim()) {
  feedbackLink.href = GOOGLE_FORM_URL;
  feedbackNote.textContent = "Your feedback helps us improve this project.";
} else {
  feedbackLink.addEventListener("click", event => {
    event.preventDefault();
    showToast("Add your published Google Form URL to GOOGLE_FORM_URL in script.js first.");
  });
}
