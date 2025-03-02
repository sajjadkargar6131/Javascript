
// تابع برای محاسبه سن دقیق
function calculateAge(dob) {
    // تاریخ تولد را به میلادی تبدیل می‌کنیم
    const birthDate = moment.from(dob, 'fa', 'YYYY/MM/DD').locale('en');
    const today = moment();

    // محاسبه اختلاف سال‌ها
    let years = today.diff(birthDate, 'years');
    // محاسبه اختلاف ماه‌ها
    let months = today.diff(birthDate, 'months') % 12;
    // محاسبه اختلاف روزها
    let days = today.diff(birthDate, 'days') % 30; // به طور تقریبی برای روزها

    return { years, months, days };
}

// افزودن رویداد به فرم
document.getElementById('ageCalculatorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const dob = document.getElementById('dob').value;

    if (dob) {
        const { years, months, days } = calculateAge(dob);
        document.getElementById('result').innerText = `سن شما: ${years} سال، ${months} ماه، ${days} روز`;
    } else {
        document.getElementById('result').innerText = 'لطفاً تاریخ تولد خود را وارد کنید.';
    }
});
