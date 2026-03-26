import { getDurationsForDifficulty } from '../data/durations.js';
import { getNotesForSettings } from '../data/notes.js';

function sample(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function getAccidental(letter) {
    const options = ['natural'];

    if (!['E', 'H'].includes(letter)) {
        options.push('sharp');
    }

    if (!['C', 'F'].includes(letter)) {
        options.push('flat');
    }

    return sample(options);
}

function createRandomTask(settings, durations) {
    if (settings.includeRests && Math.random() < 0.25) {
        return {
            type: 'rest',
            duration: sample(durations)
        };
    }

    const note = sample(getNotesForSettings(settings.clef, settings.difficulty));
    const accidental = settings.difficulty === 'hard' ? getAccidental(note.letter) : 'natural';

    return {
        type: 'note',
        clef: settings.clef,
        note,
        accidental,
        duration: sample(durations)
    };
}

function isSameTask(currentTask, previousTask) {
    if (!previousTask) {
        return false;
    }

    if (currentTask.type !== previousTask.type) {
        return false;
    }

    if (currentTask.type === 'rest') {
        return currentTask.duration === previousTask.duration;
    }

    return (
        currentTask.note.id === previousTask.note.id
        && currentTask.accidental === previousTask.accidental
        && currentTask.duration === previousTask.duration
    );
}

export function createTask(settings, previousTask = null) {
    const durations = getDurationsForDifficulty(settings.difficulty);
    const maxAttempts = 20;

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        const candidateTask = createRandomTask(settings, durations);

        if (!isSameTask(candidateTask, previousTask)) {
            return candidateTask;
        }
    }

    return createRandomTask(settings, durations);
}