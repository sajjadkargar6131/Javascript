// let names = [];
// let countdownInterval;
// let drawInterval;

// const nameInput = document.getElementById("nameInput");
// const addNameButton = document.getElementById("addNameButton");
// const nameList = document.getElementById("nameList");
// const drawButton = document.getElementById("drawButton");
// const countdownText = document.getElementById("countdown");
// const winnerText = document.getElementById("winner");

// // افزودن نام به لیست با کلیک دکمه
// addNameButton.addEventListener("click", () => {
//     const name = nameInput.value.trim();
//     if (name && !names.includes(name)) {
//         names.push(name);
//         updateNameList();
//         nameInput.value = "";
//     } else if (names.includes(name)) {
//         alert("نام وارد شده تکراری است!");
//     }
// });

// // افزودن نام به لیست با اینتر
// nameInput.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//         addNameButton.click();
//     }
// });

// // به‌روزرسانی لیست نام‌ها
// function updateNameList() {
//     nameList.innerHTML = "";
//     names.forEach((name, index) => {
//         const li = document.createElement("li");
//         li.className = "list-group-item";
//         li.textContent = name;

//         // ایجاد دکمه حذف
//         const deleteButton = document.createElement("button");
//         deleteButton.textContent = "حذف";
//         deleteButton.className = "btn btn-danger btn-sm ms-2";
//         deleteButton.disabled = false;  // در ابتدا دکمه‌ها فعال هستند
//         deleteButton.addEventListener("click", () => {
//             deleteName(index); // حذف نام با استفاده از ایندکس
//         });

//         li.appendChild(deleteButton);
//         nameList.appendChild(li);
//     });
// }

// // حذف نام از لیست
// function deleteName(index) {
//     names.splice(index, 1); // حذف نام از آرایه
//     updateNameList(); // به‌روزرسانی لیست
// }

// // شروع قرعه کشی
// function startLottery() {
//     if (names.length < 2) {
//         alert("حداقل باید دو نفر برای قرعه کشی وارد شوند!");
//         return;
//     }

//     // غیرفعال کردن دکمه‌های "افزودن" و "شروع قرعه کشی"
//     addNameButton.disabled = true;
//     drawButton.classList.add("btn-disable");
//     drawButton.disabled = true;

//     // غیرفعال کردن دکمه‌های حذف در حین قرعه‌کشی
//     disableDeleteButtons(true);

//     // شمارش معکوس
//     let countdown = 5;
//     countdownText.textContent = `شروع قرعه کشی در ${countdown} ثانیه دیگر...`;
//     countdownInterval = setInterval(() => {
//         countdown--;
//         if (countdown <= 0) {
//             clearInterval(countdownInterval);
//             countdownText.style.display = "none";
//             startRandomHighlighting();
//         } else {
//             countdownText.textContent = `شروع قرعه کشی  در ${countdown} ثانیه دیگر...`;
//         }
//     }, 1000);
// }

// // شروع انیمیشن برای انتخاب رندوم نام‌ها
// function startRandomHighlighting() {
//     let currentIndex = 0;
//     let highlightInterval = setInterval(() => {
//         const listItems = document.querySelectorAll("#nameList li");
//         listItems.forEach(item => item.classList.remove("highlighting"));
//         listItems[currentIndex].classList.add("highlighting");
//         currentIndex = (currentIndex + 1) % listItems.length;
//     }, 150);

//     // توقف انیمیشن بعد از 3 ثانیه و اعلام برنده
//     setTimeout(() => {
//         clearInterval(highlightInterval);
//         announceWinner();
//         const defaults = {
//             spread: 360,
//             ticks: 50,
//             gravity: 0,
//             decay: 0.94,
//             startVelocity: 30,
//             shapes: ["star"],
//             colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
//           };

//           function shoot() {
//             confetti({
//               ...defaults,
//               particleCount: 40,
//               scalar: 1.2,
//               shapes: ["star"],
//             });

//             confetti({
//               ...defaults,
//               particleCount: 10,
//               scalar: 0.75,
//               shapes: ["circle"],
//             });
//           }

//           setTimeout(shoot, 0);
//           setTimeout(shoot, 100);
//           setTimeout(shoot, 200);
//     }, 3000);
// }

// // اعلام برنده
// function announceWinner() {
//     const winnerIndex = Math.floor(Math.random() * names.length);
//     const winnerName = names[winnerIndex];

//     // اضافه کردن استایل به نام برنده
//     const listItems = document.querySelectorAll("#nameList li");
//     listItems.forEach(item => item.classList.remove("highlighting"));

//     // پیدا کردن نام برنده در لیست و اعمال استایل خاص
//     listItems.forEach(item => {
//         if (item.textContent === winnerName) {
//             item.classList.add("highlight");
//         }
//     });

//     // نمایش نام برنده با استایل جدید
//     winnerText.textContent = `برنده قرعه کشی : ${winnerName}`;
//     winnerText.classList.add("highlighting");
//     winnerText.style.display = "block"; // نمایش دائمی

//     // غیرفعال کردن دکمه‌های حذف بعد از اعلام برنده
//     disableDeleteButtons(false); // غیرفعال کردن دکمه‌های حذف
// }

// // غیرفعال کردن دکمه‌های حذف
// function disableDeleteButtons(disable) {
//     const deleteButtons = document.querySelectorAll(".btn-danger");
//     deleteButtons.forEach(button => {
//         button.disabled = disable;  // غیرفعال یا فعال کردن دکمه‌های حذف
//     });
// }





// let names = [];
// let countdownInterval;
// let drawInterval;

// const nameInput = document.getElementById("nameInput");
// const addNameButton = document.getElementById("addNameButton");
// const nameList = document.getElementById("nameList");
// const drawButton = document.getElementById("drawButton");
// const countdownText = document.getElementById("countdown");
// const winnerText = document.getElementById("winner");

// // افزودن نام به لیست با کلیک دکمه
// addNameButton.addEventListener("click", () => {
//     const name = nameInput.value.trim();
//     if (name && !names.includes(name)) {
//         names.push(name);
//         updateNameList();
//         nameInput.value = "";
//     } else if (names.includes(name)) {
//         alert("نام وارد شده تکراری است!");
//     }
// });

// // افزودن نام به لیست با اینتر
// nameInput.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//         addNameButton.click();
//     }
// });

// // به‌روزرسانی لیست نام‌ها
// function updateNameList() {
//     nameList.innerHTML = "";
//     names.forEach((name, index) => {
//         const li = document.createElement("li");
//         li.className = "list-group-item";
//         li.textContent = name;

//         // ایجاد دکمه حذف
//         const deleteButton = document.createElement("button");
//         deleteButton.textContent = "حذف";
//         deleteButton.className = "btn btn-danger btn-sm ms-2";
//         deleteButton.disabled = false;  // در ابتدا دکمه‌ها فعال هستند
//         deleteButton.addEventListener("click", () => {
//             deleteName(index); // حذف نام با استفاده از ایندکس
//         });

//         li.appendChild(deleteButton);
//         nameList.appendChild(li);
//     });
// }

// // حذف نام از لیست
// function deleteName(index) {
//     names.splice(index, 1); // حذف نام از آرایه
//     updateNameList(); // به‌روزرسانی لیست
// }

// // شروع قرعه کشی
// function startLottery() {
//     if (names.length < 2) {
//         alert("حداقل باید دو نفر برای قرعه کشی وارد شوند!");
//         return;
//     }

//     // غیرفعال کردن دکمه‌های "افزودن" و "شروع قرعه کشی"
//     addNameButton.disabled = true;
//     drawButton.classList.add("btn-disable");
//     drawButton.disabled = true;

//     // غیرفعال کردن دکمه‌های حذف در حین قرعه‌کشی
//     disableDeleteButtons(true);

//     // شمارش معکوس
//     let countdown = 5;
//     countdownText.textContent = `شروع قرعه کشی در ${countdown} ثانیه دیگر...`;
//     countdownInterval = setInterval(() => {
//         countdown--;
//         if (countdown <= 0) {
//             clearInterval(countdownInterval);
//             countdownText.style.display = "none";
//             startRandomHighlighting();
//         } else {
//             countdownText.textContent = `شروع قرعه کشی  در ${countdown} ثانیه دیگر...`;
//         }
//     }, 1000);
// }

// // شروع انیمیشن برای انتخاب رندوم نام‌ها
// function startRandomHighlighting() {
//     let currentIndex = 0;
//     let highlightInterval = setInterval(() => {
//         const listItems = document.querySelectorAll("#nameList li");
//         listItems.forEach(item => item.classList.remove("highlighting"));
//         listItems[currentIndex].classList.add("highlighting");
//         currentIndex = (currentIndex + 1) % listItems.length;
//     }, 150);

//     // توقف انیمیشن بعد از 3 ثانیه و اعلام برنده
//     setTimeout(() => {
        
// }

// // اعلام برنده
// function announceWinner() {
//     const winnerIndex = Math.floor(Math.random() * names.length);
//     const winnerName = names[winnerIndex];

//     // اضافه کردن استایل به نام برنده
//     const listItems = document.querySelectorAll("#nameList li");
//     listItems.forEach(item => item.classList.remove("highlight", "winner")); // حذف کلاس‌های قبلی

//     // پیدا کردن نام برنده در لیست و اعمال استایل خاص
//     listItems.forEach(item => {
//         if (item.textContent.trim() === winnerName.trim()) {
//             item.classList.add("winner"); // کلاس winner به نام برنده افزوده می‌شود
//         }
//     });

//     // نمایش نام برنده با استایل جدید
//     winnerText.textContent = `برنده قرعه کشی : ${winnerName}`;
//     winnerText.classList.add("highlighting");
//     winnerText.style.display = "block"; // نمایش دائمی

//     // غیرفعال کردن دکمه‌های حذف بعد از اعلام برنده
//     disableDeleteButtons(false); // غیرفعال کردن دکمه‌های حذف
// }

// // غیرفعال کردن دکمه‌های حذف
// function disableDeleteButtons(disable) {
//     const deleteButtons = document.querySelectorAll(".btn-danger");
//     deleteButtons.forEach(button => {
//         button.disabled = disable;  // غیرفعال یا فعال کردن دکمه‌های حذف
//     });
// }

let names = [];
let countdownInterval;
let drawInterval;

const nameInput = document.getElementById("nameInput");
const addNameButton = document.getElementById("addNameButton");
const nameList = document.getElementById("nameList");
const drawButton = document.getElementById("drawButton");
const winnerText = document.getElementById("winner");

// افزودن نام به لیست با کلیک دکمه
addNameButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (name && !names.includes(name)) {
        names.push(name);
        updateNameList();
        nameInput.value = "";
    } else if (names.includes(name)) {
        alert("نام وارد شده تکراری است!");
    }
});

// افزودن نام به لیست با اینتر
nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addNameButton.click();
    }
});

// به‌روزرسانی لیست نام‌ها
function updateNameList() {
    nameList.innerHTML = "";
    names.forEach((name, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        const nameSpan = document.createElement("span");
        nameSpan.textContent = name;
        li.appendChild(nameSpan);

        // ایجاد دکمه حذف
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "حذف";
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.addEventListener("click", () => {
            deleteName(index);
        });

        li.appendChild(deleteButton);
        nameList.appendChild(li);
    });
}

// حذف نام از لیست
function deleteName(index) {
    names.splice(index, 1);
    updateNameList();
}

// شروع قرعه کشی
drawButton.addEventListener("click", () => {
    if (names.length < 2) {
        alert("حداقل باید دو نفر برای قرعه کشی وارد شوند!");
        return;
    }

    // غیرفعال کردن دکمه‌ها و اینپوت
    nameInput.disabled = true;
    addNameButton.disabled = true;
    drawButton.disabled = true;
    disableDeleteButtons(true);

    // شروع انیمیشن برای انتخاب رندوم نام‌ها
    startRandomHighlighting();
});

// شروع انیمیشن برای انتخاب رندوم نام‌ها
function startRandomHighlighting() {
    let currentIndex = 0;
    const listItems = document.querySelectorAll("#nameList li");

    drawInterval = setInterval(() => {
        listItems.forEach(item => item.classList.remove("highlighting"));
        listItems[currentIndex].classList.add("highlighting");
        currentIndex = (currentIndex + 1) % listItems.length;
    }, 150);

    // توقف انیمیشن بعد از 3 ثانیه و اعلام برنده
    setTimeout(() => {
        
        clearInterval(drawInterval);
        announceWinner();
        const defaults = {
            spread: 360,
            ticks: 50,
            gravity: 0,
            decay: 0.94,
            startVelocity: 30,
            shapes: ["star"],
            colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
        };

        function shoot() {
            confetti({
                ...defaults,
                particleCount: 40,
                scalar: 1.2,
                shapes: ["star"],
            });

            confetti({
                ...defaults,
                particleCount: 10,
                scalar: 0.75,
                shapes: ["circle"],
            });
        }

        setTimeout(shoot, 0);
        setTimeout(shoot, 100);
        setTimeout(shoot, 200);

    }, 3000);
}

// اعلام برنده
function announceWinner() {
    const winnerIndex = Math.floor(Math.random() * names.length);
    const winnerName = names[winnerIndex];

    // اضافه کردن استایل به نام برنده
    const listItems = document.querySelectorAll("#nameList li");
    listItems.forEach(item => item.classList.remove("highlighting"));

    listItems.forEach(item => {
        const nameSpan = item.querySelector("span");
        if (nameSpan && nameSpan.textContent.trim() === winnerName.trim()) {
            item.classList.add("winner");
        }
    });

    // نمایش نام برنده
    winnerText.textContent = `برنده قرعه کشی : ${winnerName}`;
    winnerText.style.display = "block";

    // غیرفعال ماندن دکمه‌ها و اینپوت بعد از قرعه کشی
    nameInput.disabled = true;
    addNameButton.disabled = true;
    drawButton.disabled = true;
    disableDeleteButtons(true);
}

// غیرفعال کردن دکمه‌های حذف
function disableDeleteButtons(disable) {
    const deleteButtons = document.querySelectorAll(".btn-danger");
    deleteButtons.forEach(button => {
        button.disabled = disable;
    });
}


