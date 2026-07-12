# The Entity's Choice

The Entity's Choice is a Dead by Daylight killer randomizer built as a simple browser app.

It chooses a random killer, removes that killer from the available pool, remembers progress in the browser, and resets when every selectable killer has been chosen.

## Current Features

- Random killer roulette animation
- No duplicate picks until the pool is reset
- Full killer gallery with portrait cards
- Include/exclude controls for killers you do not own
- Toggle for removing picked killers from the pool or allowing repeat picks
- Recently Played panel
- End-of-pool completion screen
- Saved progress with browser localStorage
- DVVEET portrait pack support where available

## How To Use It

Open `index.html` in a browser.

For the best development experience, open the folder in VS Code and use the Live Server extension.

## Sharing With A Friend

The easiest way to share it is to send the whole folder:

```text
the-entitys-choice/
```

Your friend can open `index.html` in their browser.

Their progress, excluded killers, and recently played list will save in their own browser. Your progress will not carry over to them.

## Publishing Online

This project can be hosted for free with GitHub Pages, Netlify, or a similar static-site host because it does not need a server or database.

Before publishing publicly, remember that this is a fan project and the Dead by Daylight names/artwork belong to their respective owners. Do not sell it or present it as official.

## Project Files

```text
index.html        Page structure
style.css         Visual design and animations
script.js         Randomizer logic and saved progress
killers.js        Killer roster and portrait paths
images/killers/   Killer portraits
ROADMAP.md        Planned and completed milestones
CHANGELOG.md      Version history
PORTRAITS.md      Portrait source/status notes
```

## Resetting Saved Progress

Use the in-app `Reset Pool` button to start a new cycle.

If you ever need to fully wipe browser-saved settings, clear the site data for this page in your browser.
