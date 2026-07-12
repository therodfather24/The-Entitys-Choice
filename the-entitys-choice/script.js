const storageKey = "entitysChoiceRemainingKillers";
const rosterStorageKey = "entitysChoiceKnownKillerIds";
const ownershipStorageKey = "entitysChoiceNotOwnedKillerIds";
const recentStorageKey = "entitysChoiceRecentlyPlayed";
const removePickedStorageKey = "entitysChoiceRemovePickedKillers";
const originalRosterIds = ["trapper", "wraith", "hillbilly", "nurse", "shape"];
const recentLimit = 5;
const defaultNotOwnedIds = killers
    .filter(killer => killer.selectable === false)
    .map(killer => killer.id);
const spinSteps = 24;
const spinStartDelay = 35;
const spinSlowdown = 9;

const button = document.getElementById("randomButton");
const resetButton = document.getElementById("resetButton");
const endResetButton = document.getElementById("endResetButton");
const removePickedToggle = document.getElementById("removePickedToggle");

const display = document.getElementById("killerDisplay");
const remaining = document.getElementById("remaining");
const image = document.getElementById("killerImage");
const gallery = document.getElementById("killerGallery");
const gallerySubtitle = document.getElementById("gallerySubtitle");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const recentList = document.getElementById("recentList");
const endScreen = document.getElementById("endScreen");
const endFinalKiller = document.getElementById("endFinalKiller");
const endFinalName = document.getElementById("endFinalName");

let notOwnedIds = loadNotOwnedIds();
let remainingKillers = loadRemainingKillers();
let recentlyPlayed = loadRecentlyPlayed();
let finalKiller = null;
let isSpinning = false;
let shouldRemovePickedKillers = loadRemovePickedSetting();

removePickedToggle.checked = shouldRemovePickedKillers;

updateRemaining();
updateProgress();
updateGallery();
updateRecentlyPlayed();
updateEndScreen();

button.addEventListener("click", randomize);

resetButton.addEventListener("click", resetPool);
endResetButton.addEventListener("click", resetPool);
removePickedToggle.addEventListener("change", updateRemovePickedMode);

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

    isSpinning = true;
    button.disabled = true;
    resetButton.disabled = true;
    display.classList.remove("killer-name-revealed");
    display.classList.add("killer-name-spinning");
    image.classList.remove("portrait-revealed", "portrait-spinning");
    image.style.display = "none";

    const chosen = randomPool[Math.floor(Math.random() * randomPool.length)];

    spinKillerNames(0, chosen, randomPool);

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

    isSpinning = false;
    button.disabled = false;
    resetButton.disabled = false;

    saveRemainingKillers();
    updateRemaining();
    updateProgress();
    updateGallery();
    updateRecentlyPlayed();
    clearGalleryHighlight();
    updateEndScreen();

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
    hideEndScreen();

    saveRemainingKillers();
    saveRecentlyPlayed();
    updateRemaining();
    updateProgress();
    updateGallery();
    updateRecentlyPlayed();
    updateEndScreen();

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

function updateEndScreen(){

    if(shouldRemovePickedKillers && remainingKillers.length === 0 && getSelectableKillers().length > 0 && !isSpinning){
        showEndScreen();
        return;
    }

    hideEndScreen();

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

        const ownershipButton = document.createElement("button");
        ownershipButton.className = "ownership-button";
        ownershipButton.textContent = isSelectable ? "-" : "+";
        ownershipButton.title = isSelectable ? "Exclude from randomizer" : "Include in randomizer";
        ownershipButton.setAttribute("aria-label", ownershipButton.title);
        ownershipButton.addEventListener("click", () => {
            toggleKillerOwnership(killer.id);
        });

        card.appendChild(portrait);
        card.appendChild(fallback);
        card.appendChild(name);
        card.appendChild(status);
        card.appendChild(ownershipButton);

        gallery.appendChild(card);

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

        item.appendChild(portrait);
        item.appendChild(name);

        recentList.appendChild(item);

    });

}

function toggleKillerOwnership(killerId){

    if(isSpinning){
        return;
    }

    const isNotOwned = notOwnedIds.includes(killerId);
    const killer = killers.find(killer => killer.id === killerId);

    if(!killer){
        return;
    }

    if(isNotOwned){
        notOwnedIds = notOwnedIds.filter(id => id !== killerId);

        if(!remainingKillers.some(remainingKiller => remainingKiller.id === killerId)){
            remainingKillers.push(killer);
        }
    } else {
        notOwnedIds = [...notOwnedIds, killerId];
        remainingKillers = remainingKillers.filter(killer => killer.id !== killerId);
    }

    saveRemainingKillers();
    updateRemaining();
    updateProgress();
    updateGallery();
    updateEndScreen();

}

function updateRemovePickedMode(){

    shouldRemovePickedKillers = removePickedToggle.checked;
    localStorage.setItem(removePickedStorageKey, JSON.stringify(shouldRemovePickedKillers));

    updateRemaining();
    updateProgress();
    updateGallery();
    updateEndScreen();

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

function loadRemainingKillers(){

    const savedIds = JSON.parse(localStorage.getItem(storageKey));
    const knownIds = JSON.parse(localStorage.getItem(rosterStorageKey)) || originalRosterIds;
    const selectableKillers = getSelectableKillers();

    if(savedIds === null){
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
