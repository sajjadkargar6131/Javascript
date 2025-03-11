
const letterForm = document.getElementById('letterForm');
const letterTable = document.getElementById('letterTable').getElementsByTagName('tbody')[0];
const deleteAllBtn = document.getElementById('deleteAllBtn');
const searchInput = document.getElementById('searchInput');
const deletePassword = document.getElementById('deletePassword');
const deletePasswordInput = document.getElementById('deletePasswordInput');
const downloadExcelBtn = document.getElementById('downloadExcelBtn');
let letters = JSON.parse(localStorage.getItem('letters')) || [];
let letterCounter = letters.length ? letters[letters.length - 1].number + 1 : 1; // شماره‌گذاری شروع می‌شود از شماره بعد از آخرین شماره نامه
let editingIndex = -1;

function saveLetter(letter) {
    if (editingIndex === -1) {
    letter.number = letterCounter;
    letters.push(letter);
    letterCounter++;
    } else {
    letter.number = letters[editingIndex].number;
    letters[editingIndex] = letter;
    }
    localStorage.setItem('letters', JSON.stringify(letters));
    renderTable(letters);
    editingIndex = -1;
}

function deleteLetter(number) {
    letters = letters.filter(letter => letter.number !== number);
    localStorage.setItem('letters', JSON.stringify(letters));
    renderTable(letters);
}

function updateLetterNumbers() {
    letters.forEach((letter, index) => {
    letter.number = index + 1;
    });
}

function renderTable(filteredLetters) {
    letterTable.innerHTML = '';
    filteredLetters.forEach((letter) => {
    const row = letterTable.insertRow();
    row.innerHTML = `
        <td class="text-center">${letter.number}</td>
        <td class="text-center">${letter.date}</td>
        <td class="text-center">${letter.title}</td>
        <td class="text-center">${letter.receiver}</td>
        <td class="text-center">${letter.summary}</td>
        <td class="text-center">
        <button class="btn btn-warning btn-sm" onclick="editLetter(${letter.number})">ویرایش</button>
        <button class="btn btn-danger btn-sm" onclick="showDeleteConfirmModal(${letter.number})">حذف</button>
        </td>
    `;
    });
}

function editLetter(number) {
    const letter = letters.find(l => l.number === number);
    document.getElementById('date').value = letter.date;
    document.getElementById('receiver').value = letter.receiver;
    document.getElementById('summary').value = letter.summary;
    document.getElementById('title').value = letter.title;
    editingIndex = letters.indexOf(letter);
    document.getElementById('submitBtn').textContent = 'بروزرسانی نامه';
}

function showDeleteConfirmModal(number) {
    // نمایش فیلد ورودی پسورد و دکمه تأیید
    const deletePasswordDiv = document.getElementById('deletePasswordDiv');
    deletePasswordDiv.style.display = 'flex';

    // دکمه تأیید
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

    // زمان کلیک کردن دکمه تأیید
    confirmDeleteBtn.onclick = function() {
    const password = document.getElementById('deletePasswordInput').value;
    if (password === '2217256') {  // چک کردن رمز عبور
        deleteLetter(number);
        deletePasswordDiv.style.display = 'none';  // مخفی کردن فیلد ورودی پس از حذف
    } else {
        alert('رمز عبور اشتباه است!');
        document.getElementById('deletePasswordInput').value = '';  // پاک کردن ورودی پسورد در صورت اشتباه
    }
    };
}

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredLetters = letters.filter(letter =>
    letter.number.toString().includes(query) ||
    letter.receiver.toLowerCase().includes(query) ||
    letter.title.toLowerCase().includes(query) ||
    letter.date.toLowerCase().includes(query) ||
    letter.summary.toLowerCase().includes(query)
    );
    renderTable(filteredLetters);
});

letterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newLetter = {
    date: document.getElementById('date').value,
    receiver: document.getElementById('receiver').value,
    summary: document.getElementById('summary').value,
    title: document.getElementById('title').value
    };
    saveLetter(newLetter);
    letterForm.reset();
    document.getElementById('submitBtn').textContent = 'ایجاد نامه';
});


deleteAllBtn.addEventListener('click', () => {
    // نمایش فیلد ورودی پسورد و دکمه تأیید
    const deleteAllPasswordDiv = document.getElementById('deleteAllPasswordDiv');
    deleteAllPasswordDiv.style.display = 'flex';

    const confirmDeleteAllBtn = document.getElementById('confirmDeleteAllBtn');

    // زمان کلیک کردن دکمه تأیید
    confirmDeleteAllBtn.onclick = function() {
    const password = document.getElementById('deleteAllPasswordInput').value;
    if (password === '2217256') {  // چک کردن رمز عبور
        // حذف تمام اطلاعات
        letters = [];
        letterCounter = 1;
        localStorage.setItem('letters', JSON.stringify(letters));
        renderTable(letters);
        
        // مخفی کردن فیلد ورودی پس از حذف
        deleteAllPasswordDiv.style.display = 'none';
    } else {
        alert('رمز عبور اشتباه است!');
        document.getElementById('deleteAllPasswordInput').value = '';  // پاک کردن ورودی پسورد در صورت اشتباه
    }
    };
});


downloadExcelBtn.addEventListener('click', () => {
    const ws = XLSX.utils.json_to_sheet(letters);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "نامه‌ها");
    XLSX.writeFile(wb, "letters.xlsx");
});

renderTable(letters);
