const difficultyDescriptions = {
  easy: 'Helppo: mukana on suppeampi nuottialue ja vain neljäsosanuotteja.',
  medium: 'Keskitaso: laajempi nuottialue ja puoli- ja neljäsosanuotteja.',
  hard: 'Vaikea: laajempi nuottialue, etumerkkejä, kestoja kokonuotista kahdeksasosaan.'
};

export function getDifficultyDescription(difficulty) {
  return difficultyDescriptions[difficulty] ?? difficultyDescriptions.medium;
}

export function renderSettingsView(settings) {
  const difficultyDescription = getDifficultyDescription(settings.difficulty);

  return `
    <main class="shell">
      <section class="panel panel--wide">
        <p class="eyebrow">Nuottiopas</p>
        <h1>Nuottiopas nuottien harjoitteluun</h1>
        <p class="lead">Valitse asetukset ja aloita harjoitus. Sovellus arpoo tehtävät, tarkistaa vastaukset ja näyttää yhteenvedon suorituksesta.</p>

        <form class="settings-grid" data-settings-form>
          <fieldset class="field field-group">
            <legend>Nuottiavain</legend>
            <div class="radio-group radio-group--clef">
              <label class="radio-option radio-option--clef">
                <input type="radio" name="clef" value="treble" ${settings.clef === 'treble' ? 'checked' : ''} />
                <img class="clef-preview" src="/images/Music_ClefG.svg" alt="G-avain" />
                <span>G-avain</span>
              </label>
              <label class="radio-option radio-option--clef">
                <input type="radio" name="clef" value="bass" ${settings.clef === 'bass' ? 'checked' : ''} />
                <img class="clef-preview clef-preview--bass" src="/images/Bass_clef.svg" alt="F-avain" />
                <span>F-avain</span>
              </label>
              <label class="radio-option radio-option--clef">
                <input type="radio" name="clef" value="alto clef" ${settings.clef === 'alto clef' ? 'checked' : ''} />
                <img class="clef-preview" src="/images/Alto_clef.svg" alt="C-avain" />
                <span>C-avain</span>
              </label>
            </div>
          </fieldset>

          <fieldset class="field field-group">
            <legend>Vaikeustaso</legend>
            <div class="radio-group">
              <label class="radio-option">
                <input type="radio" name="difficulty" value="easy" ${settings.difficulty === 'easy' ? 'checked' : ''} />
                <span>Helppo</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="difficulty" value="medium" ${settings.difficulty === 'medium' ? 'checked' : ''} />
                <span>Keskitaso</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="difficulty" value="hard" ${settings.difficulty === 'hard' ? 'checked' : ''} />
                <span>Vaikea</span>
              </label>
            </div>
            <p class="field-note" data-difficulty-summary>${difficultyDescription}</p>
          </fieldset>

          <label class="field">
            <span>Tehtävien lukumäärä</span>
            <input type="number" min="1" max="300" name="limitValue" value="${settings.limitValue}" />
          </label>

          <label class="field field--checkbox">
            <input type="checkbox" name="includeRests" value="yes" ${settings.includeRests ? 'checked' : ''} />
            <span>Sisällytä tauot</span>
          </label>

          <button class="primary-button" type="submit">Aloita harjoitus</button>
        </form>
      </section>
    </main>
  `;
}