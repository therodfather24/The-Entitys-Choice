# Changelog

## v1.2.4 - Startup GIF Visibility Fix

### Fixed
- The startup GIF now fully hides whenever a killer portrait is displayed.

## v1.2.3 - Full-Frame Startup GIF

### Changed
- Updated the startup GIF placeholder to fill the full portrait frame.

## v1.2.2 - Startup GIF Placeholder

### Changed
- Replaced the portrait placeholder wordmark with the startup GIF in `images/ui/`.

## v1.2.1 - Portrait Placeholder Wordmark

### Changed
- Replaced the portrait frame's "Awaiting Selection" text with a Dead by Daylight-style wordmark placeholder.

## v1.2 - Repeat Pick Toggle

### Added
- Added a saved toggle for whether selected killers are removed from the pool.
- Added Repeat Mode, where selected killers stay available and can be rolled again.

### Changed
- The gallery, progress counter, and end-of-pool screen now adjust to the selected pool mode.

## v1.1 - Share-Ready Cleanup

### Added
- Added a README with beginner-friendly usage, sharing, and publishing notes.
- Added a basic `.gitignore` for local editor and temporary files.

### Changed
- Updated the roadmap to mark the first complete version as ready.
- Updated portrait notes to reflect that all killer portrait paths are working.

## v0.13.9 - Cleaner Fog Pass

### Changed
- Removed the side scratch accents from the main screen.
- Made the animated fog slightly stronger, softer, and cleaner.

## v0.13.8 - Killer Name Reveal Flair

### Added
- Added a bright flash and glow pulse to the final killer name reveal.

## v0.13.7 - Reset Clears Recent History

### Changed
- Reset Pool now clears the Recently Played panel so each new cycle starts fresh.

## v0.13.6 - Faster Roulette Timing

### Changed
- Shortened the random killer roulette from about 4.7 seconds to about 3.3 seconds.

## v0.13.5 - Completion Screen Polish

### Added
- Added a final-killer callout to the completion screen so the last roll is still clear.

### Changed
- Removed the scratch-mark emblem from the completion screen for a cleaner text-focused finish.

## v0.13.4 - DBD-Style Typography

### Changed
- Switched the app to a condensed DBD-like UI font.
- Updated title, buttons, counters, gallery labels, and panels to use heavier uppercase menu styling.

## v0.13.3 - Scary Atmosphere Pass

### Added
- Added subtle Entity-like slash accents behind the main screen.
- Added a stronger vignette and deeper shadowing around the main panel.

### Changed
- Made the main portrait/name area feel darker and more ominous while keeping controls readable.

## v0.13.2 - Animated Fog Bank

### Added
- Added layered animated fog behind the main screen.
- Fog now drifts at multiple depths while keeping the controls readable.

## v0.13.1 - Premium Flair Pass

### Changed
- Reduced busy background texture from the first atmosphere pass.
- Kept the DBD-inspired mood but moved the visual flair to the title, portrait, and random button.
- Added slower, cleaner glow and fog animations for a more premium feel.

## v0.13 - DBD Atmosphere Pass

### Added
- Added animated fog and scratch-light motion to the main screen.
- Added subtle title flicker and stronger red menu lighting.
- Added reduced-motion support for the new atmosphere animations.

### Changed
- Reworked the main randomizer panel, portrait frame, gallery cards, and buttons to feel darker and closer to a Dead by Daylight menu.

## v0.12 - End of Pool Screen

### Added
- Added an animated completion screen when every selectable killer has been rolled.
- Added a DBD-inspired dark overlay with fog movement, red glow, and a pulsing mark.
- Added a reset button inside the completion screen.

## v0.11.1 - Centered Randomizer Layout

### Changed
- Recentered the main randomizer on desktop.
- Moved Recently Played into a right-side companion position so it no longer shifts the main panel.

## v0.11 - Recently Played

### Added
- Added a right-side Recently Played panel.
- Recently played killers are saved in localStorage.
- The panel shows the last five completed rolls with small portraits.

### Changed
- The main layout now supports a side panel on desktop and stacks cleanly on smaller screens.

## v0.10.2 - Spinning Portrait Preview

### Added
- The main portrait frame now updates during the roulette spin.
- Preview portraits now stay in sync with the spinning killer name and gallery highlight.

## v0.10.1 - Portrait Framing Polish

### Changed
- Updated the main portrait frame to match the square DVVEET portrait format.
- Updated gallery portrait slots to use square framing so portraits are no longer vertically cropped.
- Added subtle inner framing to make portraits feel more integrated with the menu-style UI.

## v0.10 - DVVEET Portrait Pack

### Added
- Added DVVEET portrait pack images for 39 killers from the local Dead by Daylight install.
- Added a DVVEET portrait for The Cenobite while keeping him not selectable.

### Changed
- Updated The Shape to use the DVVEET portrait.
- Updated older killer image paths to use `images/killers/dvveet/`.

### Notes
- The Animatronic, The Krasue, The First, and The Slasher still use official portraits because the installed DVVEET pack does not include them yet.

## v0.9 - Portrait Pass

### Added
- Added official Dead by Daylight headshots for 41 killers.
- Added `PORTRAITS.md` to track portrait status.

### Changed
- Updated killer image paths to use the downloaded `.png` files where available.
- Preserved the existing Shape portrait.

### Notes
- The Cenobite portrait is still missing because he is not present in the current official character data.

## v0.8 - Owned Killer Controls

### Added
- Added Include and Exclude controls to each killer gallery card.
- Added saved ownership preferences using localStorage.

### Changed
- Not-owned killers can now be managed from the app instead of only through code.
- The randomizer, progress count, and reset pool now follow the current owned killer list.
- Ownership controls now use compact corner buttons instead of a full-width row.

## v0.7 - Roulette Animation

### Added
- Added a roulette animation that cycles through killer names before choosing.
- Added a slowdown effect before the final killer is revealed.
- Added reveal animations for the final killer name and portrait.
- Added a moving white gallery highlight during the roulette spin.

### Changed
- Random and reset buttons are temporarily disabled while the roulette is spinning.

## v0.6.2 - Not Owned Killer Support

### Added
- Added support for killers that appear in the gallery but are not selectable.

### Changed
- Marked The Cenobite as not owned.
- The randomizer now excludes not-owned killers from the remaining pool.
- Progress counts now use selectable killers instead of the full roster.

## v0.6.1 - Full Killer Roster

### Added
- Expanded the killer roster from 5 killers to 43 killers.
- Added The Slasher as the latest killer entry.

### Changed
- New killers are automatically treated as available when the roster grows.

## v0.6 - Killer Gallery

### Added
- Added a responsive killer gallery below the randomizer controls.
- Added visual available/selected states for every killer.
- Added portrait fallbacks so killers without image files still appear cleanly in the gallery.
- Added a progress bar and selected-count text.

### Changed
- The gallery now updates after every random killer pick.
- The gallery now resets together with the remaining killer pool.
- Saved localStorage progress is reflected in the gallery when the page loads.
- Empty saved pools now stay empty after refresh instead of refilling automatically.

## v0.5 - The Entity's Choice Makeover

### Added
- Added the proper page title and app name, `The Entity's Choice`.
- Added a darker menu-inspired visual style.
- Added a more intentional portrait frame with glow and depth.
- Added responsive styling for smaller screens.

### Changed
- Reworked the page structure into a cleaner main app layout.
- Updated button styling, title styling, spacing, and background atmosphere.

## v0.4 - Foundation Update

### Added
- Added stable `id` values to every killer.
- Added localStorage saving for the remaining killer pool.
- Added `ROADMAP.md` to track future milestones.
- Added `CHANGELOG.md` to record completed changes.

### Changed
- The remaining counter now shows both remaining killers and total killers.
- The randomizer now saves progress after each pick and after reset.
- Killer portraits now fit fully inside the portrait frame instead of being cropped.

### Notes
- The app still supports the existing portrait system.
- Only The Shape currently has a portrait file in the project.
