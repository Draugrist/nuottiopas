import { formatTaskLabel, renderNotation } from './notationRenderer.js';

const PITCH_VARIANTS = [
  { label: 'C', pitch: 'C', accidental: 'natural' },
  { label: 'Cis', pitch: 'C', accidental: 'sharp' },
  { label: 'D', pitch: 'D', accidental: 'natural' },
  { label: 'Des', pitch: 'D', accidental: 'flat' },
  { label: 'Dis', pitch: 'D', accidental: 'sharp' },
  { label: 'E', pitch: 'E', accidental: 'natural' },
  { label: 'Es', pitch: 'E', accidental: 'flat' },
  { label: 'F', pitch: 'F', accidental: 'natural' },
  { label: 'Fis', pitch: 'F', accidental: 'sharp' },
  { label: 'G', pitch: 'G', accidental: 'natural' },
  { label: 'Ges', pitch: 'G', accidental: 'flat' },
  { label: 'Gis', pitch: 'G', accidental: 'sharp' },
  { label: 'A', pitch: 'A', accidental: 'natural' },
  { label: 'As', pitch: 'A', accidental: 'flat' },
  { label: 'Ais', pitch: 'A', accidental: 'sharp' },
  { label: 'H', pitch: 'H', accidental: 'natural' },
  { label: 'B', pitch: 'B', accidental: 'flat' }
];

function encodePitchVariant(variant) {
  return `${variant.pitch}|${variant.accidental}`;
}

function decodePitchVariant(value) {
  if (!value) {
    return null;
  }

  const [pitch, accidental] = value.split('|');
  if (!pitch || !accidental) {
    return null;
  }

  return { pitch, accidental };
}

function renderCountdown(state) {
  return `<p class="status-pill">Tehtävä ${state.session.completedTasks + 1} / ${state.session.limit}</p>`;
}

function isPitchVariantSelected(encodedValue, answer) {
  const variant = decodePitchVariant(encodedValue);
  if (!variant) {
    return false;
  }

  return answer.pitch === variant.pitch && answer.accidental === variant.accidental;
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
    const variant = decodePitchVariant(value);
    if (!variant) {
      return false;
    }

    const expectedPitch = correctTask.accidental === 'flat' && correctTask.note.letter === 'H'
      ? 'B'
      : correctTask.note.letter;

    return variant.pitch === expectedPitch && variant.accidental === correctTask.accidental;
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
                ${PITCH_VARIANTS.map((variant) => {
    const encodedValue = encodePitchVariant(variant);
    return renderButton(
      variant.label,
      'pitch',
      encodedValue,
      isPitchVariantSelected(encodedValue, answer),
      isButtonCorrect('pitch', encodedValue, state)
    );
  }).join('')}
              </div>
            </div>

            <div class="button-group">
              <p class="group-label">Kesto</p>
              <div class="button-row">
                ${renderButton('1', 'duration', '1', answer.duration === 1, isButtonCorrect('duration', '1', state))}
                ${renderButton('1/2', 'duration', '2', answer.duration === 2, isButtonCorrect('duration', '2', state))}
                ${renderButton('1/4', 'duration', '4', answer.duration === 4, isButtonCorrect('duration', '4', state))}
                ${renderButton('1/8', 'duration', '8', answer.duration === 8, isButtonCorrect('duration', '8', state))}
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