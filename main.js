// Ay dizisi:
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Htmlden gelen Elementler:
const addBox = document.querySelector(".add-box");
const popupBoxContainer = document.querySelector(".popup-box");
const popupBox = document.querySelector(".popup");
const closeBtn = document.querySelector("header i");
const form = document.querySelector("form");
const wrapper = document.querySelector(".wrapper");
const popupTitle = document.querySelector("header p");
const submitBtn = document.querySelector("#submit-btn");


// LocalStogedan notları al ve localde not yoksa  bos dizi gönder:
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// ! Güncelleme için gereken değişkenler:
let isUpdate = false;
let updateId = null;
// console.log(notes);



//!AddBoxa Tıklanıldığında Bir Fonksiyon Tetikle:
addBox.addEventListener("click", () => {
  // console.log("Tıklandı");

  // popupa class özlelikleri ekle:
  popupBoxContainer.classList.add("show");
  popupBox.classList.add("show");

  // Arka Plandaki Sayfa Kaydırılmasını Engelle:
  document.querySelector("body").style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
  // console.log("Tıklandı");

  // CloseBtn e tıkanıldığına Popupa Eklenen Classları Kaldırsın:
  popupBoxContainer.classList.remove("show");
  popupBox.classList.remove("show");

  // Arka Plandaki Sayfa Kaydırılmasını Aktifetme:
  document.querySelector("body").style.overflow = "auto";
});

// Menü Kısmını Ayarlayan Fonksiyon: 
function showMenu(elem) {
  // parentElemen bır elementin kapsamına erişmek için kullanılır.
  // console.log(elem.parentElement);
  // Tıklanınlan  elemanın kapsamına eriştikten sonra buna bir clas ekledik show class clastlist add ile:
  elem.parentElement.classList.add("show");

  // Tıklanılan yer menu kısmı dışındaysa showclasını kaldırmak:
  document.addEventListener('click', (e) => {
    // console.log(e.target.tagName);
    // Tıklanılan kısım İ etileti değilse ya da kapsam dışarısındaysa show classını kaldır.
    if (e.target.tagName != 'I' || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}
// Wrapper Kısmındaki Tıklanmaları İzle :
wrapper.addEventListener('click', (e) => {
  // console.log(`Tıklandı`);
  //Eğer Üç noktaya tıklanıldıysa:
  if (e.target.classList.contains("bx-dots-horizontal-rounded")) {
    // console.log(`Üç Noktaya Tıklandı`)
    showMenu(e.target);
  }
  // Eğer Sil İconuna Tıklanıldıysa:
  else if (e.target.classList.contains("deleteIcon")) {
    const res = confirm("Bu Notu Silmek İstediğinize Emin misiniz?");
    if (res) {
      // console.log(`Silme Gerçekleşti`);
      // console.log(e.target.closest('.note'));
      // !Tıklanılan note elemanına erişme:
      const note = e.target.closest(".note");
      // console.log(note.dataset.id);
      // Notun İd'sıne eriştik:
      const noteId = note.dataset.id;
      // console.log(notes);
      // Note dizisini dön ve id'sini noteId'ye eşit olan elemanı diziden kaldır.
      notes = notes.filter((note) => note.id != noteId);
      //  console.log(notes);
      // Localsatorage'ı güncelle:
      localStorage.setItem("notes", JSON.stringify(notes));
      // RenderNotes Fonkaiyonunu çalıştır:
      renderNotes();
    }
  }
  //! Eğer Güncelle İconuna Tıklanıldıysa:
  else if (e.target.classList.contains("updateIcon")) {
    // console.log('Update İcon');
    // Tıklanan nota eriş:
    const note = e.target.closest(".note");
    // console.log(parseInt(note.dataset.id));
    // Not elemanının id'sine eriş:
    const noteId = (parseInt(note.dataset.id));
    // console.log(44);
    const foundedNote = notes.find((note) => note.id == noteId);
    //  console.log(foundedNote);
    // Popup İçerisindeki elemanlara note değerlerini ata:
    // console.log(form[0]);
    // console.log(form[1]);
    form[0].value = foundedNote.title;
    form[1].value = foundedNote.description;

    //? Güncelleme moodunu aktifet:
    isUpdate = true;
    updateId = noteId;


    // Popupı Aç:
    popupBoxContainer.classList.add("show");
    popupBox.classList.add("show");

    //! Popup içindeki gereli alanları update'e göre düzenle:
    popupTitle.textContent = 'Update Note';
    submitBtn.textContent = 'Update';

  }

});

// Forma Bir olay Dizisi Ekle ve Verilere Eriş :
form.addEventListener("submit", (e) => {
  // Form gönderldiğinde sayfa yenilenmesını engellemek için (e)verdım:
  e.preventDefault();
  // Formun İçerisindeki Elemanlara / Verilere Ulaş:
  let titleInput = e.target[0];
  let descriptionInput = e.target[1];
  // Form İçerisindeki Değerler Eriş:
  let title = titleInput.value.trim();
  let description = descriptionInput.value.trim();
  // console.log('Form Gönderildi');

  // Eğer title ve description değeri yoksa uyarı versin:
  if (!title && !description) {
    alert("Lütfen Formdaki Gerekeli Kısımları doldurunuz!");
  }
  const date = new Date();
  let id = new Date().getTime();
  let day = date.getDate();
  let year = date.getFullYear();
  let month = months[date.getMonth()];

  // console.log(day);
  // console.log(year);
  // console.log(month);
  // !Eğer Güncelleme Moodunda ise :
  if (isUpdate) {
    //?güncelleme içindeki elemanın dizi içerisindeki indexini bulma:
    const noteIndex = notes.findIndex((note) => {
      return note.id == updateId;
    });
    //  console.log(noteIndex);
    //!Dizi içerisinde yukarıda bulunan İndexdeki elemanın değerlerini güncelle:
    notes[noteIndex] = {
      title,
      description,
      id,
      date: `${month} ${day},${year}`,
    };
    // notes[noteIndex] = {
    //   ...notes[noteIndex],
    //   title,
    //   description,
    //   date: `${month}, ${day}, ${year}`,
    //   id,
    // };
    // Güncelleme modunu kapat ve popup içerisindeki elemanları eskiye çevir:
    isUpdate = false;
    updateId = null;
    popupTitle.textContent = "New Note";
    submitBtn.textContent = "Add Note";
    // console.log(notes);
  } else {
    //   Elde Edilen Verileri bir Note Objesi altında topla:
    let noteInfo = {
      title,
      description,
      date: `${month}, ${day}, ${year}`,
      id,
    };
    //  console.log(noteInfo);
    // NoteInfo objesini note dizisine ekle:
    notes.push(noteInfo);
  }
  //  Note Objesini/ dizisini Localstorage Ekle:
  localStorage.setItem("notes", JSON.stringify(notes));

  //Formu /popup ı kapat içindeki elemanları temizle:
  titleInput.value = "";
  descriptionInput.value = "";
  //  Popup Kapat:
  popupBoxContainer.classList.remove("show");
  popupBox.classList.remove("show");
  // Arka Plandaki Sayfa Kaydırılmasını Aktifetme:
  document.querySelector("body").style.overflow = "auto";

  // Not eklendikten sonra notları render et
  renderNotes();
});
// !Local storagedeki verilere göre ekrana note kartları renden eden fonksiyon yazalım:

function renderNotes() {
  // Eğer localStorage da verisi yoksa fonsiyonu durdur.

  if (!notes) return;
  // Önce mevcut noteları kaldır.
  document.querySelectorAll(".note").forEach((li) => li.remove());

  //  Note dizisindeki herbir Eleman İçin ekrana bir kartı render et.
  notes.forEach((note) => {
    // console.log(id);
    // console.log(note);
    // console.log('Note Elemanı')
    // ! Data id'yi elemanlara id vermek için kullandım:
    let liTag = ` <li class="note" data-id=${note.id}>
            <div class="details">
                <p  class="title">${note.title}</p>
                <p class="description">${note.description}</p>
            </div>
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                   <i class='bx bx-dots-horizontal-rounded'></i>
                    <ul class="menu">
                        <li class="updateIcon"><i class='bx bx-edit'></i>Düzenle</li>
                        <li class="deleteIcon"><i class='bx bx-trash'></i>Sil</li>
                    </ul>
                </div>
             </div>
         </li>`;
    //  console.log(liTag);

    // insertAdjacentHTML methodu belirli bir ögeyi bit html elemanına göre sıralı şekilde eklemek için kullanılır bu method hangi konuma ekleme yapılacak ve hangi eleman eklenecek bunu belirtmemizi ister.
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}

// Sayfa Yüklendiğinde rendernotes fonksiyonunu çalıştır:
document.addEventListener("DOMContentLoaded", () => renderNotes());

// console.log(new Date().getTime());
