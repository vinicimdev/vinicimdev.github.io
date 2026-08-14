// ===========================================================
// TYPEWRITER EFFECT
// Types and deletes each word in sequence inside #word,
// looping forever.
// ===========================================================
const theWords = [
  "Vini",
  "a Gameplay Programmer",
  "a Game Developer"
];

const theBox = document.getElementById("word");

if (theBox) {
  let idx = 0;

  const typingSpeed = 100;
  const deletingSpeed = 40;
  const pauseAfterTyping = 1800;
  const pauseAfterDeleting = 300;

  function typeWord(word) {
    let letterIndex = 0;

    function type() {
      theBox.textContent = word.slice(0, letterIndex);
      letterIndex++;

      if (letterIndex <= word.length) {
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(deleteWord, pauseAfterTyping);
      }
    }

    type();
  }

  function deleteWord() {
    let text = theBox.textContent;

    function erase() {
      text = text.slice(0, -1);
      theBox.textContent = text;

      if (text.length > 0) {
        setTimeout(erase, deletingSpeed);
      } else {
        setTimeout(nextWord, pauseAfterDeleting);
      }
    }

    erase();
  }

  function nextWord() {
    idx = (idx + 1) % theWords.length;
    typeWord(theWords[idx]);
  }

  typeWord(theWords[idx]);
}