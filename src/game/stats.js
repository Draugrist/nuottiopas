function percentage(correct, total) {
    if (total === 0) {
        return 0;
    }

    return Math.round((correct / total) * 100);
}

export function recordResult(stats, task, result) {
    const nextStats = { ...stats };

    if (task.type === 'rest') {
        nextStats.restTasks += 1;
        nextStats.restDurationCorrect += result.durationCorrect ? 1 : 0;
        return nextStats;
    }

    nextStats.noteTasks += 1;
    nextStats.pitchCorrect += result.pitchCorrect ? 1 : 0;
    nextStats.durationRelevant += 1;
    nextStats.durationCorrect += result.durationCorrect ? 1 : 0;

    if (task.accidental !== 'natural') {
        nextStats.accidentalRelevant += 1;
        nextStats.accidentalCorrect += result.accidentalCorrect ? 1 : 0;
    }

    return nextStats;
}

export function computeSummary(stats) {
    return {
        pitchCorrect: stats.pitchCorrect,
        pitchTotal: stats.noteTasks,
        pitchAccuracy: percentage(stats.pitchCorrect, stats.noteTasks),
        accidentalCorrect: stats.accidentalCorrect,
        accidentalTotal: stats.accidentalRelevant,
        accidentalAccuracy: percentage(stats.accidentalCorrect, stats.accidentalRelevant),
        durationCorrect: stats.durationCorrect,
        durationTotal: stats.durationRelevant,
        durationAccuracy: percentage(stats.durationCorrect, stats.durationRelevant),
        restDurationCorrect: stats.restDurationCorrect,
        restDurationTotal: stats.restTasks,
        restDurationAccuracy: percentage(stats.restDurationCorrect, stats.restTasks)
    };
}