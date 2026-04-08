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

      <section class="panel panel--wide panel--credits">
        <section class="credits" aria-label="Käytettyjen kuvien lähteet ja tekijätiedot">
          <h2>Kuvat ja lähdekoodi</h2>
          <p class="field-note">Sovelluksessa käytettyjen kuvien tekijätiedot ja lisenssit:</p>
          <ul class="credits-list">
            <li>
              <strong>Whole_rest.svg</strong> (kokotauko) - Tekijä: Doodle-doo, Public Domain.
              <a href="https://commons.wikimedia.org/w/index.php?curid=3126906" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>
            </li>
            <li>
              <strong>Half_rest.svg</strong> (puolitauko) - Tekijä: Doodle-doo, Public Domain.
              <a href="https://commons.wikimedia.org/w/index.php?curid=3126859" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>
            </li>
            <li>
              <strong>Crotchet_rest.svg</strong> (neljäsosatauko) - Tekijä: Ecw.technoid.dweeb, Public Domain.
              <a href="https://commons.wikimedia.org/w/index.php?curid=12477587" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>
            </li>
            <li>
              <strong>Eighth_rest.svg</strong> (kahdeksasosatauko) - Tekijä: Marmelad, CC BY-SA 2.5.
              <a href="https://commons.wikimedia.org/w/index.php?curid=3376683" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>
            </li>
            <li>
              <strong>8thNote.svg</strong> (kahdeksasosanuotti) - Tekijä: PianistHere, CC BY-SA 4.0.
              <a href="https://commons.wikimedia.org/w/index.php?curid=2224859" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>
            </li>
            <li>
              <strong>8thNoteUpsideDown.svg</strong> (kahdeksasosanuotti ylösalaisin) - Muokannut Tuomas Piirainen PianistHere:n 8thNote.svg:n pohjalta, CC BY-SA 4.0.
              <a href="/images/8thNoteUpsideDown.svg">ladattavissa</a>
            </li>
            <li>
              <strong>Music_ClefG.svg</strong> (G-avain) - Tekijä: Handige Harry, Public Domain.
              <a href="https://commons.wikimedia.org/w/index.php?curid=3205665" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>
            </li>
            <li>
              <strong>Bass_clef.svg</strong> (F-avain) - Tekijä: Tlusťa (oletettu), Public Domain.
              <a href="https://commons.wikimedia.org/w/index.php?curid=620274" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>
            </li>
            <li>
              <strong>Alto_clef.svg</strong> (C-avain) - Tekijä: Tlusťa (oletettu), Public Domain.
              <a href="https://commons.wikimedia.org/w/index.php?curid=620317" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>
            </li>
          </ul>
          <p class="field-note">
            Nuottioppaan lähdekoodi:
            <a href="https://github.com/draugrist/nuottiopas" target="_blank" rel="noopener noreferrer">github.com/draugrist/nuottiopas</a>
          </p>
        </section>
      </section>
    </main>
  `;
}