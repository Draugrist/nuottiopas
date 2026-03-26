import { getDurationLabel } from '../data/durations.js';

const SHARP_NAMES = {
    C: 'Cis',
    D: 'Dis',
    F: 'Fis',
    G: 'Gis',
    A: 'Ais'
};

const FLAT_NAMES = {
    D: 'Des',
    E: 'Es',
    G: 'Ges',
    A: 'As',
    H: 'B'
};

const NOTE_X_OFFSET = 30;
const NOTEHEAD_ROTATION_DEG = -20;
const STEM_START_Y_OFFSET = 1;

function getStemAnchorPoint(cx, cy, rx) {
    const angle = (NOTEHEAD_ROTATION_DEG * Math.PI) / 180;
    return {
        x: cx + rx * Math.cos(angle),
        y: cy + rx * Math.sin(angle) + STEM_START_Y_OFFSET
    };
}

export function formatTaskLabel(task) {
    if (task.type === 'rest') {
        return `Tauko, ${getDurationLabel(task.duration)}`;
    }

    if (task.accidental === 'sharp') {
        return `${SHARP_NAMES[task.note.letter]}, ${getDurationLabel(task.duration)}`;
    }

    if (task.accidental === 'flat') {
        return `${FLAT_NAMES[task.note.letter]}, ${getDurationLabel(task.duration)}`;
    }

    return `${task.note.letter}, ${getDurationLabel(task.duration)}`;
}

function renderRestSymbol(duration) {
    const restImageByDuration = {
        1: {
            path: '/images/Whole_rest.svg',
            x: 104,
            y: 26,
            width: 52,
            height: 120
        },
        2: {
            path: '/images/Half_rest.svg',
            x: 104,
            y: 43,
            width: 52,
            height: 120
        },
        4: {
            path: '/images/Crotchet_rest.svg',
            x: 115,
            y: 50,
            width: 30,
            height: 74
        },
        8: {
            path: '/images/Eighth_rest.svg',
            x: 120,
            y: 70,
            width: 20,
            height: 36
        }
    };

    const image = restImageByDuration[duration];

    if (!image) {
        return '';
    }

    return `<image href="${image.path}" x="${image.x}" y="${image.y}" width="${image.width}" height="${image.height}" class="staff__rest-image" />`;
}

function renderRestNotation(duration) {
    return `
      <div class="notation-card notation-card--rest">
        <div class="notation-card__label">Tauko</div>
        <svg viewBox="0 0 260 180" class="staff" aria-label="Tauko viivastolla">
          <line x1="30" y1="40" x2="230" y2="40" class="staff__line" />
          <line x1="30" y1="64" x2="230" y2="64" class="staff__line" />
          <line x1="30" y1="88" x2="230" y2="88" class="staff__line" />
          <line x1="30" y1="112" x2="230" y2="112" class="staff__line" />
          <line x1="30" y1="136" x2="230" y2="136" class="staff__line" />
          ${renderRestSymbol(duration)}
        </svg>
      </div>
    `;
}

function renderNoteShape(duration, y) {
    const noteheadClass = duration <= 2 ? 'staff__notehead staff__notehead--open' : 'staff__notehead';
    const noteheadCenterX = 132 + NOTE_X_OFFSET;
    const noteheadRx = 18;
    const notehead = `<ellipse cx="${noteheadCenterX}" cy="${y}" rx="${noteheadRx}" ry="12" transform="rotate(${NOTEHEAD_ROTATION_DEG} ${noteheadCenterX} ${y})" class="${noteheadClass}" />`;

    if (duration === 1) {
        return notehead;
    }

    const stemStart = getStemAnchorPoint(noteheadCenterX, y, noteheadRx);
    const stemTop = stemStart.y - 60;
    const stem = `<line x1="${stemStart.x}" y1="${stemStart.y}" x2="${stemStart.x}" y2="${stemTop}" class="staff__stem" />`;

    if (duration === 8) {
        const flagControlX1 = stemStart.x + 20;
        const flagControlX2 = stemStart.x + 21;
        const flag = `<path d="M${stemStart.x} ${stemTop} C${flagControlX1} ${stemTop + 4} ${flagControlX2} ${stemTop + 26} ${stemStart.x} ${stemTop + 32}" class="staff__flag" />`;
        return `${notehead}${stem}${flag}`;
    }

    return `${notehead}${stem}`;
}

function renderLedgerLines(position) {
    const lines = [];
    const ledgerStartX = 90 + NOTE_X_OFFSET;
    const ledgerEndX = 170 + NOTE_X_OFFSET;

    if (position < 0) {
        for (let current = -2; current >= position; current -= 2) {
            lines.push(`<line x1="${ledgerStartX}" y1="${40 + current * 12}" x2="${ledgerEndX}" y2="${40 + current * 12}" class="staff__ledger" />`);
        }
    }

    if (position > 8) {
        for (let current = 10; current <= position; current += 2) {
            lines.push(`<line x1="${ledgerStartX}" y1="${40 + current * 12}" x2="${ledgerEndX}" y2="${40 + current * 12}" class="staff__ledger" />`);
        }
    }

    return lines.join('');
}

function renderClefSymbol(clef) {
    const imageByClef = {
        treble: {
            path: '/images/Music_ClefG.svg',
            x: 30,
            y: -22,
            width: 78,
            height: 230
        },
        bass: {
            path: '/images/Bass_clef.svg',
            x: 32,
            y: 3,
            width: 74,
            height: 170
        },
        'alto clef': {
            path: '/images/Alto_clef.svg',
            x: 36,
            y: -22,
            width: 72,
            height: 220
        }
    };

    const image = imageByClef[clef] ?? imageByClef.treble;

    return `<image href="${image.path}" x="${image.x}" y="${image.y}" width="${image.width}" height="${image.height}" class="staff__clef-image" />`;
}

function getClefExtents(clef) {
    const extentsByClef = {
        treble: { minY: -22, maxY: 208 },
        bass: { minY: 36, maxY: 142 },
        'alto clef': { minY: 24, maxY: 148 }
    };

    return extentsByClef[clef] ?? extentsByClef.treble;
}

function getClefLabel(clef) {
    const labels = {
        treble: 'G-avain',
        bass: 'F-avain',
        'alto clef': 'C-avain'
    };

    return labels[clef] ?? labels.treble;
}

function getNoteViewBox(task) {
    const y = 40 + task.note.position * 12;
    const hasStem = task.duration !== 1;
    const noteheadCenterX = 132 + NOTE_X_OFFSET;
    const noteheadRx = 18;
    const stemStart = hasStem ? getStemAnchorPoint(noteheadCenterX, y, noteheadRx) : { x: noteheadCenterX, y };
    const stemTop = hasStem ? stemStart.y - 60 : y;
    const clefExtents = getClefExtents(task.clef);

    let minY = Math.min(40, y - 14, stemTop - 8, clefExtents.minY);
    let maxY = Math.max(136, y + 14, clefExtents.maxY);

    if (task.note.position < 0) {
        minY = Math.min(minY, 40 + task.note.position * 12 - 12);
    }

    if (task.note.position > 8) {
        maxY = Math.max(maxY, 40 + task.note.position * 12 + 12);
    }

    const topMargin = 12;
    const bottomMargin = 16;
    const top = Math.floor(minY - topMargin);
    const height = Math.ceil(maxY - minY + topMargin + bottomMargin);

    return `0 ${top} 260 ${height}`;
}

export function renderNotation(task) {
    if (task.type === 'rest') {
        return renderRestNotation(task.duration);
    }

    const y = 40 + task.note.position * 12;
    const accidentalSymbol = task.accidental === 'sharp' ? '#' : task.accidental === 'flat' ? 'b' : '';
    const viewBox = getNoteViewBox(task);

    return `
    <div class="notation-card">
            <div class="notation-card__label">${getClefLabel(task.clef)}</div>
      <svg viewBox="${viewBox}" class="staff" aria-label="Nuotti viivastolla">
        <line x1="30" y1="40" x2="230" y2="40" class="staff__line" />
        <line x1="30" y1="64" x2="230" y2="64" class="staff__line" />
        <line x1="30" y1="88" x2="230" y2="88" class="staff__line" />
        <line x1="30" y1="112" x2="230" y2="112" class="staff__line" />
        <line x1="30" y1="136" x2="230" y2="136" class="staff__line" />
        ${renderClefSymbol(task.clef)}
        ${renderLedgerLines(task.note.position)}
        ${accidentalSymbol ? `<text x="${96 + NOTE_X_OFFSET}" y="${y + 8}" class="staff__accidental">${accidentalSymbol}</text>` : ''}
                ${renderNoteShape(task.duration, y)}
      </svg>
    </div>
  `;
}