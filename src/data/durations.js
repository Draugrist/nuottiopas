export const DURATION_OPTIONS = [
    { value: 1, label: 'kokonuotti' },
    { value: 2, label: 'puolinuotti' },
    { value: 4, label: 'neljäsosanuotti' },
    { value: 8, label: 'kahdeksasosanuotti' }
];

const DURATIONS_BY_DIFFICULTY = {
    easy: [4],
    medium: [2, 4],
    hard: [1, 2, 4, 8]
};

export function getDurationsForDifficulty(difficulty) {
    return DURATIONS_BY_DIFFICULTY[difficulty] ?? DURATIONS_BY_DIFFICULTY.easy;
}

export function getDurationLabel(duration) {
    return DURATION_OPTIONS.find((option) => option.value === duration)?.label ?? '';
}