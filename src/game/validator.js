export function validateAnswer(task, answer) {
    if (task.type === 'rest') {
        const durationCorrect = task.duration === answer.duration;

        return {
            isCorrect: durationCorrect,
            pitchCorrect: null,
            accidentalCorrect: null,
            durationCorrect,
            correctTask: task
        };
    }

    const expectedPitch = task.accidental === 'flat' && task.note.letter === 'H' ? 'B' : task.note.letter;
    const pitchCorrect = answer.pitch === expectedPitch;
    const accidentalCorrect = task.accidental === answer.accidental || expectedPitch === 'B';
    const durationCorrect = task.duration === answer.duration;

    return {
        isCorrect: pitchCorrect && accidentalCorrect && durationCorrect,
        pitchCorrect,
        accidentalCorrect,
        durationCorrect,
        correctTask: task
    };
}