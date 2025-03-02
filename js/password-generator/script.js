
// تابع برای ساخت پسورد رندوم
function generatePassword(length, options) {
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let charSet = '';

    if (options.uppercase) charSet += upperCaseChars;
    if (options.lowercase) charSet += lowerCaseChars;
    if (options.numbers) charSet += numberChars;
    if (options.specialChars) charSet += specialChars;

    if (charSet === '') return ''; // اگر هیچ گزینه‌ای انتخاب نشده باشد

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
    }

    return password;
}

// اضافه کردن رویداد به فرم
document.getElementById('passwordForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const length = document.getElementById('length').value;
    const options = {
        uppercase: document.getElementById('uppercase').checked,
        lowercase: document.getElementById('lowercase').checked,
        numbers: document.getElementById('numbers').checked,
        specialChars: document.getElementById('specialChars').checked
    };

    // ساخت پسورد
    const password = generatePassword(length, options);

    // نمایش پسورد
    if (password) {
        document.getElementById('result').innerText = `پسورد شما: ${password}`;
    } else {
        document.getElementById('result').innerText = 'لطفاً حداقل یک نوع از گزینه‌ها را انتخاب کنید.';
    }
});

