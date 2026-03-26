import { formatTaskLabel, renderNotation } from './notationRenderer.js';

function renderCountdown(state) {
  return `<p class="status-pill">Tehtävä ${state.session.completedTasks + 1} / ${state.session.limit}</p>`;
}

function isButtonSelected(group, value, answer) {
  if (group === 'pitch') {
    return answer.pitch === value;
  }

  if (group === 'duration') {
    return answer.duration === value;
  }

  if (group === 'accidental') {
    return answer.accidental === value;
  }

  return false;
}

function isButtonCorrect(group, value, state) {
  const feedback = state.session.feedback;
  if (!feedback || !feedback.correctTask) {
    return false;
  }

  const { correctTask } = feedback;

  if (group === 'duration') {
    return Number(value) === correctTask.duration;
  }

  if (correctTask.type === 'rest') {
    return false;
  }

  if (group === 'pitch') {
    const expectedPitch = correctTask.accidental === 'flat' && correctTask.note.letter === 'H'
      ? 'B'
      : correctTask.note.letter;
    return value === expectedPitch;
  }

  if (group === 'accidental') {
    return value === correctTask.accidental;
  }

  return false;
}

function renderButton(label, action, value, selected, correct) {
  return `
    <button class="choice-button ${selected ? 'choice-button--active' : ''} ${correct ? 'choice-button--correct' : ''}" type="button" data-action="${action}" data-value="${value}">
      ${label}
    </button>
  `;
}

function renderFeedback(state) {
  if (!state.session.feedback) {
    return '<p class="feedback">Valitse vastaus ja paina Enter tai Tarkista.</p>';
  }

  return `
    <div class="feedback ${state.session.feedback.isCorrect ? 'feedback--ok' : 'feedback--error'}">
      <p>${state.session.feedback.isCorrect ? 'Oikein.' : 'Vaarin.'}</p>
      <p>Oikea vastaus: ${formatTaskLabel(state.session.task)}</p>
    </div>
  `;
}

export function renderPracticeView(state) {
  const { answer, task } = state.session;

  return `
    <main class="shell shell--practice">
      <section class="panel panel--practice">
        <header class="practice-header">
          <div>
            <p class="eyebrow">Harjoitus</p>
            <h1>Tunnista nuotti tai tauko</h1>
          </div>
          ${renderCountdown(state)}
        </header>

        <div class="practice-grid">
          <section class="card">
            ${renderNotation(task)}
          </section>

          <section class="card">
            <div class="button-group ${task.type === 'rest' ? 'button-group--disabled' : ''}">
              <p class="group-label">Korkeus</p>
              <div class="button-row">
                ${renderButton('C', 'pitch', 'C', isButtonSelected('pitch', 'C', answer), isButtonCorrect('pitch', 'C', state))}
                ${renderButton('D', 'pitch', 'D', isButtonSelected('pitch', 'D', answer), isButtonCorrect('pitch', 'D', state))}
                ${renderButton('E', 'pitch', 'E', isButtonSelected('pitch', 'E', answer), isButtonCorrect('pitch', 'E', state))}
                ${renderButton('F', 'pitch', 'F', isButtonSelected('pitch', 'F', answer), isButtonCorrect('pitch', 'F', state))}
                ${renderButton('G', 'pitch', 'G', isButtonSelected('pitch', 'G', answer), isButtonCorrect('pitch', 'G', state))}
                ${renderButton('A', 'pitch', 'A', isButtonSelected('pitch', 'A', answer), isButtonCorrect('pitch', 'A', state))}
                ${renderButton('H', 'pitch', 'H', isButtonSelected('pitch', 'H', answer), isButtonCorrect('pitch', 'H', state))}
                ${renderButton('B', 'special-b', 'B', answer.pitch === 'B', isButtonCorrect('pitch', 'B', state))}
              </div>
            </div>

            <div class="button-group ${task.type === 'rest' ? 'button-group--disabled' : ''}">
              <p class="group-label">Etumerkki</p>
              <div class="button-row">
                ${renderButton('ei etumerkkia', 'accidental', 'natural', isButtonSelected('accidental', 'natural', answer), isButtonCorrect('accidental', 'natural', state))}
                ${renderButton('ylennys', 'accidental', 'sharp', isButtonSelected('accidental', 'sharp', answer), isButtonCorrect('accidental', 'sharp', state))}
                ${renderButton('alennus', 'accidental', 'flat', isButtonSelected('accidental', 'flat', answer), isButtonCorrect('accidental', 'flat', state))}
              </div>
            </div>

            <div class="button-group">
              <p class="group-label">Kesto</p>
              <div class="button-row">
                ${renderButton('1', 'duration', '1', isButtonSelected('duration', 1, answer), isButtonCorrect('duration', '1', state))}
                ${renderButton('1/2', 'duration', '2', isButtonSelected('duration', 2, answer), isButtonCorrect('duration', '2', state))}
                ${renderButton('1/4', 'duration', '4', isButtonSelected('duration', 4, answer), isButtonCorrect('duration', '4', state))}
                ${renderButton('1/8', 'duration', '8', isButtonSelected('duration', 8, answer), isButtonCorrect('duration', '8', state))}
              </div>
            </div>

            <div class="actions-row">
              <button class="primary-button" type="button" data-action="submit-answer">Tarkista</button>
              <button class="secondary-button" type="button" data-action="back-to-settings">Keskeyta ja palaa asetuksiin</button>
            </div>

            ${renderFeedback(state)}
          </section>
        </div>
      </section>
    </main>
  `;
}