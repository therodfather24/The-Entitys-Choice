const storageKey = "entitysChoiceRemainingKillers";
const rosterStorageKey = "entitysChoiceKnownKillerIds";
const ownershipStorageKey = "entitysChoiceNotOwnedKillerIds";
const recentStorageKey = "entitysChoiceRecentlyPlayed";
const removePickedStorageKey = "entitysChoiceRemovePickedKillers";
const selectedStorageKey = "entitysChoiceSelectedKillers";
const matchHistoryStorageKey = "entitysChoiceMatchHistory";
const statSettingsStorageKey = "entitysChoiceStatSettings";
const challengeModeStorageKey = "entitysChoiceChallengeMode";
const challengeCategoriesStorageKey = "entitysChoiceChallengeCategories";
const perkBuildsStorageKey = "entitysChoicePerkBuildsEnabled";
const recentPerkBuildsStorageKey = "entitysChoiceRecentPerkBuilds";
const statsDateFilterStorageKey = "entitysChoiceStatsDateFilter";
const setupCompleteStorageKey = "entitysChoiceSetupComplete";
const appStorageKeys = [
    storageKey,
    rosterStorageKey,
    ownershipStorageKey,
    recentStorageKey,
    removePickedStorageKey,
    selectedStorageKey,
    matchHistoryStorageKey,
    statSettingsStorageKey,
    challengeModeStorageKey,
    challengeCategoriesStorageKey,
    perkBuildsStorageKey,
    recentPerkBuildsStorageKey,
    statsDateFilterStorageKey,
    setupCompleteStorageKey
];
const originalRosterIds = ["trapper", "wraith", "hillbilly", "nurse", "shape"];
const recentLimit = 5;
const defaultNotOwnedIds = killers
    .filter(killer => killer.selectable === false)
    .map(killer => killer.id);
const spinSteps = 24;
const spinStartDelay = 35;
const spinSlowdown = 9;
const defaultChallengeCategories = {
    loadout: true,
    playstyle: true,
    pressure: true,
    mercy: true
};
const killerChallenges = [
    {
        category: "loadout",
        title: "No Perks",
        description: "Run the match with an empty perk loadout."
    },
    {
        category: "loadout",
        title: "Only Iri Addons",
        description: "Use only iridescent addons if this killer has them."
    },
    {
        category: "loadout",
        title: "Hex Build",
        description: "Bring as many Hex perks as your loadout allows."
    },
    {
        category: "loadout",
        title: "Gen Regress / Slowdown",
        description: "Build around slowing or regressing generators."
    },
    {
        category: "pressure",
        title: "Tunnel Vision",
        description: "Commit hard to one survivor once you choose them."
    },
    {
        category: "pressure",
        title: "Slug Pressure",
        description: "Use slugging as your main pressure tool this match."
    },
    {
        category: "playstyle",
        title: "Basic Attacks Only",
        description: "Avoid damaging survivors with your power."
    },
    {
        category: "playstyle",
        title: "Power First",
        description: "Your first hit on each survivor must involve your power if possible."
    },
    {
        category: "mercy",
        title: "No Generator Kicks",
        description: "Do not kick generators for the entire match."
    },
    {
        category: "mercy",
        title: "One Hook Rotation",
        description: "Hook every survivor once before you sacrifice anyone."
    },
    {
        category: "pressure",
        title: "Basement Hunger",
        description: "Try to make every hook a basement hook when possible."
    },
    {
        category: "loadout",
        title: "Endgame Build",
        description: "Bring perks that get stronger once gates are powered."
    },
    {
        category: "loadout",
        title: "Aura Hunter",
        description: "Build around aura reading and information perks."
    },
    {
        category: "loadout",
        title: "No Addons",
        description: "Run the killer with no addons equipped."
    },
    {
        category: "mercy",
        title: "Mercy Rule",
        description: "If someone is on death hook early, leave them for later."
    },
    {
        category: "playstyle",
        title: "Relentless Chase",
        description: "Prioritize long chases over generator defense."
    }
];
const perkBuildStyles = {
    balanced: {
        label: "Balanced",
        names: ["Balanced Pressure", "All-Purpose Trial", "Entity's Toolbox"],
        roles: [
            ["slowdown", "regression", "generator", "block"],
            ["aura", "info", "tracking", "scream"],
            ["chase", "haste", "pallet", "vault"],
            ["hook", "endgame", "hex", "pressure", "obsession"]
        ]
    },
    slowdown: {
        label: "Slowdown",
        names: ["Generator Lockdown", "Long Trial", "No Easy Repairs"],
        tags: ["slowdown", "regression", "generator", "block", "hook"]
    },
    aura: {
        label: "Aura / Info",
        names: ["Eyes in the Fog", "Information Hunt", "Nowhere to Hide"],
        tags: ["aura", "info", "tracking", "scream", "healing"]
    },
    chase: {
        label: "Chase",
        names: ["Relentless Chase", "No Pallet Is Safe", "Blood Rush"],
        tags: ["chase", "haste", "pallet", "vault", "stun", "break", "basic-attack"]
    },
    stealth: {
        label: "Stealth",
        names: ["Quiet Approach", "From the Dark", "Silent Pressure"],
        tags: ["stealth", "undetectable", "oblivious", "terror-radius", "aura"]
    },
    hex: {
        label: "Hex",
        names: ["Totem Gamble", "Hex Trial", "Cursed Pressure"],
        tags: ["hex", "totem", "slowdown", "pressure"]
    },
    "scourge-hook": {
        label: "Scourge Hook",
        names: ["Hook Pressure", "Pain Trial", "Basement Invitation"],
        tags: ["scourge-hook", "hook", "regression", "aura", "slowdown"]
    },
    endgame: {
        label: "Endgame",
        names: ["Exit Gate Panic", "Last Chance", "No One Leaves Clean"],
        tags: ["endgame", "gate", "exposed", "hook", "obsession"]
    },
    chaos: {
        label: "Chaos",
        names: ["Entity's Whim", "Wildcard Trial", "Questionable Decisions"],
        tags: []
    }
};

const button = document.getElementById("randomButton");
const resetButton = document.getElementById("resetButton");
const endResetButton = document.getElementById("endResetButton");
const removePickedToggle = document.getElementById("removePickedToggle");
const challengeModeToggle = document.getElementById("challengeModeToggle");
const perkBuildToggle = document.getElementById("perkBuildToggle");
const challengeLoadoutToggle = document.getElementById("challengeLoadoutToggle");
const challengePlaystyleToggle = document.getElementById("challengePlaystyleToggle");
const challengePressureToggle = document.getElementById("challengePressureToggle");
const challengeMercyToggle = document.getElementById("challengeMercyToggle");
const ownedKillerList = document.getElementById("ownedKillerList");
const ownedKillerCount = document.getElementById("ownedKillerCount");
const setupScreen = document.getElementById("setupScreen");
const setupRemovePickedToggle = document.getElementById("setupRemovePickedToggle");
const setupChallengeToggle = document.getElementById("setupChallengeToggle");
const finishSetupButton = document.getElementById("finishSetupButton");

const display = document.getElementById("killerDisplay");
const selectedKillerStats = document.getElementById("selectedKillerStats");
const challengeDisplay = document.getElementById("challengeDisplay");
const perkBuildPanel = document.getElementById("perkBuildPanel");
const perkStyleSelect = document.getElementById("perkStyleSelect");
const rollPerksButton = document.getElementById("rollPerksButton");
const clearPerkBuildButton = document.getElementById("clearPerkBuildButton");
const perkBuildMeta = document.getElementById("perkBuildMeta");
const perkCardGrid = document.getElementById("perkCardGrid");
const perkBuildNote = document.getElementById("perkBuildNote");
const remaining = document.getElementById("remaining");
const cycleSummaryGrid = document.getElementById("cycleSummaryGrid");
const image = document.getElementById("killerImage");
const gallery = document.getElementById("killerGallery");
const gallerySubtitle = document.getElementById("gallerySubtitle");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const recentList = document.getElementById("recentList");
const endScreen = document.getElementById("endScreen");
const endFinalKiller = document.getElementById("endFinalKiller");
const endFinalName = document.getElementById("endFinalName");
const matchTracker = document.getElementById("matchTracker");
const trackingKillerName = document.getElementById("trackingKillerName");
const toggleTrackerButton = document.getElementById("toggleTrackerButton");
const matchForm = document.getElementById("matchForm");
const saveMatchButton = document.getElementById("saveMatchButton");
const cancelTrackerButton = document.getElementById("cancelTrackerButton");
const killsInput = document.getElementById("killsInput");
const generatorsInput = document.getElementById("generatorsInput");
const mapInput = document.getElementById("mapInput");
const notesInput = document.getElementById("notesInput");
const killsField = document.getElementById("killsField");
const generatorsField = document.getElementById("generatorsField");
const mapField = document.getElementById("mapField");
const notesField = document.getElementById("notesField");
const trackKillsToggle = document.getElementById("trackKillsToggle");
const trackGeneratorsToggle = document.getElementById("trackGeneratorsToggle");
const trackMapToggle = document.getElementById("trackMapToggle");
const trackNotesToggle = document.getElementById("trackNotesToggle");
const statsKillerSelect = document.getElementById("statsKillerSelect");
const statsDateFilter = document.getElementById("statsDateFilter");
const toggleHistoryButton = document.getElementById("toggleHistoryButton");
const clearSelectedStatsButton = document.getElementById("clearSelectedStatsButton");
const clearStatsButton = document.getElementById("clearStatsButton");
const exportSaveButton = document.getElementById("exportSaveButton");
const importSaveButton = document.getElementById("importSaveButton");
const importSaveInput = document.getElementById("importSaveInput");
const resetSetupButton = document.getElementById("resetSetupButton");
const clearProgressButton = document.getElementById("clearProgressButton");
const clearAppDataButton = document.getElementById("clearAppDataButton");
const statsSummary = document.getElementById("statsSummary");
const matchHistory = document.getElementById("matchHistory");

let notOwnedIds = loadNotOwnedIds();
let remainingKillers = loadRemainingKillers();
let recentlyPlayed = loadRecentlyPlayed();
let finalKiller = null;
let isSpinning = false;
let shouldRemovePickedKillers = loadRemovePickedSetting();
let challengeModeEnabled = loadChallengeModeSetting();
let challengeCategories = loadChallengeCategories();
let perkBuildsEnabled = loadPerkBuildsSetting();
let currentPerkBuild = [];
let currentPerkBuildName = "";
let lockedPerkIds = new Set();
let recentPerkBuilds = loadRecentPerkBuilds();
let currentKiller = null;
let trackedMatches = loadTrackedMatches();
let statSettings = loadStatSettings();
let editingMatchId = null;
let isHistoryCollapsed = true;

removePickedToggle.checked = shouldRemovePickedKillers;
challengeModeToggle.checked = challengeModeEnabled;
perkBuildToggle.checked = perkBuildsEnabled;
applyChallengeCategoriesToInputs();
statsDateFilter.value = loadStatsDateFilter();
trackKillsToggle.checked = statSettings.kills;
trackGeneratorsToggle.checked = statSettings.generators;
trackMapToggle.checked = statSettings.map;
trackNotesToggle.checked = statSettings.notes;

updateRemaining();
updateProgress();
updateCycleSummary();
updateGallery();
updateOwnedKillerList();
updateRecentlyPlayed();
updateEndScreen();
updateTrackerVisibility();
updateStatFields();
updateStats();
updatePerkBuildVisibility();
updateSetupScreen();

button.addEventListener("click", randomize);

resetButton.addEventListener("click", resetPool);
endResetButton.addEventListener("click", resetPool);
removePickedToggle.addEventListener("change", updateRemovePickedMode);
challengeModeToggle.addEventListener("change", updateChallengeMode);
perkBuildToggle.addEventListener("change", updatePerkBuildMode);
rollPerksButton.addEventListener("click", () => rollPerkBuild());
clearPerkBuildButton.addEventListener("click", clearPerkBuild);
perkStyleSelect.addEventListener("change", () => {
    if(currentPerkBuild.length > 0){
        lockedPerkIds.clear();
        currentPerkBuildName = "";
        rollPerkBuild();
    } else {
        renderPerkBuild();
    }
});
challengeLoadoutToggle.addEventListener("change", updateChallengeCategories);
challengePlaystyleToggle.addEventListener("change", updateChallengeCategories);
challengePressureToggle.addEventListener("change", updateChallengeCategories);
challengeMercyToggle.addEventListener("change", updateChallengeCategories);
finishSetupButton.addEventListener("click", finishSetup);
toggleTrackerButton.addEventListener("click", showMatchForm);
cancelTrackerButton.addEventListener("click", hideMatchForm);
matchForm.addEventListener("submit", saveTrackedMatch);
statsKillerSelect.addEventListener("change", updateStats);
statsDateFilter.addEventListener("change", updateStatsDateFilter);
toggleHistoryButton.addEventListener("click", toggleMatchHistory);
clearSelectedStatsButton.addEventListener("click", clearSelectedKillerStats);
clearStatsButton.addEventListener("click", clearTrackedMatches);
exportSaveButton.addEventListener("click", exportSaveData);
importSaveButton.addEventListener("click", () => {
    importSaveInput.click();
});
importSaveInput.addEventListener("change", importSaveData);
resetSetupButton.addEventListener("click", resetSetupPrompt);
clearProgressButton.addEventListener("click", clearSavedProgress);
clearAppDataButton.addEventListener("click", clearAllAppData);
trackKillsToggle.addEventListener("change", updateStatSettings);
trackGeneratorsToggle.addEventListener("change", updateStatSettings);
trackMapToggle.addEventListener("change", updateStatSettings);
trackNotesToggle.addEventListener("change", updateStatSettings);

function randomize(){

    if(isSpinning){
        return;
    }

    const randomPool = getRandomPool();

    if(randomPool.length === 0){

        display.textContent = getSelectableKillers().length === 0
        ? "No killers are selectable"
        : (shouldRemovePickedKillers ? "The Entity is satisfied" : "No killers are selectable");
        image.classList.remove("portrait-spinning", "portrait-revealed");
        image.style.display = "none";

        if(shouldRemovePickedKillers && getSelectableKillers().length > 0){
            showEndScreen();
        }

        return;

    }

    if(randomPool.length === 1){
        prepareInstantReveal();
        finishRandomize(randomPool[0]);
        return;
    }

    isSpinning = true;
    button.disabled = true;
    resetButton.disabled = true;
    display.classList.remove("killer-name-revealed");
    display.classList.add("killer-name-spinning");
    hideSelectedKillerStats();
    hideChallenge();
    image.classList.remove("portrait-revealed", "portrait-spinning");
    image.style.display = "none";

    const chosen = randomPool[Math.floor(Math.random() * randomPool.length)];

    spinKillerNames(0, chosen, randomPool);

}

function prepareInstantReveal(){

    display.classList.remove("killer-name-spinning", "killer-name-revealed");
    hideSelectedKillerStats();
    hideChallenge();
    image.classList.remove("portrait-revealed", "portrait-spinning");
    image.style.display = "none";

}

function spinKillerNames(step, chosen, randomPool){

    if(step >= spinSteps){
        finishRandomize(chosen);
        return;
    }

    const preview = randomPool[Math.floor(Math.random() * randomPool.length)];

    display.textContent = preview.name;
    highlightGalleryCard(preview.id);
    showPreviewPortrait(preview);

    const nextDelay = spinStartDelay + (step * spinSlowdown);

    setTimeout(() => {
        spinKillerNames(step + 1, chosen, randomPool);
    }, nextDelay);

}

function finishRandomize(chosen){

    if(shouldRemovePickedKillers){
        remainingKillers = remainingKillers.filter(killer => killer.id !== chosen.id);
    }

    highlightGalleryCard(chosen.id);

    display.classList.remove("killer-name-spinning");
    void display.offsetWidth;
    display.classList.add("killer-name-revealed");
    display.textContent = chosen.name;

    image.onload = () => {
        image.classList.remove("portrait-revealed", "portrait-spinning");
        void image.offsetWidth;
        image.classList.add("portrait-revealed");
        image.style.display = "block";
    };

    image.onerror = () => {
        image.style.display = "none";
    };

    image.src = chosen.image;
    image.alt = `${chosen.name} Portrait`;

    if(image.complete){
        image.onload();
    }

    addRecentlyPlayed(chosen);
    finalKiller = chosen;
    currentKiller = chosen;

    isSpinning = false;
    button.disabled = false;
    resetButton.disabled = false;

    saveRemainingKillers();
    saveSelectedKillers();
    updateRemaining();
    updateProgress();
    updateGallery();
    updateRecentlyPlayed();
    updateTrackerVisibility();
    updateSelectedKillerStats();
    updateChallenge(chosen);
    clearGalleryHighlight();
    updateEndScreen();
    updateCycleSummary();
    updateStats();

}

function showPreviewPortrait(killer){

    image.onload = null;
    image.onerror = () => {
        image.style.display = "none";
    };

    image.classList.remove("portrait-revealed");
    image.classList.add("portrait-spinning");
    image.src = killer.image;
    image.alt = `${killer.name} Portrait`;
    image.style.display = "block";

}

function resetPool(){

    if(isSpinning){
        return;
    }

    remainingKillers = [...getSelectableKillers()];
    recentlyPlayed = [];

    display.textContent = "Pool Reset!";
    display.classList.remove("killer-name-spinning", "killer-name-revealed");
    image.classList.remove("portrait-revealed", "portrait-spinning");
    image.style.display = "none";
    finalKiller = null;
    currentKiller = null;
    hideSelectedKillerStats();
    hideChallenge();
    hideMatchForm();
    hideEndScreen();

    saveRemainingKillers();
    saveSelectedKillers();
    saveRecentlyPlayed();
    updateRemaining();
    updateProgress();
    updateCycleSummary();
    updateGallery();
    updateOwnedKillerList();
    updateRecentlyPlayed();
    updateTrackerVisibility();
    updateEndScreen();
    updateStats();

}

function updateRemaining(){

    if(!shouldRemovePickedKillers){
        remaining.textContent =
        `Repeat Mode: ${getSelectableKillers().length} killers available`;
        return;
    }

    remaining.textContent =
    `Remaining Killers: ${remainingKillers.length} / ${getSelectableKillers().length}`;

}

function updateProgress(){

    const selectableKillers = getSelectableKillers();

    if(!shouldRemovePickedKillers){
        progressText.textContent = "Repeat mode";
        progressFill.style.width = "0%";
        gallerySubtitle.textContent = "Selected killers stay available and can be rolled again.";
        return;
    }

    const selectedCount = selectableKillers.length - remainingKillers.length;
    const selectedPercent = selectableKillers.length === 0
    ? 0
    : (selectedCount / selectableKillers.length) * 100;

    progressText.textContent = `${selectedCount} selected`;
    progressFill.style.width = `${selectedPercent}%`;
    gallerySubtitle.textContent = "Selected killers are claimed by the Entity until the pool resets.";

}

function updateCycleSummary(){

    cycleSummaryGrid.innerHTML = "";

    const selectableKillers = getSelectableKillers();
    const selectedKillers = getSelectedKillers();
    const cycleMatches = trackedMatches.filter(match => {
        return selectedKillers.some(killer => killer.id === match.killerId);
    });
    const matchesWithKills = cycleMatches.filter(match => Number.isFinite(match.kills));
    const totalKills = matchesWithKills.reduce((sum, match) => sum + match.kills, 0);
    const averageKills = matchesWithKills.length === 0 ? "-" : formatStatNumber(totalKills / matchesWithKills.length);

    addCycleSummaryItem("Selected", shouldRemovePickedKillers ? `${selectedKillers.length} / ${selectableKillers.length}` : "Repeat");
    addCycleSummaryItem("Remaining", shouldRemovePickedKillers ? remainingKillers.length : selectableKillers.length);
    addCycleSummaryItem("Tracked", cycleMatches.length);
    addCycleSummaryItem("Avg Kills", averageKills);

}

function addCycleSummaryItem(label, value){

    const item = document.createElement("div");
    item.className = "cycle-summary-item";

    const valueElement = document.createElement("strong");
    valueElement.textContent = value;

    const labelElement = document.createElement("span");
    labelElement.textContent = label;

    item.appendChild(valueElement);
    item.appendChild(labelElement);
    cycleSummaryGrid.appendChild(item);

}

function getSelectedKillers(){

    const remainingIdSet = new Set(remainingKillers.map(killer => killer.id));

    return getSelectableKillers().filter(killer => !remainingIdSet.has(killer.id));

}

function updateEndScreen(){

    if(shouldRemovePickedKillers && remainingKillers.length === 0 && getSelectableKillers().length > 0 && !isSpinning){
        showEndScreen();
        return;
    }

    hideEndScreen();

}

function updateSetupScreen(){

    const setupComplete = localStorage.getItem(setupCompleteStorageKey) === "true";

    if(setupComplete){
        setupScreen.classList.remove("setup-screen-visible");
        setupScreen.setAttribute("aria-hidden", "true");
        return;
    }

    setupRemovePickedToggle.checked = shouldRemovePickedKillers;
    setupChallengeToggle.checked = challengeModeEnabled;

    setupScreen.classList.add("setup-screen-visible");
    setupScreen.setAttribute("aria-hidden", "false");

}

function finishSetup(){

    shouldRemovePickedKillers = setupRemovePickedToggle.checked;
    challengeModeEnabled = setupChallengeToggle.checked;

    localStorage.setItem(removePickedStorageKey, JSON.stringify(shouldRemovePickedKillers));
    localStorage.setItem(challengeModeStorageKey, JSON.stringify(challengeModeEnabled));

    removePickedToggle.checked = shouldRemovePickedKillers;
    challengeModeToggle.checked = challengeModeEnabled;
    localStorage.setItem(setupCompleteStorageKey, "true");

    setupScreen.classList.remove("setup-screen-visible");
    setupScreen.setAttribute("aria-hidden", "true");

    if(!challengeModeEnabled){
        hideChallenge();
    } else if(currentKiller){
        updateChallenge(currentKiller);
    }

    updateRemaining();
    updateProgress();
    updateCycleSummary();
    updateGallery();
    updateOwnedKillerList();
    updateEndScreen();
    updateStats();
    prunePerkBuildForOwnership();

}

function showEndScreen(){

    updateEndFinalKiller();
    endScreen.classList.add("end-screen-visible");
    endScreen.setAttribute("aria-hidden", "false");

}

function hideEndScreen(){

    endScreen.classList.remove("end-screen-visible");
    endScreen.setAttribute("aria-hidden", "true");

}

function updateEndFinalKiller(){

    const recentFinalKiller = recentlyPlayed.length > 0
    ? killers.find(killer => killer.id === recentlyPlayed[0])
    : null;
    const displayedFinalKiller = finalKiller || recentFinalKiller;

    if(!displayedFinalKiller){
        endFinalKiller.hidden = true;
        endFinalName.textContent = "";
        return;
    }

    endFinalName.textContent = displayedFinalKiller.name;
    endFinalKiller.hidden = false;

}

function updateGallery(){

    gallery.innerHTML = "";

    killers.forEach(killer => {

        const isSelectable = !notOwnedIds.includes(killer.id);
        const isAvailable = isSelectable && (
            !shouldRemovePickedKillers ||
            remainingKillers.some(remainingKiller => remainingKiller.id === killer.id)
        );

        const card = document.createElement("article");
        card.className = "killer-card";
        card.dataset.killerId = killer.id;

        if(!isSelectable){
            card.classList.add("killer-card-disabled");
        } else if(!isAvailable){
            card.classList.add("killer-card-used");
        }

        const portrait = document.createElement("img");
        portrait.src = killer.image;
        portrait.alt = `${killer.name} Portrait`;

        portrait.onerror = () => {
            portrait.style.display = "none";
        };

        const fallback = document.createElement("div");
        fallback.className = "gallery-fallback";
        fallback.textContent = killer.name;

        const name = document.createElement("p");
        name.textContent = killer.name;

        const status = document.createElement("span");
        status.textContent = isSelectable
        ? (isAvailable ? "Available" : "Selected")
        : "Not Owned";

        const statBadgeText = getGalleryStatBadgeText(killer.id);
        const statBadge = document.createElement("div");
        statBadge.className = "killer-stat-badge";
        statBadge.textContent = statBadgeText;
        statBadge.hidden = statBadgeText === "";

        card.appendChild(portrait);
        card.appendChild(fallback);
        card.appendChild(name);
        card.appendChild(status);
        card.appendChild(statBadge);

        gallery.appendChild(card);

    });

}

function updateOwnedKillerList(){

    ownedKillerList.innerHTML = "";

    const ownedCount = killers.length - notOwnedIds.length;
    ownedKillerCount.textContent = `${ownedCount} / ${killers.length} selectable`;

    killers.forEach(killer => {

        const isOwned = !notOwnedIds.includes(killer.id);
        const row = document.createElement("label");
        row.className = "owned-killer-row";

        const portrait = document.createElement("img");
        portrait.src = killer.image;
        portrait.alt = `${killer.name} Portrait`;

        portrait.onerror = () => {
            portrait.style.display = "none";
        };

        const name = document.createElement("span");
        name.className = "owned-killer-name";
        name.textContent = killer.name;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = isOwned;
        checkbox.addEventListener("change", () => {
            setKillerOwnership(killer.id, checkbox.checked);
        });

        const switchTrack = document.createElement("span");
        switchTrack.className = "owned-switch";
        switchTrack.setAttribute("aria-hidden", "true");

        const switchThumb = document.createElement("span");
        switchThumb.className = "owned-switch-thumb";

        switchTrack.appendChild(switchThumb);

        row.appendChild(portrait);
        row.appendChild(name);
        row.appendChild(checkbox);
        row.appendChild(switchTrack);
        ownedKillerList.appendChild(row);

    });

}

function addRecentlyPlayed(killer){

    recentlyPlayed = [
        killer.id,
        ...recentlyPlayed.filter(id => id !== killer.id)
    ].slice(0, recentLimit);

    saveRecentlyPlayed();

}

function saveRecentlyPlayed(){

    localStorage.setItem(recentStorageKey, JSON.stringify(recentlyPlayed));

}

function updateRecentlyPlayed(){

    recentList.innerHTML = "";

    const recentKillers = recentlyPlayed
        .map(id => killers.find(killer => killer.id === id))
        .filter(killer => killer !== undefined);

    if(recentKillers.length === 0){

        const emptyMessage = document.createElement("p");
        emptyMessage.className = "recent-empty";
        emptyMessage.textContent = "No trials recorded";

        recentList.appendChild(emptyMessage);
        return;

    }

    recentKillers.forEach(killer => {

        const item = document.createElement("div");
        item.className = "recent-item";

        const portrait = document.createElement("img");
        portrait.src = killer.image;
        portrait.alt = `${killer.name} Portrait`;

        portrait.onerror = () => {
            portrait.style.display = "none";
        };

        const name = document.createElement("span");
        name.textContent = killer.name;

        const trackButton = document.createElement("button");
        trackButton.className = "recent-track-button";
        trackButton.type = "button";
        trackButton.textContent = "Track";
        trackButton.addEventListener("click", () => {
            trackRecentKiller(killer.id);
        });

        item.appendChild(portrait);
        item.appendChild(name);
        item.appendChild(trackButton);

        recentList.appendChild(item);

    });

}

function trackRecentKiller(killerId){

    const killer = killers.find(killer => killer.id === killerId);

    if(!killer){
        return;
    }

    currentKiller = killer;
    editingMatchId = null;
    matchForm.reset();
    applyStatSettingsToInputs();

    display.textContent = killer.name;
    display.classList.remove("killer-name-spinning");
    display.classList.add("killer-name-revealed");
    image.src = killer.image;
    image.alt = `${killer.name} Portrait`;
    image.classList.remove("portrait-spinning");
    image.classList.add("portrait-revealed");
    image.style.display = "block";

    updateTrackerVisibility();
    updateSelectedKillerStats();
    showMatchForm();
    matchTracker.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}

function updateTrackerVisibility(){

    if(!currentKiller){
        matchTracker.hidden = true;
        trackingKillerName.textContent = "Select a killer to track a match.";
        return;
    }

    matchTracker.hidden = false;
    trackingKillerName.textContent = currentKiller.name;

}

function updateSelectedKillerStats(){

    if(!currentKiller){
        hideSelectedKillerStats();
        return;
    }

    const killerMatches = trackedMatches.filter(match => match.killerId === currentKiller.id);

    if(killerMatches.length === 0){
        hideSelectedKillerStats();
        return;
    }

    const details = [`${killerMatches.length} tracked ${killerMatches.length === 1 ? "match" : "matches"}`];

    if(statSettings.kills){
        const matchesWithKills = killerMatches.filter(match => Number.isFinite(match.kills));

        if(matchesWithKills.length > 0){
            const totalKills = matchesWithKills.reduce((sum, match) => sum + match.kills, 0);
            details.push(`Avg kills ${formatStatNumber(totalKills / matchesWithKills.length)}`);
        }
    }

    if(statSettings.generators){
        const matchesWithGenerators = killerMatches.filter(match => Number.isFinite(match.generatorsLeft));

        if(matchesWithGenerators.length > 0){
            const totalGenerators = matchesWithGenerators.reduce((sum, match) => sum + match.generatorsLeft, 0);
            details.push(`Avg gens left ${formatStatNumber(totalGenerators / matchesWithGenerators.length)}`);
        }
    }

    selectedKillerStats.textContent = details.join(" - ");
    selectedKillerStats.hidden = false;

}

function hideSelectedKillerStats(){

    selectedKillerStats.hidden = true;
    selectedKillerStats.textContent = "";

}

function updateChallenge(killer){

    if(!challengeModeEnabled || !killer){
        hideChallenge();
        return;
    }

    const availableChallenges = getAvailableChallenges();
    const challenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];

    challengeDisplay.innerHTML = "";

    const eyebrow = document.createElement("span");
    eyebrow.textContent = `Challenge - ${formatChallengeCategory(challenge.category)}`;

    const title = document.createElement("strong");
    title.textContent = challenge.title;

    const description = document.createElement("p");
    description.textContent = challenge.description;

    const rerollButton = document.createElement("button");
    rerollButton.className = "challenge-reroll-button";
    rerollButton.type = "button";
    rerollButton.textContent = "Reroll Challenge";
    rerollButton.addEventListener("click", () => {
        updateChallenge(killer);
    });

    challengeDisplay.appendChild(eyebrow);
    challengeDisplay.appendChild(title);
    challengeDisplay.appendChild(description);
    challengeDisplay.appendChild(rerollButton);
    challengeDisplay.hidden = false;

}

function getAvailableChallenges(){

    const enabledCategories = Object.entries(challengeCategories)
        .filter(([, isEnabled]) => isEnabled)
        .map(([category]) => category);
    const availableChallenges = killerChallenges.filter(challenge => {
        return enabledCategories.includes(challenge.category);
    });

    return availableChallenges.length > 0 ? availableChallenges : killerChallenges;

}

function formatChallengeCategory(category){

    const labels = {
        loadout: "Loadout",
        playstyle: "Playstyle",
        pressure: "Pressure",
        mercy: "Mercy"
    };

    return labels[category] || "Mixed";

}

function hideChallenge(){

    challengeDisplay.hidden = true;
    challengeDisplay.innerHTML = "";

}

function showMatchForm(){

    if(!currentKiller){
        return;
    }

    saveMatchButton.textContent = editingMatchId === null ? "Save Match" : "Update Match";
    matchForm.hidden = false;
    toggleTrackerButton.hidden = true;

}

function hideMatchForm(){

    matchForm.hidden = true;
    toggleTrackerButton.hidden = false;
    matchForm.reset();
    editingMatchId = null;
    saveMatchButton.textContent = "Save Match";
    applyStatSettingsToInputs();

}

function saveTrackedMatch(event){

    event.preventDefault();

    if(!currentKiller){
        return;
    }

    const existingMatch = editingMatchId === null
    ? null
    : trackedMatches.find(match => match.id === editingMatchId);

    const match = {
        id: existingMatch ? existingMatch.id : Date.now(),
        killerId: currentKiller.id,
        killerName: currentKiller.name,
        date: existingMatch ? existingMatch.date : new Date().toISOString()
    };

    if(statSettings.kills){
        match.kills = Number(killsInput.value);
    }

    if(statSettings.generators){
        match.generatorsLeft = Number(generatorsInput.value);
    }

    if(statSettings.map){
        match.map = mapInput.value.trim();
    }

    if(statSettings.notes){
        match.notes = notesInput.value.trim();
    }

    trackedMatches = existingMatch
    ? trackedMatches.map(savedMatch => savedMatch.id === existingMatch.id ? match : savedMatch)
    : [match, ...trackedMatches];

    localStorage.setItem(matchHistoryStorageKey, JSON.stringify(trackedMatches));

    hideMatchForm();
    updateSelectedKillerStats();
    updateCycleSummary();
    updateGallery();
    updateStats();

}

function editTrackedMatch(matchId){

    const match = trackedMatches.find(match => match.id === matchId);

    if(!match){
        return;
    }

    const killer = killers.find(killer => killer.id === match.killerId);

    if(!killer){
        return;
    }

    currentKiller = killer;
    editingMatchId = match.id;
    killsInput.value = Number.isFinite(match.kills) ? String(match.kills) : "0";
    generatorsInput.value = Number.isFinite(match.generatorsLeft) ? String(match.generatorsLeft) : "0";
    mapInput.value = match.map || "";
    notesInput.value = match.notes || "";

    updateTrackerVisibility();
    updateSelectedKillerStats();
    showMatchForm();

}

function deleteTrackedMatch(matchId){

    const match = trackedMatches.find(match => match.id === matchId);

    if(!match){
        return;
    }

    const shouldDelete = window.confirm(`Delete the tracked match for ${match.killerName}?`);

    if(!shouldDelete){
        return;
    }

    trackedMatches = trackedMatches.filter(match => match.id !== matchId);
    localStorage.setItem(matchHistoryStorageKey, JSON.stringify(trackedMatches));

    if(editingMatchId === matchId){
        hideMatchForm();
    }

    updateSelectedKillerStats();
    updateCycleSummary();
    updateGallery();
    updateStats();

}

function clearTrackedMatches(){

    if(trackedMatches.length === 0){
        return;
    }

    const shouldClear = window.confirm("Clear all tracked killer match stats?");

    if(!shouldClear){
        return;
    }

    trackedMatches = [];
    localStorage.setItem(matchHistoryStorageKey, JSON.stringify(trackedMatches));
    hideMatchForm();
    updateSelectedKillerStats();
    updateCycleSummary();
    updateGallery();
    updateStats();

}

function clearSelectedKillerStats(){

    const selectedKillerId = statsKillerSelect.value;

    if(selectedKillerId === "all"){
        return;
    }

    const selectedKiller = killers.find(killer => killer.id === selectedKillerId);
    const selectedMatches = trackedMatches.filter(match => match.killerId === selectedKillerId);

    if(!selectedKiller || selectedMatches.length === 0){
        return;
    }

    const shouldClear = window.confirm(`Clear tracked stats for ${selectedKiller.name}?`);

    if(!shouldClear){
        return;
    }

    trackedMatches = trackedMatches.filter(match => match.killerId !== selectedKillerId);
    localStorage.setItem(matchHistoryStorageKey, JSON.stringify(trackedMatches));

    if(currentKiller && currentKiller.id === selectedKillerId){
        hideMatchForm();
    }

    updateSelectedKillerStats();
    updateCycleSummary();
    updateGallery();
    updateStats();

}

function toggleMatchHistory(){

    isHistoryCollapsed = !isHistoryCollapsed;
    syncHistoryVisibility();

}

function syncHistoryVisibility(){

    matchHistory.hidden = isHistoryCollapsed;
    toggleHistoryButton.textContent = isHistoryCollapsed ? "Show History" : "Hide History";

}

function rollPerkBuild(){

    const availablePerks = getOwnedKillerPerks();

    if(availablePerks.length < 4){
        currentPerkBuild = [];
        lockedPerkIds.clear();
        renderPerkBuild("You need at least four owned-killer perks available to roll a build.");
        return;
    }

    const styleKey = perkStyleSelect.value || "balanced";
    const style = perkBuildStyles[styleKey] || perkBuildStyles.balanced;
    const availableIds = new Set(availablePerks.map(perk => perk.id));
    const lockedPerks = currentPerkBuild
        .filter(perk => lockedPerkIds.has(perk.id) && availableIds.has(perk.id))
        .slice(0, 4);
    const usedIds = new Set(lockedPerks.map(perk => perk.id));
    const killerCounts = getKillerCounts(lockedPerks);
    const nextBuild = [...lockedPerks];

    if(style.roles){
        style.roles.forEach(roleTags => {
            if(nextBuild.length >= 4){
                return;
            }

            const perk = selectWeightedPerk(availablePerks, roleTags, usedIds, killerCounts, styleKey);

            if(perk){
                nextBuild.push(perk);
                usedIds.add(perk.id);
                killerCounts[perk.killerId] = (killerCounts[perk.killerId] || 0) + 1;
            }
        });
    }

    while(nextBuild.length < 4){
        const perk = selectWeightedPerk(availablePerks, style.tags || [], usedIds, killerCounts, styleKey);

        if(!perk){
            break;
        }

        nextBuild.push(perk);
        usedIds.add(perk.id);
        killerCounts[perk.killerId] = (killerCounts[perk.killerId] || 0) + 1;
    }

    currentPerkBuild = nextBuild.slice(0, 4);
    currentPerkBuildName = getRandomStyleName(style);
    lockedPerkIds = new Set([...lockedPerkIds].filter(id => currentPerkBuild.some(perk => perk.id === id)));
    rememberPerkBuild(currentPerkBuild);
    renderPerkBuild();

}

function rerollSinglePerk(perkId){

    const availablePerks = getOwnedKillerPerks();
    const styleKey = perkStyleSelect.value || "balanced";
    const style = perkBuildStyles[styleKey] || perkBuildStyles.balanced;
    const oldPerk = currentPerkBuild.find(perk => perk.id === perkId);
    const usedIds = new Set(currentPerkBuild.map(perk => perk.id));
    const remainingBuild = currentPerkBuild.filter(perk => perk.id !== perkId);
    const killerCounts = getKillerCounts(remainingBuild);

    usedIds.delete(perkId);

    const preferredTags = oldPerk ? oldPerk.tags : style.tags || [];
    const replacement = selectWeightedPerk(availablePerks, preferredTags, usedIds, killerCounts, styleKey);

    if(!replacement){
        return;
    }

    currentPerkBuild = currentPerkBuild.map(perk => perk.id === perkId ? replacement : perk);
    lockedPerkIds.delete(perkId);
    rememberPerkBuild(currentPerkBuild);
    renderPerkBuild();

}

function togglePerkLock(perkId){

    if(lockedPerkIds.has(perkId)){
        lockedPerkIds.delete(perkId);
    } else {
        lockedPerkIds.add(perkId);
    }

    renderPerkBuild();

}

function clearPerkBuild(){

    currentPerkBuild = [];
    currentPerkBuildName = "";
    lockedPerkIds.clear();
    renderPerkBuild();

}

function renderPerkBuild(message){

    const availablePerks = getOwnedKillerPerks();
    const styleKey = perkStyleSelect.value || "balanced";
    const style = perkBuildStyles[styleKey] || perkBuildStyles.balanced;

    perkBuildMeta.innerHTML = "";
    perkCardGrid.innerHTML = "";

    if(currentPerkBuild.length === 0){
        addPerkMetaChip(`Style: ${style.label}`);
        addPerkMetaChip(`${availablePerks.length} perks in owned pool`);
        addPerkMetaChip("Locks + single rerolls ready");

        const emptyCard = document.createElement("article");
        emptyCard.className = "perk-card perk-card-empty";
        emptyCard.innerHTML = `
            <strong>No build rolled</strong>
            <span>Owned killers only</span>
            <p>Choose a style and roll when you want a perk build for the selected killer.</p>
        `;
        perkCardGrid.appendChild(emptyCard);
        perkBuildNote.textContent = message || "Pick a style, then roll a build. Lock perks you like and reroll the rest.";
        return;
    }

    const buildName = currentPerkBuildName || getRandomStyleName(style);
    const tagSummary = summarizeBuildTags(currentPerkBuild);

    addPerkMetaChip(`Build: ${buildName}`);
    addPerkMetaChip(`Style: ${style.label}`);
    addPerkMetaChip(`${availablePerks.length} perks in owned pool`);

    if(tagSummary){
        addPerkMetaChip(tagSummary);
    }

    currentPerkBuild.forEach(perk => {
        const killer = killers.find(killer => killer.id === perk.killerId);
        const isLocked = lockedPerkIds.has(perk.id);
        const card = document.createElement("article");

        card.className = isLocked ? "perk-card perk-card-locked" : "perk-card";

        const header = document.createElement("div");
        const name = document.createElement("strong");
        const source = document.createElement("span");
        const tags = document.createElement("div");
        const actions = document.createElement("div");
        const lockButton = document.createElement("button");
        const rerollButton = document.createElement("button");

        name.textContent = perk.name;
        source.textContent = killer ? killer.name : "Unknown Killer";
        header.appendChild(name);
        header.appendChild(source);

        tags.className = "perk-tags";
        perk.tags.slice(0, 3).forEach(tag => {
            const chip = document.createElement("em");
            chip.textContent = formatTagName(tag);
            tags.appendChild(chip);
        });

        actions.className = "perk-card-actions";
        lockButton.type = "button";
        lockButton.textContent = isLocked ? "Locked" : "Lock";
        lockButton.addEventListener("click", () => togglePerkLock(perk.id));

        rerollButton.type = "button";
        rerollButton.textContent = "Reroll";
        rerollButton.disabled = isLocked;
        rerollButton.addEventListener("click", () => rerollSinglePerk(perk.id));

        actions.appendChild(lockButton);
        actions.appendChild(rerollButton);

        card.appendChild(header);
        card.appendChild(tags);
        card.appendChild(actions);
        perkCardGrid.appendChild(card);
    });

    perkBuildNote.textContent = "Builds use perks from killers marked as owned. Lock anything you like, then reroll the rest.";

}

function addPerkMetaChip(text){

    const chip = document.createElement("span");
    chip.textContent = text;
    perkBuildMeta.appendChild(chip);

}

function getOwnedKillerPerks(){

    if(typeof killerPerks === "undefined"){
        return [];
    }

    const ownedKillerIds = new Set(killers
        .filter(killer => !notOwnedIds.includes(killer.id))
        .map(killer => killer.id));

    return killerPerks.filter(perk => ownedKillerIds.has(perk.killerId));

}

function prunePerkBuildForOwnership(){

    const ownedPerkIds = new Set(getOwnedKillerPerks().map(perk => perk.id));

    currentPerkBuild = currentPerkBuild.filter(perk => ownedPerkIds.has(perk.id));
    lockedPerkIds = new Set([...lockedPerkIds].filter(id => ownedPerkIds.has(id)));

    if(currentPerkBuild.length === 0){
        currentPerkBuildName = "";
    }

    if(perkBuildsEnabled){
        renderPerkBuild();
    }

}

function selectWeightedPerk(perks, targetTags, usedIds, killerCounts, styleKey){

    const candidates = perks
        .filter(perk => !usedIds.has(perk.id))
        .map(perk => ({
            perk,
            weight: getPerkWeight(perk, targetTags, killerCounts, styleKey)
        }))
        .filter(candidate => candidate.weight > 0);

    if(candidates.length === 0){
        return null;
    }

    const totalWeight = candidates.reduce((sum, candidate) => sum + candidate.weight, 0);
    let roll = Math.random() * totalWeight;

    for(const candidate of candidates){
        roll -= candidate.weight;

        if(roll <= 0){
            return candidate.perk;
        }
    }

    return candidates[candidates.length - 1].perk;

}

function getPerkWeight(perk, targetTags, killerCounts, styleKey){

    let weight = 8;
    const tagMatches = perk.tags.filter(tag => targetTags.includes(tag)).length;
    const recentlyUsed = recentPerkBuilds.flat().includes(perk.id);
    const sameKillerCount = killerCounts[perk.killerId] || 0;

    if(styleKey === "chaos"){
        weight += Math.floor(Math.random() * 10);
    } else {
        weight += tagMatches * 18;
    }

    if(recentlyUsed){
        weight -= 5;
    }

    if(sameKillerCount >= 1){
        weight -= 4;
    }

    if(sameKillerCount >= 2 && styleKey !== "chaos"){
        weight -= 10;
    }

    return Math.max(weight, 1);

}

function getKillerCounts(perks){

    return perks.reduce((counts, perk) => {
        counts[perk.killerId] = (counts[perk.killerId] || 0) + 1;
        return counts;
    }, {});

}

function getRandomStyleName(style){

    return style.names[Math.floor(Math.random() * style.names.length)];

}

function summarizeBuildTags(perks){

    const tagCounts = {};

    perks.forEach(perk => {
        perk.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });

    const topTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([tag]) => formatTagName(tag));

    return topTags.length > 0 ? topTags.join(" + ") : "";

}

function formatTagName(tag){

    return tag
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

}

function rememberPerkBuild(perks){

    if(perks.length !== 4){
        return;
    }

    recentPerkBuilds = [
        perks.map(perk => perk.id),
        ...recentPerkBuilds
    ].slice(0, 8);

    localStorage.setItem(recentPerkBuildsStorageKey, JSON.stringify(recentPerkBuilds));

}

function loadRecentPerkBuilds(){

    const savedBuilds = JSON.parse(localStorage.getItem(recentPerkBuildsStorageKey));

    if(!Array.isArray(savedBuilds)){
        return [];
    }

    return savedBuilds
        .filter(build => Array.isArray(build))
        .map(build => build.filter(id => typeof id === "string"))
        .slice(0, 8);

}

function exportSaveData(){

    const saveData = {
        app: "the-entitys-choice",
        version: 1,
        exportedAt: new Date().toISOString(),
        data: {
            remainingKillers: readSavedJson(storageKey, []),
            knownKillers: readSavedJson(rosterStorageKey, killers.map(killer => killer.id)),
            notOwnedKillers: [...notOwnedIds],
            recentlyPlayed: [...recentlyPlayed],
            removePickedKillers: shouldRemovePickedKillers,
            challengeMode: challengeModeEnabled,
            challengeCategories: {...challengeCategories},
            perkBuildsEnabled,
            recentPerkBuilds: [...recentPerkBuilds],
            statsDateFilter: statsDateFilter.value,
            selectedKillers: readSavedJson(selectedStorageKey, []),
            trackedMatches: [...trackedMatches],
            statSettings: {...statSettings}
        }
    };

    const blob = new Blob([JSON.stringify(saveData, null, 2)], {
        type: "application/json"
    });
    const downloadUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");

    downloadLink.href = downloadUrl;
    downloadLink.download = "the-entitys-choice-save.json";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    URL.revokeObjectURL(downloadUrl);

}

function importSaveData(event){

    const file = event.target.files[0];

    if(!file){
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        try {
            const saveData = JSON.parse(reader.result);

            if(saveData.app !== "the-entitys-choice" || !saveData.data){
                window.alert("That file does not look like a save from The Entity's Choice.");
                return;
            }

            const shouldImport = window.confirm("Importing this file will replace this browser's saved progress and stats. Continue?");

            if(!shouldImport){
                return;
            }

            applyImportedSaveData(saveData.data);
            window.alert("Save imported.");
        } catch(error) {
            window.alert("That save file could not be imported.");
        } finally {
            importSaveInput.value = "";
        }
    };

    reader.readAsText(file);

}

function applyImportedSaveData(data){

    const validIds = new Set(killers.map(killer => killer.id));
    const cleanIds = ids => Array.isArray(ids)
    ? ids.filter(id => validIds.has(id))
    : [];
    const knownKillerIds = cleanIds(data.knownKillers);

    localStorage.setItem(storageKey, JSON.stringify(cleanIds(data.remainingKillers)));
    localStorage.setItem(rosterStorageKey, JSON.stringify(knownKillerIds.length > 0 ? knownKillerIds : killers.map(killer => killer.id)));
    localStorage.setItem(ownershipStorageKey, JSON.stringify(cleanIds(data.notOwnedKillers)));
    localStorage.setItem(recentStorageKey, JSON.stringify(cleanIds(data.recentlyPlayed).slice(0, recentLimit)));
    localStorage.setItem(selectedStorageKey, JSON.stringify(cleanIds(data.selectedKillers)));
    localStorage.setItem(removePickedStorageKey, JSON.stringify(data.removePickedKillers !== false));
    localStorage.setItem(challengeModeStorageKey, JSON.stringify(data.challengeMode === true));
    localStorage.setItem(challengeCategoriesStorageKey, JSON.stringify(normalizeImportedChallengeCategories(data.challengeCategories)));
    localStorage.setItem(perkBuildsStorageKey, JSON.stringify(data.perkBuildsEnabled === true));
    localStorage.setItem(recentPerkBuildsStorageKey, JSON.stringify(normalizeImportedPerkBuilds(data.recentPerkBuilds)));
    localStorage.setItem(statsDateFilterStorageKey, ["all", "week", "month", "cycle"].includes(data.statsDateFilter) ? data.statsDateFilter : "all");
    localStorage.setItem(matchHistoryStorageKey, JSON.stringify(normalizeImportedMatches(data.trackedMatches, validIds)));
    localStorage.setItem(statSettingsStorageKey, JSON.stringify(normalizeImportedStatSettings(data.statSettings)));
    localStorage.setItem(setupCompleteStorageKey, "true");

    notOwnedIds = loadNotOwnedIds();
    remainingKillers = loadRemainingKillers();
    recentlyPlayed = loadRecentlyPlayed();
    shouldRemovePickedKillers = loadRemovePickedSetting();
    challengeModeEnabled = loadChallengeModeSetting();
    challengeCategories = loadChallengeCategories();
    perkBuildsEnabled = loadPerkBuildsSetting();
    recentPerkBuilds = loadRecentPerkBuilds();
    currentPerkBuild = [];
    lockedPerkIds.clear();
    trackedMatches = loadTrackedMatches();
    statSettings = loadStatSettings();
    currentKiller = null;
    finalKiller = null;
    currentPerkBuildName = "";
    editingMatchId = null;
    isSpinning = false;

    removePickedToggle.checked = shouldRemovePickedKillers;
    challengeModeToggle.checked = challengeModeEnabled;
    perkBuildToggle.checked = perkBuildsEnabled;
    applyChallengeCategoriesToInputs();
    statsDateFilter.value = loadStatsDateFilter();
    applyStatSettingsToInputs();
    hideMatchForm();
    hideSelectedKillerStats();
    hideChallenge();
    display.textContent = "The Fog Waits";
    display.classList.remove("killer-name-spinning", "killer-name-revealed");
    image.classList.remove("portrait-spinning", "portrait-revealed");
    image.style.display = "none";
    button.disabled = false;
    resetButton.disabled = false;

    saveRemainingKillers();
    saveSelectedKillers();
    updateRemaining();
    updateProgress();
    updateCycleSummary();
    updateGallery();
    updateOwnedKillerList();
    updateRecentlyPlayed();
    updateEndScreen();
    updateTrackerVisibility();
    updateStatFields();
    updateStats();
    updatePerkBuildVisibility();
    updateSetupScreen();

}

function resetSetupPrompt(){

    const shouldResetSetup = window.confirm("Show the first-run setup screen again?");

    if(!shouldResetSetup){
        return;
    }

    localStorage.removeItem(setupCompleteStorageKey);
    updateSetupScreen();

}

function clearSavedProgress(){

    const shouldClearProgress = window.confirm("Clear the current killer pool progress and recently played list? Your stats and owned killer settings will stay saved.");

    if(!shouldClearProgress){
        return;
    }

    resetPool();

}

function clearAllAppData(){

    const shouldClearData = window.confirm("Clear all saved data for The Entity's Choice in this browser? This includes progress, owned killers, settings, and tracked stats.");

    if(!shouldClearData){
        return;
    }

    appStorageKeys.forEach(key => {
        localStorage.removeItem(key);
    });

    window.location.reload();

}

function normalizeImportedMatches(matches, validIds){

    if(!Array.isArray(matches)){
        return [];
    }

    return matches
        .filter(match => match && validIds.has(match.killerId))
        .map(match => ({
            ...match,
            id: Number.isFinite(match.id) ? match.id : Date.now() + Math.floor(Math.random() * 100000),
            killerName: match.killerName || (killers.find(killer => killer.id === match.killerId) || {}).name || "Unknown Killer",
            date: match.date || new Date().toISOString()
        }));

}

function normalizeImportedStatSettings(settings){

    return {
        kills: !settings || settings.kills !== false,
        generators: !settings || settings.generators !== false,
        map: !settings || settings.map !== false,
        notes: !settings || settings.notes !== false
    };

}

function normalizeImportedChallengeCategories(categories){

    return {
        loadout: !categories || categories.loadout !== false,
        playstyle: !categories || categories.playstyle !== false,
        pressure: !categories || categories.pressure !== false,
        mercy: !categories || categories.mercy !== false
    };

}

function normalizeImportedPerkBuilds(builds){

    if(typeof killerPerks === "undefined" || !Array.isArray(builds)){
        return [];
    }

    const validPerkIds = new Set(killerPerks.map(perk => perk.id));

    return builds
        .filter(build => Array.isArray(build))
        .map(build => build.filter(id => validPerkIds.has(id)).slice(0, 4))
        .filter(build => build.length > 0)
        .slice(0, 8);

}

function readSavedJson(key, fallback){

    try {
        const savedValue = JSON.parse(localStorage.getItem(key));
        return savedValue === null ? fallback : savedValue;
    } catch(error) {
        return fallback;
    }

}

function updateStatSettings(){

    statSettings = {
        kills: trackKillsToggle.checked,
        generators: trackGeneratorsToggle.checked,
        map: trackMapToggle.checked,
        notes: trackNotesToggle.checked
    };

    localStorage.setItem(statSettingsStorageKey, JSON.stringify(statSettings));
    updateStatFields();
    updateSelectedKillerStats();
    updateStats();

}

function updateStatFields(){

    killsField.hidden = !statSettings.kills;
    generatorsField.hidden = !statSettings.generators;
    mapField.hidden = !statSettings.map;
    notesField.hidden = !statSettings.notes;
    applyStatSettingsToInputs();

}

function applyStatSettingsToInputs(){

    trackKillsToggle.checked = statSettings.kills;
    trackGeneratorsToggle.checked = statSettings.generators;
    trackMapToggle.checked = statSettings.map;
    trackNotesToggle.checked = statSettings.notes;

}

function updateStats(){

    updateStatsKillerOptions();

    const selectedKillerId = statsKillerSelect.value;
    const killerMatches = selectedKillerId === "all"
    ? trackedMatches
    : trackedMatches.filter(match => match.killerId === selectedKillerId);
    const visibleMatches = filterMatchesByDate(killerMatches, statsDateFilter.value);
    const selectedKillerHasMatches = selectedKillerId !== "all" && killerMatches.length > 0;

    renderStatsSummary(visibleMatches);
    renderMatchHistory(visibleMatches);
    syncHistoryVisibility();

    clearStatsButton.disabled = trackedMatches.length === 0;
    toggleHistoryButton.disabled = visibleMatches.length === 0;
    clearSelectedStatsButton.disabled = !selectedKillerHasMatches;
    clearSelectedStatsButton.title = selectedKillerId === "all"
    ? "Choose one killer to clear only their stats"
    : "Clear tracked stats for this killer";

}

function updateStatsDateFilter(){

    localStorage.setItem(statsDateFilterStorageKey, statsDateFilter.value);
    updateStats();

}

function filterMatchesByDate(matches, filter){

    if(filter === "cycle"){
        const selectedIds = new Set(getSelectedKillers().map(killer => killer.id));
        return matches.filter(match => selectedIds.has(match.killerId));
    }

    if(filter === "week"){
        const weekStart = getStartOfWeek(new Date());
        return matches.filter(match => new Date(match.date) >= weekStart);
    }

    if(filter === "month"){
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        return matches.filter(match => new Date(match.date) >= monthStart);
    }

    return matches;

}

function getStartOfWeek(date){

    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const day = start.getDay();
    const distanceFromMonday = day === 0 ? 6 : day - 1;

    start.setDate(start.getDate() - distanceFromMonday);
    start.setHours(0, 0, 0, 0);

    return start;

}

function updateStatsKillerOptions(){

    const currentValue = statsKillerSelect.value || "all";
    const matchedKillerIds = new Set(trackedMatches.map(match => match.killerId));

    statsKillerSelect.innerHTML = "";

    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "All Killers";
    statsKillerSelect.appendChild(allOption);

    killers
        .filter(killer => matchedKillerIds.has(killer.id))
        .forEach(killer => {
            const option = document.createElement("option");
            option.value = killer.id;
            option.textContent = killer.name;
            statsKillerSelect.appendChild(option);
        });

    const hasCurrentValue = [...statsKillerSelect.options].some(option => option.value === currentValue);
    statsKillerSelect.value = hasCurrentValue ? currentValue : "all";

}

function renderStatsSummary(matches){

    statsSummary.innerHTML = "";

    const totalMatches = matches.length;

    addStatCard("Matches", totalMatches);

    if(statSettings.kills){
        const matchesWithKills = matches.filter(match => Number.isFinite(match.kills));
        const totalKills = matchesWithKills.reduce((sum, match) => sum + match.kills, 0);
        const averageKills = matchesWithKills.length === 0 ? "-" : (totalKills / matchesWithKills.length).toFixed(1);
        const fourKillCount = matchesWithKills.filter(match => match.kills === 4).length;
        const threePlusKillCount = matchesWithKills.filter(match => match.kills >= 3).length;

        addStatCard("Average Kills", averageKills);
        addStatCard("Total Kills", totalKills);
        addStatCard("4K Matches", fourKillCount);
        addStatCard("3K+ Matches", threePlusKillCount);
    }

    if(statSettings.generators){
        const matchesWithGenerators = matches.filter(match => Number.isFinite(match.generatorsLeft));
        const generatorTotal = matchesWithGenerators.reduce((sum, match) => sum + match.generatorsLeft, 0);
        const averageGenerators = matchesWithGenerators.length === 0 ? "-" : (generatorTotal / matchesWithGenerators.length).toFixed(1);

        addStatCard("Avg Gens Left", averageGenerators);
    }

}

function addStatCard(label, value){

    const card = document.createElement("div");
    card.className = "stat-card";

    const valueElement = document.createElement("strong");
    valueElement.textContent = value;

    const labelElement = document.createElement("span");
    labelElement.textContent = label;

    card.appendChild(valueElement);
    card.appendChild(labelElement);
    statsSummary.appendChild(card);

}

function renderMatchHistory(matches){

    matchHistory.innerHTML = "";

    if(matches.length === 0){
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "history-empty";
        emptyMessage.textContent = "No tracked matches yet";
        matchHistory.appendChild(emptyMessage);
        return;
    }

    matches.slice(0, 8).forEach(match => {
        const item = document.createElement("article");
        item.className = "history-item";

        const title = document.createElement("strong");
        title.textContent = match.killerName;

        const date = document.createElement("span");
        date.textContent = formatMatchDate(match.date);

        item.appendChild(title);
        item.appendChild(date);

        if(statSettings.kills && Number.isFinite(match.kills)){
            item.appendChild(createHistoryDetail(`${match.kills}K`));
        }

        if(statSettings.generators && Number.isFinite(match.generatorsLeft)){
            item.appendChild(createHistoryDetail(`${match.generatorsLeft} gens left`));
        }

        if(statSettings.map && match.map){
            item.appendChild(createHistoryDetail(match.map));
        }

        if(statSettings.notes && match.notes){
            item.appendChild(createHistoryDetail(match.notes));
        }

        const actions = document.createElement("div");
        actions.className = "history-actions";

        const editButton = document.createElement("button");
        editButton.className = "history-button";
        editButton.type = "button";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            editTrackedMatch(match.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "history-button history-button-danger";
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteTrackedMatch(match.id);
        });

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        item.appendChild(actions);

        matchHistory.appendChild(item);
    });

}

function createHistoryDetail(text){

    const detail = document.createElement("p");
    detail.textContent = text;
    return detail;

}

function formatMatchDate(dateString){

    return new Date(dateString).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });

}

function formatStatNumber(value){

    return Number.isInteger(value) ? value : value.toFixed(1);

}

function getGalleryStatBadgeText(killerId){

    const killerMatches = trackedMatches.filter(match => match.killerId === killerId);

    if(killerMatches.length === 0){
        return "";
    }

    const latestMatch = killerMatches[0];

    if(statSettings.kills && Number.isFinite(latestMatch.kills)){
        return `Last ${latestMatch.kills}K`;
    }

    if(statSettings.kills){
        const matchesWithKills = killerMatches.filter(match => Number.isFinite(match.kills));

        if(matchesWithKills.length > 0){
            const totalKills = matchesWithKills.reduce((sum, match) => sum + match.kills, 0);
            return `Avg ${formatStatNumber(totalKills / matchesWithKills.length)}K`;
        }
    }

    return `${killerMatches.length} ${killerMatches.length === 1 ? "match" : "matches"}`;

}

function toggleKillerOwnership(killerId){

    if(isSpinning){
        return;
    }

    setKillerOwnership(killerId, notOwnedIds.includes(killerId));

}

function setKillerOwnership(killerId, shouldOwn){

    if(isSpinning){
        updateOwnedKillerList();
        return;
    }

    const isNotOwned = notOwnedIds.includes(killerId);
    const killer = killers.find(killer => killer.id === killerId);

    if(!killer){
        return;
    }

    if(shouldOwn && isNotOwned){
        notOwnedIds = notOwnedIds.filter(id => id !== killerId);

        if(!remainingKillers.some(remainingKiller => remainingKiller.id === killerId)){
            remainingKillers.push(killer);
        }
    } else if(!shouldOwn && !isNotOwned) {
        notOwnedIds = [...notOwnedIds, killerId];
        remainingKillers = remainingKillers.filter(killer => killer.id !== killerId);
    } else {
        updateOwnedKillerList();
        return;
    }

    saveRemainingKillers();
    saveSelectedKillers();
    updateRemaining();
    updateProgress();
    updateCycleSummary();
    updateGallery();
    updateOwnedKillerList();
    updateEndScreen();
    updateStats();

}

function updateRemovePickedMode(){

    shouldRemovePickedKillers = removePickedToggle.checked;
    localStorage.setItem(removePickedStorageKey, JSON.stringify(shouldRemovePickedKillers));

    updateRemaining();
    updateProgress();
    updateCycleSummary();
    updateGallery();
    updateEndScreen();
    updateStats();

}

function updateChallengeMode(){

    challengeModeEnabled = challengeModeToggle.checked;
    localStorage.setItem(challengeModeStorageKey, JSON.stringify(challengeModeEnabled));

    if(!challengeModeEnabled){
        hideChallenge();
    } else if(currentKiller){
        updateChallenge(currentKiller);
    }

}

function updatePerkBuildMode(){

    perkBuildsEnabled = perkBuildToggle.checked;
    localStorage.setItem(perkBuildsStorageKey, JSON.stringify(perkBuildsEnabled));
    updatePerkBuildVisibility();

}

function updatePerkBuildVisibility(){

    perkBuildPanel.hidden = !perkBuildsEnabled;

    if(perkBuildsEnabled){
        renderPerkBuild();
    }

}

function updateChallengeCategories(){

    challengeCategories = {
        loadout: challengeLoadoutToggle.checked,
        playstyle: challengePlaystyleToggle.checked,
        pressure: challengePressureToggle.checked,
        mercy: challengeMercyToggle.checked
    };

    localStorage.setItem(challengeCategoriesStorageKey, JSON.stringify(challengeCategories));

    if(challengeModeEnabled && currentKiller){
        updateChallenge(currentKiller);
    }

}

function applyChallengeCategoriesToInputs(){

    challengeLoadoutToggle.checked = challengeCategories.loadout;
    challengePlaystyleToggle.checked = challengeCategories.playstyle;
    challengePressureToggle.checked = challengeCategories.pressure;
    challengeMercyToggle.checked = challengeCategories.mercy;

}

function getRandomPool(){

    return shouldRemovePickedKillers
    ? remainingKillers
    : getSelectableKillers();

}

function getSelectableKillers(){

    return killers.filter(killer => !notOwnedIds.includes(killer.id));

}

function loadRemovePickedSetting(){

    const savedSetting = JSON.parse(localStorage.getItem(removePickedStorageKey));

    return savedSetting === null ? true : savedSetting;

}

function loadChallengeModeSetting(){

    const savedSetting = JSON.parse(localStorage.getItem(challengeModeStorageKey));

    return savedSetting === null ? false : savedSetting;

}

function loadPerkBuildsSetting(){

    const savedSetting = JSON.parse(localStorage.getItem(perkBuildsStorageKey));

    return savedSetting === null ? false : savedSetting;

}

function loadChallengeCategories(){

    const savedCategories = JSON.parse(localStorage.getItem(challengeCategoriesStorageKey));

    return {
        loadout: savedCategories === null ? defaultChallengeCategories.loadout : savedCategories.loadout !== false,
        playstyle: savedCategories === null ? defaultChallengeCategories.playstyle : savedCategories.playstyle !== false,
        pressure: savedCategories === null ? defaultChallengeCategories.pressure : savedCategories.pressure !== false,
        mercy: savedCategories === null ? defaultChallengeCategories.mercy : savedCategories.mercy !== false
    };

}

function loadStatsDateFilter(){

    const savedFilter = localStorage.getItem(statsDateFilterStorageKey);
    const validFilters = ["all", "week", "month", "cycle"];

    return validFilters.includes(savedFilter) ? savedFilter : "all";

}

function loadTrackedMatches(){

    const savedMatches = JSON.parse(localStorage.getItem(matchHistoryStorageKey));

    return Array.isArray(savedMatches) ? savedMatches : [];

}

function loadStatSettings(){

    const savedSettings = JSON.parse(localStorage.getItem(statSettingsStorageKey));

    return {
        kills: savedSettings === null ? true : savedSettings.kills !== false,
        generators: savedSettings === null ? true : savedSettings.generators !== false,
        map: savedSettings === null ? true : savedSettings.map !== false,
        notes: savedSettings === null ? true : savedSettings.notes !== false
    };

}

function loadNotOwnedIds(){

    const savedIds = JSON.parse(localStorage.getItem(ownershipStorageKey));

    if(savedIds === null){
        return [...defaultNotOwnedIds];
    }

    return savedIds.filter(id => killers.some(killer => killer.id === id));

}

function loadRecentlyPlayed(){

    const savedIds = JSON.parse(localStorage.getItem(recentStorageKey));

    if(savedIds === null){
        return [];
    }

    return savedIds
        .filter(id => killers.some(killer => killer.id === id))
        .slice(0, recentLimit);

}

function highlightGalleryCard(killerId){

    document.querySelectorAll(".killer-card-spinning").forEach(card => {
        card.classList.remove("killer-card-spinning");
    });

    const activeCard = gallery.querySelector(`[data-killer-id="${killerId}"]`);

    if(activeCard){
        activeCard.classList.add("killer-card-spinning");
    }

}

function clearGalleryHighlight(){

    document.querySelectorAll(".killer-card-spinning").forEach(card => {
        card.classList.remove("killer-card-spinning");
    });

}

function saveRemainingKillers(){

    const remainingIds = remainingKillers.map(killer => killer.id);
    const rosterIds = killers.map(killer => killer.id);

    localStorage.setItem(storageKey, JSON.stringify(remainingIds));
    localStorage.setItem(rosterStorageKey, JSON.stringify(rosterIds));
    localStorage.setItem(ownershipStorageKey, JSON.stringify(notOwnedIds));

}

function saveSelectedKillers(){

    const remainingIdSet = new Set(remainingKillers.map(killer => killer.id));
    const selectedIds = getSelectableKillers()
        .filter(killer => !remainingIdSet.has(killer.id))
        .map(killer => killer.id);

    localStorage.setItem(selectedStorageKey, JSON.stringify(selectedIds));

}

function loadRemainingKillers(){

    const savedIds = JSON.parse(localStorage.getItem(storageKey));
    const selectedIds = JSON.parse(localStorage.getItem(selectedStorageKey));
    const knownIds = JSON.parse(localStorage.getItem(rosterStorageKey)) || originalRosterIds;
    const selectableKillers = getSelectableKillers();

    if(savedIds === null){

        if(Array.isArray(selectedIds)){
            const selectedIdSet = new Set(selectedIds);
            return selectableKillers.filter(killer => !selectedIdSet.has(killer.id));
        }

        return [...selectableKillers];
    }

    const savedKillers = savedIds
        .map(id => killers.find(killer => killer.id === id))
        .filter(killer => killer !== undefined && !notOwnedIds.includes(killer.id));

    const savedIdSet = new Set(savedIds);
    const knownIdSet = new Set(knownIds);
    const newlyAddedKillers = selectableKillers.filter(killer => {
        return !savedIdSet.has(killer.id) && !knownIdSet.has(killer.id);
    });

    return [...savedKillers, ...newlyAddedKillers];

}
