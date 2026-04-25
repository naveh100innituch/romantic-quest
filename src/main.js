import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="app-shell">
    <section id="coverStage" class="stage active">
      <div class="card cover-card">
        <div class="cover-emoji">💌</div>
        <h1>היי מיוחדת שלי</h1>
        <p class="cover-text">
         לפני שאנחנו חוגגים חודש ביחד היה לי חשוב לבדוק משהו😌
        </p>
        <p class="cover-text">
         בואי נראה מה את שווה
        </p>
        <button id="startGameBtn" class="btn">שמי נטע ונראה לי שאני בקטע 💕</button>
      </div>
    </section>

    <section id="stage1" class="stage">
      <div class="card captcha-box">
        <div class="captcha-header">
          <span class="checkbox">☐</span>
          <span>אני לא אוהבת אותך בכלל יאנס </span>
        </div>
        <p class="captcha-instruction">בחרי את כל התמונות מהיום שבו הכרנו</p>
        <div class="image-grid" id="captchaGrid"></div>
        <button id="captchaSubmit" class="btn">סיימתי ✓</button>
        <p id="captchaError" class="error-msg"></p>
      </div>
    </section>

    <section id="stage2" class="stage">
      <h2 class="title">✨ סדרי את התמונה ✨</h2>
      <div id="puzzleContainer" class="card puzzle-container"></div>
      <p class="hint">גררי את החלקים למקום הנכון (משער שממוצע 96.91 יכולה להבין את זה מההוראה הראשונה)</p>
    </section>
    <section id="adStage" class="stage">
      <div class="card ad-card">
        <div class="ad-badge">📺 הפסקת פרסומות קצרה</div>
        <h2 class="title"> מאחר ולקחת לי את כל המשאביםםםם עד האחוז האחרון אני דוחף פה ממומן😺 </h2>
        <p class="ad-text">השלב הבא מוגש בשיתוף עם חתול אקראי מהאינטרנט לפי סעיף 27א</p>
        <div class="video-wrap">
  <video
    id="catsAdVideo"
    class="ad-video"
    playsinline
    muted
    controls
    preload="auto"
  >
    <source src="/videos/cat.mp4" type="video/mp4" />
    הדפדפן שלך לא תומך בוידאו.
  </video>
</div>

        <p id="adCountdown" class="ad-countdown">מומלץ שלא אבל אפשר להמשיך בעוד 10...</p>
        <div class="ad-actions">
          <button id="skipAdBtn" class="btn ad-btn" disabled>להמשך ללבבות ❤️</button>
        </div>
      </div>
    </section>

    <section id="stage3" class="stage">
      <h2 class="title"> תצטרכי לתפוס לי את הלב גברת, אני לא נוסע עם כל אחת לבטן גב🏖️</h2>
      <div id="heartsContainer" class="hearts-container"></div>
    </section>

    <section id="stage4" class="stage">
      <div class="card question-box">
        <h2>🌴 את מתרגשת לבוא איתי לאילת? 🌴</h2>
        <div class="buttons-container" id="buttonsContainer">
          <button id="yesBtn" class="btn yes-btn">כן! ❤️‍🔥</button>
          <button id="noBtn" class="btn no-btn">לא</button>
        </div>
      </div>
    </section>

    <section id="finalStage" class="stage">
      <div class="card final-card">
        <div class="emoji-big">🎉🎉🎉</div>
        <p>גם אני ממש מתרגש :)</p>
        <p class="big-text">מחכה לראות אותך מחר 💓</p>
      </div>
    </section>

    <div id="overlay" class="overlay"></div>
    <div id="successMessage" class="success-message">
      <p id="successText"></p>
      <button id="continueBtn" class="btn">המשיכי כדי להכיר בעובדה שזה הדבר היחיד הטוב שיצא מצח 💫</button>
    </div>
  </div>
`;

const images = {
  correct: [
    '/images/M.jpeg',
    '/images/S.jpeg'
  ],
  wrong: [
    '/images/aaa.jpg',
    '/images/dangen.jpg',
    '/images/habad.jpg',
    '/images/NL-inside1IL.jpg',
  ],
  puzzle: '/images/T.jpeg',
};

const boyNames = ["אדולף", "סייד עלי חוסני", "מוחמד", "חנמאל", "זרובבל", "אייל גולן", "צח פרס"];
const targetName = 'נוהההה';

let heartInterval = null;
let questionInitialized = false;
let adCountdownInterval = null;
const AD_SECONDS = 10;


init();

function init() {
  setupEventListeners();
  initCaptcha();
}

function setupEventListeners() {
  document.getElementById('startGameBtn').addEventListener('click', () => {
    goToStage(1);
  });

  document.getElementById('captchaSubmit').addEventListener('click', checkCaptcha);
}

function initCaptcha() {
  const grid = document.getElementById('captchaGrid');
  grid.innerHTML = '';

  const allImages = [
    ...images.correct.map((src) => ({ src, isCorrect: true })),
    ...images.wrong.map((src) => ({ src, isCorrect: false })),
  ];

  shuffleArray(allImages);

  allImages.forEach((img) => {
    const wrapper = document.createElement('button');
    wrapper.className = 'image-tile';
    wrapper.type = 'button';
    wrapper.dataset.correct = String(img.isCorrect);

    const image = document.createElement('img');
    image.src = img.src;
    image.alt = 'תמונה';
    image.loading = 'lazy';

    image.onerror = () => {
      wrapper.classList.add('broken');
      wrapper.innerHTML = '<span>התמונה לא נטענה</span>';
    };

    wrapper.appendChild(image);

    wrapper.addEventListener('click', () => {
      wrapper.classList.toggle('selected');
    });

    grid.appendChild(wrapper);
  });
}

function checkCaptcha() {
  const selectedImages = Array.from(document.querySelectorAll('#captchaGrid .image-tile.selected'));
  const correctImages = Array.from(document.querySelectorAll('#captchaGrid .image-tile[data-correct="true"]'));
  const errorEl = document.getElementById('captchaError');

  const allSelectedAreCorrect = selectedImages.every((img) => img.dataset.correct === 'true');
  const selectedCorrectCount = selectedImages.filter((img) => img.dataset.correct === 'true').length;

  if (allSelectedAreCorrect && selectedCorrectCount === correctImages.length) {
    showSuccess('ידעתי שהערב הזה נחרט לך טוב בזיכרון 💕', 2, 'לחצי כאן כדי להכיר בעובדה שזה הדבר היחיד הטוב שיצא לי מצח 💫');

  } else {
    errorEl.textContent = 'ידעתי שלא הייתי צריך לוותר על יעל שלביה😕';
    setTimeout(() => {
      errorEl.textContent = '';
    }, 2200);
  }
}

let puzzleState = [];
let draggedPuzzleIndex = null;
let touchedPuzzleIndex = null;

function initPuzzle() {
  const container = document.getElementById('puzzleContainer');
  container.innerHTML = '';

  puzzleState = shuffleArray([...Array(9).keys()]);

  while (isPuzzleSolved()) {
    puzzleState = shuffleArray([...Array(9).keys()]);
  }

  renderPuzzle();
}

function renderPuzzle() {
  const container = document.getElementById('puzzleContainer');
  container.innerHTML = '';

  puzzleState.forEach((pieceValue, index) => {
    const piece = document.createElement('div');
    piece.className = 'puzzle-piece';
    piece.draggable = true;
    piece.dataset.index = String(index);
    piece.dataset.value = String(pieceValue);

    const row = Math.floor(pieceValue / 3);
    const col = pieceValue % 3;

    piece.style.backgroundImage = `url(${images.puzzle})`;
    piece.style.backgroundPosition = `${col * 50}% ${row * 50}%`;

    piece.addEventListener('dragstart', handlePuzzleDragStart);
    piece.addEventListener('dragover', handlePuzzleDragOver);
    piece.addEventListener('drop', handlePuzzleDrop);
    piece.addEventListener('dragend', handlePuzzleDragEnd);

    piece.addEventListener('touchstart', handlePuzzleTouchStart, { passive: true });
    piece.addEventListener('touchmove', handlePuzzleTouchMove, { passive: false });
    piece.addEventListener('touchend', handlePuzzleTouchEnd);

    container.appendChild(piece);
  });
}

function handlePuzzleDragStart(e) {
  draggedPuzzleIndex = Number(this.dataset.index);
  this.classList.add('dragging');
}

function handlePuzzleDragOver(e) {
  e.preventDefault();
}

function handlePuzzleDrop(e) {
  e.preventDefault();
  const targetIndex = Number(this.dataset.index);

  if (draggedPuzzleIndex === null || draggedPuzzleIndex === targetIndex) return;

  swapPuzzlePieces(draggedPuzzleIndex, targetIndex);
  draggedPuzzleIndex = null;
}

function handlePuzzleDragEnd() {
  this.classList.remove('dragging');
}

function handlePuzzleTouchStart() {
  touchedPuzzleIndex = Number(this.dataset.index);
  this.classList.add('dragging');
}

function handlePuzzleTouchMove(e) {
  e.preventDefault();
}

function handlePuzzleTouchEnd(e) {
  this.classList.remove('dragging');

  const touch = e.changedTouches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);

  if (!target || !target.classList.contains('puzzle-piece')) {
    touchedPuzzleIndex = null;
    return;
  }

  const targetIndex = Number(target.dataset.index);

  if (touchedPuzzleIndex !== null && touchedPuzzleIndex !== targetIndex) {
    swapPuzzlePieces(touchedPuzzleIndex, targetIndex);
  }

  touchedPuzzleIndex = null;
}

function swapPuzzlePieces(indexA, indexB) {
  [puzzleState[indexA], puzzleState[indexB]] = [puzzleState[indexB], puzzleState[indexA]];
  renderPuzzle();
  checkPuzzle();
}

function checkPuzzle() {
  console.log('checking puzzle', puzzleState);
  console.log('is solved?', isPuzzleSolved());

  if (isPuzzleSolved()) {
    setTimeout(() => {
      showSuccess('את ממש משלימה אותי 🥰',5, "להפסקת פרסומות קצרה (מישהו צריך לממן את העבודה הזאת)🌞");
    }, 200);
  }
}

function isPuzzleSolved() {
  const targetOrder = [2, 1, 0, 5, 4, 3, 8, 7, 6];
  return puzzleState.every((value, index) => value === targetOrder[index]);
}
function initAdStage(nextStageAfterAd = 3) {
  const video = document.getElementById('catsAdVideo');
  const skipBtn = document.getElementById('skipAdBtn');
  const countdownText = document.getElementById('adCountdown');

  if (adCountdownInterval) {
    clearInterval(adCountdownInterval);
    adCountdownInterval = null;
  }

  let secondsLeft = AD_SECONDS;

  skipBtn.disabled = true;
  skipBtn.textContent = 'לבחינת עתידך כקרדיולוגית לחצי כאן👩🏼‍⚕️';
  countdownText.textContent = `מומלץ שלא אבל אפשר להמשיך בעוד ${secondsLeft}...`;

  video.pause();
  video.currentTime = 0;

  const playPromise = video.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {
    });
  }

  const enableContinue = () => {
    skipBtn.disabled = false;
    countdownText.textContent = 'בדומה למשרה שתשיגי השנה - הסבלנות משתלמת (וגם נוה המושלם הסקסי והשרמנטי שכתב קו"ח עד 3 בלילה)🤓';
  };

  adCountdownInterval = setInterval(() => {
    secondsLeft -= 1;

    if (secondsLeft > 0) {
      countdownText.textContent = `מומלץ שלא אבל אפשר להמשיך בעוד ${secondsLeft}...`;
      return;
    }

    clearInterval(adCountdownInterval);
    adCountdownInterval = null;
    enableContinue();
  }, 1000);

  video.onended = () => {
    enableContinue();
  };

  skipBtn.onclick = () => {
    if (skipBtn.disabled) return;

    if (adCountdownInterval) {
      clearInterval(adCountdownInterval);
      adCountdownInterval = null;
    }

    video.pause();
    goToStage(nextStageAfterAd);
  };
}


function initHearts() {
  const container = document.getElementById('heartsContainer');
  container.innerHTML = '';

  if (heartInterval) clearInterval(heartInterval);

  createHeart();

  heartInterval = setInterval(() => {
    createHeart();
  }, 500);

  function createHeart() {
    const isTarget = Math.random() < 0.18;
    const name = isTarget
      ? targetName
      : boyNames[Math.floor(Math.random() * boyNames.length)];

    const heart = document.createElement('button');
    heart.className = `heart ${isTarget ? 'target' : ''}`;
    heart.type = 'button';
    heart.style.left = `${Math.random() * 80 + 5}%`;
    heart.style.animationDuration = `${3 + Math.random() * 2}s`;
    heart.innerHTML = `❤️<span>${name}</span>`;

    heart.addEventListener('click', () => {
      if (isTarget) {
          clearInterval(heartInterval);
          heartInterval = null;
          showSuccess('את האמת שתפסת לי את העין ממזמן ועבורך הדרך ללב קצרה 😍', 4, 'טוב נו יאללה, שאלה אחרונה 😌');
}
      else {
        showFailMessage('ולחשוב שרציתי להביא את גאנה לחגוג חודשיים...');
  }

        });
      

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 5500);
  }
}

function initQuestion() {
  if (questionInitialized) return;
  questionInitialized = true;

  const noBtn = document.getElementById('noBtn');
  const yesBtn = document.getElementById('yesBtn');
  const container = document.getElementById('buttonsContainer');

  container.classList.add('buttons-chaos');

  noBtn.style.position = 'absolute';
  noBtn.style.transform = 'scale(1)';
  noBtn.style.transition = 'left 0.18s ease, top 0.18s ease, transform 0.18s ease';

  function moveNoButton() {
    const maxX = Math.max(0, container.clientWidth - noBtn.offsetWidth);
    const maxY = Math.max(0, container.clientHeight - noBtn.offsetHeight);

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
  }

  moveNoButton();

  noBtn.addEventListener('mouseenter', moveNoButton);
  noBtn.addEventListener('mousemove', moveNoButton);
  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
  });

  yesBtn.addEventListener('click', showFinal);
}


function goToStage(stageNum) {
  document.querySelectorAll('.stage').forEach((stage) => {
    stage.classList.remove('active');
  });

  let targetId = '';

  if (stageNum === 0) targetId = 'coverStage';
  if (stageNum === 1) targetId = 'stage1';
  if (stageNum === 2) targetId = 'stage2';
  if (stageNum === 3) targetId = 'stage3';
  if (stageNum === 4) targetId = 'stage4';
  if (stageNum === 5) targetId = 'adStage';

  const nextStage = document.getElementById(targetId);
  if (!nextStage) return;

  nextStage.classList.add('active');

  if (stageNum === 2) initPuzzle();
  if (stageNum === 3) initHearts();
  if (stageNum === 4) initQuestion();
  if (stageNum === 5) initAdStage(3);
}

function showSuccess(message, nextStage, buttonText = 'המשיכי 💫') {
  const overlay = document.getElementById('overlay');
  const successMessage = document.getElementById('successMessage');
  const successText = document.getElementById('successText');
  const continueBtn = document.getElementById('continueBtn');

  successText.textContent = message;
  continueBtn.textContent = buttonText;

  overlay.classList.add('show');
  successMessage.classList.add('show');

  continueBtn.onclick = () => {
    overlay.classList.remove('show');
    successMessage.classList.remove('show');
    goToStage(nextStage);
  };
}
function showFailMessage(message) {
  const overlay = document.getElementById('overlay');
  const successMessage = document.getElementById('successMessage');
  const successText = document.getElementById('successText');
  const continueBtn = document.getElementById('continueBtn');

  successText.textContent = message;
  continueBtn.textContent = "כמות הסושונים אוזלת!"

  overlay.classList.add('show');
  successMessage.classList.add('show');

  continueBtn.onclick = () => {
    overlay.classList.remove('show');
    successMessage.classList.remove('show');
  };
}



function showFinal() {
  document.querySelectorAll('.stage').forEach((stage) => {
    stage.classList.remove('active');
  });

  document.getElementById('finalStage').classList.add('active');
}

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
