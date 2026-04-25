(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),document.querySelector(`#app`).innerHTML=`
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
`;var e={correct:[`/images/M.jpeg`,`/images/S.jpeg`],wrong:[`/images/aaa.jpg`,`/images/dangen.jpg`,`/images/habad.jpg`,`/images/NL-inside1IL.jpg`],puzzle:`/images/T.jpeg`},t=[`אדולף`,`סייד עלי חוסני`,`מוחמד`,`חנמאל`,`זרובבל`,`אייל גולן`,`צח פרס`],n=`נוהההה`,r=null,i=!1,a=null,o=10;s();function s(){c(),l()}function c(){document.getElementById(`startGameBtn`).addEventListener(`click`,()=>{k(1)}),document.getElementById(`captchaSubmit`).addEventListener(`click`,u)}function l(){let t=document.getElementById(`captchaGrid`);t.innerHTML=``;let n=[...e.correct.map(e=>({src:e,isCorrect:!0})),...e.wrong.map(e=>({src:e,isCorrect:!1}))];N(n),n.forEach(e=>{let n=document.createElement(`button`);n.className=`image-tile`,n.type=`button`,n.dataset.correct=String(e.isCorrect);let r=document.createElement(`img`);r.src=e.src,r.alt=`תמונה`,r.loading=`lazy`,r.onerror=()=>{n.classList.add(`broken`),n.innerHTML=`<span>התמונה לא נטענה</span>`},n.appendChild(r),n.addEventListener(`click`,()=>{n.classList.toggle(`selected`)}),t.appendChild(n)})}function u(){let e=Array.from(document.querySelectorAll(`#captchaGrid .image-tile.selected`)),t=Array.from(document.querySelectorAll(`#captchaGrid .image-tile[data-correct="true"]`)),n=document.getElementById(`captchaError`),r=e.every(e=>e.dataset.correct===`true`),i=e.filter(e=>e.dataset.correct===`true`).length;r&&i===t.length?A(`ידעתי שהערב הזה נחרט לך טוב בזיכרון 💕`,2,`לחצי כאן כדי להכיר בעובדה שזה הדבר היחיד הטוב שיצא לי מצח 💫`):(n.textContent=`ידעתי שלא הייתי צריך לוותר על יעל שלביה😕`,setTimeout(()=>{n.textContent=``},2200))}var d=[],f=null,p=null;function m(){let e=document.getElementById(`puzzleContainer`);for(e.innerHTML=``,d=N([...Array(9).keys()]);T();)d=N([...Array(9).keys()]);h()}function h(){let t=document.getElementById(`puzzleContainer`);t.innerHTML=``,d.forEach((n,r)=>{let i=document.createElement(`div`);i.className=`puzzle-piece`,i.draggable=!0,i.dataset.index=String(r),i.dataset.value=String(n);let a=Math.floor(n/3),o=n%3;i.style.backgroundImage=`url(${e.puzzle})`,i.style.backgroundPosition=`${o*50}% ${a*50}%`,i.addEventListener(`dragstart`,g),i.addEventListener(`dragover`,_),i.addEventListener(`drop`,v),i.addEventListener(`dragend`,y),i.addEventListener(`touchstart`,b,{passive:!0}),i.addEventListener(`touchmove`,x,{passive:!1}),i.addEventListener(`touchend`,S),t.appendChild(i)})}function g(e){f=Number(this.dataset.index),this.classList.add(`dragging`)}function _(e){e.preventDefault()}function v(e){e.preventDefault();let t=Number(this.dataset.index);f===null||f===t||(C(f,t),f=null)}function y(){this.classList.remove(`dragging`)}function b(){p=Number(this.dataset.index),this.classList.add(`dragging`)}function x(e){e.preventDefault()}function S(e){this.classList.remove(`dragging`);let t=e.changedTouches[0],n=document.elementFromPoint(t.clientX,t.clientY);if(!n||!n.classList.contains(`puzzle-piece`)){p=null;return}let r=Number(n.dataset.index);p!==null&&p!==r&&C(p,r),p=null}function C(e,t){[d[e],d[t]]=[d[t],d[e]],h(),w()}function w(){console.log(`checking puzzle`,d),console.log(`is solved?`,T()),T()&&setTimeout(()=>{A(`את ממש משלימה אותי 🥰`,5,`להפסקת פרסומות קצרה (מישהו צריך לממן את העבודה הזאת)🌞`)},200)}function T(){let e=[2,1,0,5,4,3,8,7,6];return d.every((t,n)=>t===e[n])}function E(e=3){let t=document.getElementById(`catsAdVideo`),n=document.getElementById(`skipAdBtn`),r=document.getElementById(`adCountdown`);a&&=(clearInterval(a),null);let i=o;n.disabled=!0,n.textContent=`לבחינת עתידך כקרדיולוגית לחצי כאן👩🏼‍⚕️`,r.textContent=`מומלץ שלא אבל אפשר להמשיך בעוד ${i}...`,t.pause(),t.currentTime=0;let s=t.play();s&&typeof s.catch==`function`&&s.catch(()=>{});let c=()=>{n.disabled=!1,r.textContent=`בדומה למשרה שתשיגי השנה - הסבלנות משתלמת (וגם נוה המושלם הסקסי והשרמנטי שכתב קו"ח עד 3 בלילה)🤓`};a=setInterval(()=>{if(--i,i>0){r.textContent=`מומלץ שלא אבל אפשר להמשיך בעוד ${i}...`;return}clearInterval(a),a=null,c()},1e3),t.onended=()=>{c()},n.onclick=()=>{n.disabled||(a&&=(clearInterval(a),null),t.pause(),k(e))}}function D(){let e=document.getElementById(`heartsContainer`);e.innerHTML=``,r&&clearInterval(r),i(),r=setInterval(()=>{i()},500);function i(){let i=Math.random()<.18,a=i?n:t[Math.floor(Math.random()*t.length)],o=document.createElement(`button`);o.className=`heart ${i?`target`:``}`,o.type=`button`,o.style.left=`${Math.random()*80+5}%`,o.style.animationDuration=`${3+Math.random()*2}s`,o.innerHTML=`❤️<span>${a}</span>`,o.addEventListener(`click`,()=>{i?(clearInterval(r),r=null,A(`את האמת שתפסת לי את העין ממזמן ועבורך הדרך ללב קצרה 😍`,4,`טוב נו יאללה, שאלה אחרונה 😌`)):j(`ולחשוב שרציתי להביא את גאנה לחגוג חודשיים...`)}),e.appendChild(o),setTimeout(()=>{o.remove()},5500)}}function O(){if(i)return;i=!0;let e=document.getElementById(`noBtn`),t=document.getElementById(`yesBtn`),n=document.getElementById(`buttonsContainer`);n.classList.add(`buttons-chaos`),e.style.position=`absolute`,e.style.transform=`scale(1)`,e.style.transition=`left 0.18s ease, top 0.18s ease, transform 0.18s ease`;function r(){let t=Math.max(0,n.clientWidth-e.offsetWidth),r=Math.max(0,n.clientHeight-e.offsetHeight),i=Math.random()*t,a=Math.random()*r;e.style.left=`${i}px`,e.style.top=`${a}px`}r(),e.addEventListener(`mouseenter`,r),e.addEventListener(`mousemove`,r),e.addEventListener(`click`,e=>{e.preventDefault(),r()}),t.addEventListener(`click`,M)}function k(e){document.querySelectorAll(`.stage`).forEach(e=>{e.classList.remove(`active`)});let t=``;e===0&&(t=`coverStage`),e===1&&(t=`stage1`),e===2&&(t=`stage2`),e===3&&(t=`stage3`),e===4&&(t=`stage4`),e===5&&(t=`adStage`);let n=document.getElementById(t);n&&(n.classList.add(`active`),e===2&&m(),e===3&&D(),e===4&&O(),e===5&&E(3))}function A(e,t,n=`המשיכי 💫`){let r=document.getElementById(`overlay`),i=document.getElementById(`successMessage`),a=document.getElementById(`successText`),o=document.getElementById(`continueBtn`);a.textContent=e,o.textContent=n,r.classList.add(`show`),i.classList.add(`show`),o.onclick=()=>{r.classList.remove(`show`),i.classList.remove(`show`),k(t)}}function j(e){let t=document.getElementById(`overlay`),n=document.getElementById(`successMessage`),r=document.getElementById(`successText`),i=document.getElementById(`continueBtn`);r.textContent=e,i.textContent=`כמות הסושונים אוזלת!`,t.classList.add(`show`),n.classList.add(`show`),i.onclick=()=>{t.classList.remove(`show`),n.classList.remove(`show`)}}function M(){document.querySelectorAll(`.stage`).forEach(e=>{e.classList.remove(`active`)}),document.getElementById(`finalStage`).classList.add(`active`)}function N(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}