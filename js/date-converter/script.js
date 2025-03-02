
// تبدیل تاریخ میلادی به شمسی
document.getElementById("convertToJalaliForm").onsubmit = function (e) {
    e.preventDefault();
    var gregorianDate = document.getElementById("gregorianInput").value;
    var jalaliDate = moment(gregorianDate, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
    document.getElementById("jalaliOutput").innerText = jalaliDate;
    document.querySelector("#jalaliOutput").parentElement.style.display = "block"; // نمایش نتیجه پس از تبدیل
};

// تبدیل تاریخ شمسی به میلادی
document.getElementById("convertToGregorianForm").onsubmit = function () {
    var input = document.getElementById("jalaliInput").value;
    var output = moment.from(input, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
    document.getElementById("gregorianOutput").innerText = output;
    document.querySelector("#gregorianOutput").parentElement.style.display = "block"; // نمایش نتیجه پس از تبدیل
    return false;
};

