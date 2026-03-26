const TREBLE_NOTES = [
    { id: 'C4', letter: 'C', position: 10 },
    { id: 'D4', letter: 'D', position: 9 },
    { id: 'E4', letter: 'E', position: 8 },
    { id: 'F4', letter: 'F', position: 7 },
    { id: 'G4', letter: 'G', position: 6 },
    { id: 'A4', letter: 'A', position: 5 },
    { id: 'H4', letter: 'H', position: 4 },
    { id: 'C5', letter: 'C', position: 3 },
    { id: 'D5', letter: 'D', position: 2 },
    { id: 'E5', letter: 'E', position: 1 },
    { id: 'F5', letter: 'F', position: 0 },
    { id: 'G5', letter: 'G', position: -1 },
    { id: 'A5', letter: 'A', position: -2 }
];

const BASS_NOTES = [
    { id: 'E2', letter: 'E', position: 10 },
    { id: 'F2', letter: 'F', position: 9 },
    { id: 'G2', letter: 'G', position: 8 },
    { id: 'A2', letter: 'A', position: 7 },
    { id: 'H2', letter: 'H', position: 6 },
    { id: 'C3', letter: 'C', position: 5 },
    { id: 'D3', letter: 'D', position: 4 },
    { id: 'E3', letter: 'E', position: 3 },
    { id: 'F3', letter: 'F', position: 2 },
    { id: 'G3', letter: 'G', position: 1 },
    { id: 'A3', letter: 'A', position: 0 },
    { id: 'H3', letter: 'H', position: -1 },
    { id: 'C4', letter: 'C', position: -2 }
];

const ALTO_NOTES = [
    { id: 'D3', letter: 'D', position: 10 },
    { id: 'E3', letter: 'E', position: 9 },
    { id: 'F3', letter: 'F', position: 8 },
    { id: 'G3', letter: 'G', position: 7 },
    { id: 'A3', letter: 'A', position: 6 },
    { id: 'H3', letter: 'H', position: 5 },
    { id: 'C4', letter: 'C', position: 4 },
    { id: 'D4', letter: 'D', position: 3 },
    { id: 'E4', letter: 'E', position: 2 },
    { id: 'F4', letter: 'F', position: 1 },
    { id: 'G4', letter: 'G', position: 0 },
    { id: 'A4', letter: 'A', position: -1 },
    { id: 'H4', letter: 'H', position: -2 }
];

const NOTES_BY_CLEF = {
    treble: {
        easy: TREBLE_NOTES.slice(2, 9),
        medium: TREBLE_NOTES,
        hard: TREBLE_NOTES
    },
    bass: {
        easy: BASS_NOTES.slice(2, 9),
        medium: BASS_NOTES,
        hard: BASS_NOTES
    },
    'alto clef': {
        easy: ALTO_NOTES.slice(2, 9),
        medium: ALTO_NOTES,
        hard: ALTO_NOTES
    }
};

export function getNotesForSettings(clef, difficulty) {
    return NOTES_BY_CLEF[clef]?.[difficulty] ?? NOTES_BY_CLEF.treble.easy;
}