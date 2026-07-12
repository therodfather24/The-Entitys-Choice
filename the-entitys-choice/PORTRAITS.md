# Portrait Checklist

## Current Status
- Every killer in `killers.js` has a working portrait path.
- Most killers use DVVEET portrait pack images.
- The Shape uses the DVVEET portrait.
- The Cenobite has a DVVEET portrait, but remains not selectable by default.

## Fallback Portraits
DVVEET portraits for the newest four killers are not present in the installed pack files yet:
  - The Animatronic
  - The Krasue
  - The First
  - The Slasher

Those four currently keep using the official Dead by Daylight headshots.

## Filename Pattern
Portraits live in:

```text
images/killers/
images/killers/dvveet/
```

Each killer entry in `killers.js` points to its image file.
