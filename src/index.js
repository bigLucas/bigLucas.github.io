const GRINDER_LIST_STORAGE_KEY = 'grinder_list';
const GRINDER_LIST_DELIMITER = ':';

window.addEventListener('load', initialize);

function initialize() {
    const storage = window.localStorage;
    const form = document.getElementById('grinder_form');
    const cleanStorageButton = document.getElementById('clean_storage_button');

    cleanStorageButton.addEventListener('click', function (event) { clickButtonAction(event, storage) } );
    form.addEventListener('submit', function (event) { submitFormAction(event, this, storage); });

    if (storage.getItem(GRINDER_LIST_STORAGE_KEY)) {
        displayData(storage);
    }
}

/**
 * @param {Event} event
 * @param {HTMLElement} form
 * @param {Storage} storage
 */
function submitFormAction(event, form, storage) {
    event.preventDefault();
    saveData(form, storage);
    displayData(storage);
}

/**
 * @param {Event} event
 * @param {Storage} storage
 */
 function clickButtonAction(event, storage) {
    event.preventDefault();
    storage.clear();
    cleanTable();
}

/**
 * @param {HTMLElement} form
 * @param {Storage} storage
 */
function saveData(form, storage) {
    const grinderForm = new FormData(form);
    const grinderName = grinderForm.get('grinder_name').trim();
    const grinderPosition = grinderForm.get('grinder_position').trim();
    storage.setItem(grinderName, grinderPosition);
    updateGrinderList(storage, grinderName);
}

/**
 * @param {Storage} storage
 * @param {string} grinderName
 */
function updateGrinderList(storage, grinderName) {
    let grinders = grinderName;
    if (storage.getItem(GRINDER_LIST_STORAGE_KEY)) {
        grinders = storage.getItem(GRINDER_LIST_STORAGE_KEY);
    }
    const grindersSet = new Set(grinders.split(GRINDER_LIST_DELIMITER));
    grindersSet.add(grinderName);
    grinderList = `${Array.from(grindersSet).join(GRINDER_LIST_DELIMITER)}`; // problem I need to see if the user is inserting a ":" character
    storage.setItem(GRINDER_LIST_STORAGE_KEY, grinderList);
}

/**
 * @param {Storage} storage
 */
function displayData(storage) {
    const grinderList = storage.getItem(GRINDER_LIST_STORAGE_KEY).split(GRINDER_LIST_DELIMITER);
    let tbodyGrinders = document.getElementById('tbody_grinders');
    tbodyGrinders.remove();
    tbodyGrinders = document.createElement('tbody');
    tbodyGrinders.id = 'tbody_grinders';
    grinderList.forEach(grinder => {
        if (grinder) {
            const grinderName = document.createElement('td');
            grinderName.innerHTML = grinder.trim();
            const position = document.createElement('td');
            position.innerHTML = storage.getItem(grinder.trim());
            const tableRow = document.createElement('tr');
            tableRow.appendChild(grinderName);
            tableRow.appendChild(position);
            tbodyGrinders.appendChild(tableRow);
            document.getElementById('table').appendChild(tbodyGrinders);
        }
    });
}

function cleanTable() {
    document.getElementById('tbody_grinders').remove();
    const tbodyGrinders = document.createElement('tbody');
    tbodyGrinders.id = 'tbody_grinders';
    document.getElementById('table').appendChild(tbodyGrinders);
}