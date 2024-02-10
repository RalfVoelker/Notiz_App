let titles = [];
let notes = [];
let basketTitles = [];
let basketNotes = [];


load();
loadBasket();


function render() {
  let content = document.getElementById("content");
  let titleInput = document.getElementById("title");
  let noteInput = document.getElementById("note");
  content.innerHTML = "";
  titleInput.value = "";
  noteInput.value = "";
  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];
    const note = notes[i];
    content.innerHTML += `${noteHtml(i, title, note)}`;
  }
}


function noteHtml(i, title, note) {
  return /*html*/ `
        <div class="card">
            <div class="pin">
                <img src="./img/299069_pin_icon.png" alt=""><br>
            </div>
            <div class="pin2">
                ${title}
                <textarea readonly="readonly" name="note" rows="4" style="background-color: rgb(150, 255, 229)" >${note}</textarea><br>
            </div>
            <a href="#"><img onclick="deleteNote(${i})" src="./img/4472999_delete icon_trash_trash icon_icon.png"/></a>
        </div>`;
}


function renderBasket() {
  let contentBasket = document.getElementById("contentBasket");
  contentBasket.innerHTML = "";
  for (let i = 0; i < basketTitles.length; i++) {
    const basketTitle = basketTitles[i];
    const basketNote = basketNotes[i];
    contentBasket.innerHTML += `${basketHtml(i, basketTitle, basketNote)}`;
  }
}


function basketHtml(i, basketTitle, basketNote) {
  return /*html*/ `
        <div class="card">
            ${basketTitle}<br>
            <textarea readonly="readonly" name="note" rows="4" style="background-color: rgb(150, 255, 229)" >${basketNote}</textarea><br>
            <a href="#"><img onclick="deleteBasket(${i})" src="./img/4472999_delete icon_trash_trash icon_icon.png"/></a>
            <a href="#"><img onclick="restoreBasket(${i})" src="./img/3832193_interface_restore_upload_icon.png"/></a>
        </div>`;
}


function addNote() {
  let title = document.getElementById("title");
  let number = document.getElementById("note");
  if (title.value == "") {
    alert("Bitte einen Titel eingeben");
  } else {
    if (note.value == "") {
      alert("Bitte eine Notz eingeben");
    } else {
      saveBasket();
      titles.push(title.value);
      notes.push(number.value);
      render();
      save();
    }
  }
}


function restoreBasket(i) {
  titles.push(basketTitles[i]);
  notes.push(basketNotes[i]);
  save();
  basketTitles.splice(i, 1);
  basketNotes.splice(i, 1);
  renderBasket();
  saveBasket();
}


function deleteNote(i) {
  basketTitles.push(titles[i]);
  basketNotes.push(notes[i]);
  saveBasket();
  titles.splice(i, 1);
  notes.splice(i, 1);
  render();
  save();
}


function deleteBasket(i) {
  basketTitles.splice(i, 1);
  basketNotes.splice(i, 1);
  renderBasket();
  saveBasket();
}


function save() {
  let titlesAsText = JSON.stringify(titles);
  let notesAsText = JSON.stringify(notes);
  localStorage.setItem("titles", titlesAsText);
  localStorage.setItem("notes", notesAsText);
}


function saveBasket() {
  let basketTitlesAsText = JSON.stringify(basketTitles);
  let basketNotesAsText = JSON.stringify(basketNotes);
  localStorage.setItem("basketTitles", basketTitlesAsText);
  localStorage.setItem("basketNotes", basketNotesAsText);
}


function load() {
  let titlesAsText = localStorage.getItem("titles");
  let notesAsText = localStorage.getItem("notes");
  if (titlesAsText && notesAsText) {
    titles = JSON.parse(titlesAsText);
    notes = JSON.parse(notesAsText);
  }
}


function loadBasket() {
  let basketTitlesAsText = localStorage.getItem("basketTitles");
  let basketNotesAsText = localStorage.getItem("basketNotes");
  if (basketTitlesAsText && basketNotesAsText) {
    basketTitles = JSON.parse(basketTitlesAsText);
    basketNotes = JSON.parse(basketNotesAsText);
  }
}


function editNote(i) {
  let title = document.getElementById("title");
  let note = document.getElementById("note");
  title.value.push(titles[i]);
  note.value.push(notes[i]);
}

