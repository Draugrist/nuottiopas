const defaultSettings = {
    clef: 'treble',
    difficulty: 'medium',
    limitValue: 10,
    includeRests: false
};

const state = {
    view: 'settings',
    settings: { ...defaultSettings },
    session: null
};

export function getState() {
    return state;
}

export function createEmptyAnswer() {
    return {
        pitch: '',
        accidental: 'natural',
        duration: 4
    };
}

export function createSession(settings) {
    return {
        limit: settings.limitValue,
        completedTasks: 0,
        task: null,
        answer: createEmptyAnswer(),
        feedback: null,
        stats: {
            noteTasks: 0,
            pitchCorrect: 0,
            accidentalRelevant: 0,
            accidentalCorrect: 0,
            durationRelevant: 0,
            durationCorrect: 0,
            restTasks: 0,
            restDurationCorrect: 0
        },
        summary: null
    };
}

export function startSession(settings, session) {
    state.settings = { ...settings };
    state.session = session;
    state.view = 'practice';
}

export function setSessionTask(task, answer, feedback) {
    state.session.task = task;
    state.session.answer = answer;
    state.session.feedback = feedback;
}

export function setAnswer(answer) {
    state.session.answer = answer;
}

export function setFeedback(feedback) {
    state.session.feedback = feedback;
}

export function setView(view) {
    state.view = view;
}

export function resetToSettings() {
    state.view = 'settings';
    state.session = null;
}