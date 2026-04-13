import './styles.css';

import { createTask } from './game/generator.js';
import { createEmptyAnswer, createSession, getState, resetToSettings, setAnswer, setFeedback, setSessionTask, setView, startSession } from './state.js';
import { computeSummary, recordResult } from './game/stats.js';
import { validateAnswer } from './game/validator.js';
import { renderPracticeView } from './ui/practiceView.js';
import { getDifficultyDescription, renderSettingsView } from './ui/settingsView.js';
import { renderSummaryView } from './ui/summaryView.js';

const appElement = document.querySelector('#app');
let feedbackTimeoutId = null;

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

function canApplyAccidental(pitch, accidental) {
    if (!pitch) {
        return false;
    }

    if (pitch === 'B') {
        return accidental === 'flat';
    }

    if (accidental === 'sharp') {
        return !['E', 'H'].includes(pitch);
    }

    if (accidental === 'flat') {
        return !['C', 'F'].includes(pitch);
    }

    return accidental === 'natural';
}

function render() {
    const state = getState();

    if (state.view === 'settings') {
        appElement.innerHTML = renderSettingsView(state.settings);
    } else if (state.view === 'practice') {
        appElement.innerHTML = renderPracticeView(state);
    } else if (state.view === 'summary') {
        appElement.innerHTML = renderSummaryView(state);
    }
}

function clearFeedbackTimeout() {
    if (feedbackTimeoutId) {
        window.clearTimeout(feedbackTimeoutId);
        feedbackTimeoutId = null;
    }
}

function beginSession(settings) {
    const session = createSession(settings);
    const task = createTask(settings);

    startSession(settings, session);
    setSessionTask(task, createEmptyAnswer(settings), null);
    render();
}

function nextTask() {
    const state = getState();
    if (state.view !== 'practice') {
        return;
    }

    if (state.session.completedTasks >= state.session.limit) {
        finishSession();
        return;
    }

    const task = createTask(state.settings, state.session.task);
    setSessionTask(task, createEmptyAnswer(state.settings), null);
    render();
}

function finishSession() {
    clearFeedbackTimeout();

    const state = getState();
    const summary = computeSummary(state.session.stats);
    state.session.summary = summary;
    setView('summary');
    render();
}

function handleSettingsSubmit(formElement) {
    const formData = new FormData(formElement);
    const settings = {
        clef: formData.get('clef'),
        difficulty: formData.get('difficulty'),
        limitValue: Number(formData.get('limitValue')),
        includeRests: formData.get('includeRests') === 'yes'
    };

    beginSession(settings);
}

function handleSettingsDifficultyChange(inputElement) {
    const form = inputElement.closest('[data-settings-form]');
    if (!(form instanceof HTMLFormElement)) {
        return;
    }

    const summaryElement = form.querySelector('[data-difficulty-summary]');
    if (!(summaryElement instanceof HTMLElement)) {
        return;
    }

    summaryElement.textContent = getDifficultyDescription(inputElement.value);
}

function handleAnswerAction(action, value) {
    const state = getState();
    if (state.view !== 'practice' || state.session.feedback) {
        return;
    }

    const currentAnswer = { ...state.session.answer };

    if (action === 'pitch') {
        const variant = decodePitchVariant(value);
        if (!variant) {
            return;
        }

        currentAnswer.pitch = variant.pitch;
        currentAnswer.accidental = variant.accidental;
    }

    if (action === 'accidental') {
        if (!currentAnswer.pitch) {
            return;
        }

        const targetPitch = currentAnswer.pitch === 'B' ? 'H' : currentAnswer.pitch;
        if (!canApplyAccidental(targetPitch, value)) {
            return;
        }

        currentAnswer.accidental = value;

        if (targetPitch === 'H' && value === 'flat') {
            currentAnswer.pitch = 'B';
            currentAnswer.accidental = 'flat';
        } else {
            currentAnswer.pitch = targetPitch;
        }
    }

    if (action === 'duration') {
        currentAnswer.duration = Number(value);
    }

    setAnswer(currentAnswer);
    render();
}

function handleSubmitAnswer() {
    const state = getState();
    if (state.view !== 'practice' || state.session.feedback) {
        return;
    }

    const result = validateAnswer(state.session.task, state.session.answer);
    const updatedStats = recordResult(state.session.stats, state.session.task, result);

    state.session.stats = updatedStats;
    state.session.completedTasks += 1;
    setFeedback(result);
    render();

    clearFeedbackTimeout();
    feedbackTimeoutId = window.setTimeout(() => {
        nextTask();
    }, 2000);
}

function handlePracticeKeydown(event) {
    const state = getState();
    if (state.view !== 'practice' || state.session.feedback) {
        return;
    }

    const key = event.key.toLowerCase();
    const pitchKeys = ['c', 'd', 'e', 'f', 'g', 'a', 'h'];
    const durationKeys = ['1', '2', '4', '8'];

    if (pitchKeys.includes(key)) {
        event.preventDefault();
        handleAnswerAction('pitch', `${key.toUpperCase()}|natural`);
        return;
    }

    if (key === 'b') {
        event.preventDefault();
        handleAnswerAction('pitch', 'B|flat');
        return;
    }

    if (durationKeys.includes(key)) {
        event.preventDefault();
        handleAnswerAction('duration', key);
        return;
    }

    if (event.key === 'ArrowUp') {
        event.preventDefault();
        handleAnswerAction('accidental', 'sharp');
        return;
    }

    if (event.key === 'ArrowDown') {
        event.preventDefault();
        handleAnswerAction('accidental', 'flat');
        return;
    }

    if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmitAnswer();
    }
}

appElement.addEventListener('submit', (event) => {
    if (event.target instanceof HTMLFormElement && event.target.matches('[data-settings-form]')) {
        event.preventDefault();
        handleSettingsSubmit(event.target);
    }
});

appElement.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) {
        return;
    }

    const { action, value } = button.dataset;

    if (action === 'submit-answer') {
        handleSubmitAnswer();
        return;
    }

    if (action === 'restart-session') {
        beginSession(getState().settings);
        return;
    }

    if (action === 'back-to-settings') {
        clearFeedbackTimeout();
        resetToSettings();
        render();
        return;
    }

    handleAnswerAction(action, value);
});

appElement.addEventListener('change', (event) => {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) {
        return;
    }

    if (target.name === 'difficulty') {
        handleSettingsDifficultyChange(target);
    }
});

window.addEventListener('keydown', handlePracticeKeydown);

render();