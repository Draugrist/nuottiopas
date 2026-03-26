export function renderSummaryView(state) {
  const summary = state.session.summary;
  const formatAccuracy = (correct, total, accuracy) => `${correct} / ${total} (${accuracy} %)`;
  const accidentalCard = summary.accidentalTotal > 0
    ? `
          <article class="summary-card">
            <h2>Etumerkit</h2>
            <p>${formatAccuracy(summary.accidentalCorrect, summary.accidentalTotal, summary.accidentalAccuracy)}</p>
          </article>
      `
    : '';
  const restCard = summary.restDurationTotal > 0
    ? `
          <article class="summary-card">
            <h2>Taukojen kestot</h2>
            <p>${formatAccuracy(summary.restDurationCorrect, summary.restDurationTotal, summary.restDurationAccuracy)}</p>
          </article>
      `
    : '';

  return `
    <main class="shell">
      <section class="panel panel--wide">
        <p class="eyebrow">Yhteenveto</p>
        <h1>Harjoitus päättyi</h1>

        <div class="summary-grid">
          <article class="summary-card">
            <h2>Korkeudet</h2>
            <p>${formatAccuracy(summary.pitchCorrect, summary.pitchTotal, summary.pitchAccuracy)}</p>
          </article>
          ${accidentalCard}
          <article class="summary-card">
            <h2>Kestot</h2>
            <p>${formatAccuracy(summary.durationCorrect, summary.durationTotal, summary.durationAccuracy)}</p>
          </article>
          ${restCard}
        </div>

        <div class="actions-row">
          <button class="primary-button" type="button" data-action="restart-session">Harjoittele uudestaan</button>
          <button class="secondary-button" type="button" data-action="back-to-settings">Takaisin asetuksiin</button>
        </div>
      </section>
    </main>
  `;
}