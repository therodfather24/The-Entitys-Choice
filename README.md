# The Entity's Choice

The Entity's Choice is a Dead by Daylight killer randomizer built as a simple browser app.

It chooses a random killer, removes that killer from the available pool, remembers progress in the browser, and resets when every selectable killer has been chosen.

## Current Features

- Random killer roulette animation
- No duplicate picks until the pool is reset
- Full killer gallery with portrait cards
- Owned Killer settings for killers you do not own
- Toggle for removing picked killers from the pool or allowing repeat picks
- Compact Settings panel for background controls and save tools
- Current Cycle summary for selected, remaining, tracked matches, and average kills
- Optional Challenge Mode after a killer is selected
- Challenge type filters and challenge rerolling
- Optional killer match tracking after a killer is selected
- Toggleable stat fields for kills, generators left, map, and notes
- Overall and per-killer stat summaries
- Stat date filters for all time, this week, this month, and current cycle
- Compact gallery badges for killers with tracked match results
- Suggested map names while still allowing custom map text
- Collapsible recent match history
- Export and import for browser save data
- Safety tools for setup reset, progress clearing, and full local data clearing
- Recently Played panel
- End-of-pool completion screen
- Saved progress with browser localStorage
- DVVEET portrait pack support where available
- Small fan-project footer crediting The Rodfather

## How To Use It

Open `index.html` in a browser.

For the best development experience, open the folder in VS Code and use the Live Server extension.

On first launch, choose whether picked killers should be removed from the pool and whether Challenge Mode should be enabled. You can change both later in `Settings`.

Use `Settings -> Owned Killers` to turn off killers you do not own. They will stay visible in the gallery, but they will not appear in random rolls.

## Sharing With A Friend

The easiest private way to share it is to send the whole folder as a ZIP:

```text
the-entitys-choice/
```

Your friend can unzip it, open the folder, and double-click `index.html`.

Their progress, excluded killers, and recently played list will save in their own browser. Your progress will not carry over to them.

To share your exact progress and stats, open `Settings`, use `Export`, and send them the downloaded JSON file. They can use `Import` to load it.

## Sharing With GitHub

1. Create a free GitHub account if you do not already have one.
2. Create a new repository named `the-entitys-choice`.
3. Upload every file and folder from this project.
4. Keep the folder structure exactly the same, especially `images/`.
5. Send your friend the repository link, or use GitHub Pages later if you want it to open like a normal website.

If a friend downloads the project from GitHub, they should choose `Code -> Download ZIP`, unzip it, and open `index.html`.

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

Use `Settings -> Safety Tools` for saved data cleanup:

```text
Reset Setup      Shows the first-run setup screen again
Clear Progress   Clears the current pool and recently played list
Clear All Data   Clears progress, owned killers, settings, and stats
```

`Clear All Data` only affects this app in the browser you are using.

## Saved Progress Notes

Progress is saved in the browser you use to open the app.

For the save to appear next time, open the app the same way each time. For example, if you use Live Server, keep using the Live Server address instead of switching to double-clicking `index.html`.

These are treated as different websites by the browser:

```text
http://127.0.0.1:5500/index.html
file:///C:/Users/.../the-entitys-choice/index.html
```

Each one has its own saved progress.

## Match Tracking

After a killer is selected, use `Track` to record an optional killer match.

Tracked fields can be turned on or off:

```text
Kills
Generators left
Map
Notes
```

The stats panel shows overall stats or stats for one selected killer, based only on the fields currently enabled.

Use `Show History` to expand recent tracked matches. Individual matches can be edited or deleted, and stats can be cleared for one killer or for the whole app.
