
// تابع برای محاسبه BMI
function calculateBMI(weight, height) {
    height = height / 100; // تبدیل قد به متر
    return weight / (height * height);
}

// تابع برای ارائه پیشنهادات بر اساس وضعیت BMI
function getSuggestions(bmi) {
    let suggestions = "";

    if (bmi < 18.5) {
        suggestions = `
            <h5>پیشنهادات برای افزایش وزن:</h5>
            <ul>
                <li>غذاهای پرکالری مانند آجیل، موز، کره بادام زمینی و محصولات لبنی پرچرب مصرف کنید.</li>
                <li>سعی کنید وعده‌های غذایی بیشتری در طول روز بخورید.</li>
                <li>ورزش‌های قدرتی مانند وزنه‌برداری می‌تواند به افزایش توده عضلانی کمک کند.</li>
                <li>استراحت کافی و خواب مناسب را فراموش نکنید.</li>
            </ul>
        `;
    } else if (bmi >= 18.5 && bmi < 24.9) {
        suggestions = `
            <h5>وضعیت شما عالی است!</h5>
            <p>شما در وزن نرمال قرار دارید. ادامه دهید که سبک زندگی سالم را حفظ کنید.</p>
            <ul>
                <li>رژیم غذایی متعادل و متنوعی داشته باشید.</li>
                <li>ورزش‌های هوازی مانند دویدن، شنا و دوچرخه‌سواری را ادامه دهید.</li>
                <li>مطمئن شوید که استراحت کافی و خواب مناسب دارید.</li>
            </ul>
        `;
    } else if (bmi >= 25 && bmi < 29.9) {
        suggestions = `
            <h5>پیشنهادات برای کاهش وزن:</h5>
            <ul>
                <li>مصرف کالری خود را کاهش دهید و غذاهای کم‌چرب و کم‌کالری بیشتر مصرف کنید.</li>
                <li>ورزش‌های هوازی مانند پیاده‌روی، دویدن و شنا را شروع کنید.</li>
                <li>میزان مصرف قند و غذاهای فرآوری‌شده را کاهش دهید.</li>
                <li>سعی کنید وعده‌های غذایی کوچکتر و متناوب مصرف کنید.</li>
            </ul>
        `;
    } else {
        suggestions = `
            <h5>پیشنهادات برای کاهش چربی بدن:</h5>
            <ul>
                <li>کاهش مصرف غذاهای پرکالری و پرچرب مانند فست‌فود و غذاهای فرآوری‌شده.</li>
                <li>ورزش‌های قدرتی و هوازی (مانند پیاده‌روی، دویدن، شنا) به مدت حداقل ۳۰ دقیقه ۵ روز در هفته.</li>
                <li>کنترل حجم وعده‌های غذایی و کاهش مصرف غذاهای شیرین و نوشیدنی‌های قندی.</li>
                <li>پیش از خواب، رژیم غذایی مناسب و خواب کافی داشته باشید.</li>
            </ul>
        `;
    }

    document.getElementById("suggestions").innerHTML = suggestions;
    document.getElementById("suggestions").style.display = "block";
}

// رویداد ارسال فرم
document.getElementById("bmiForm").addEventListener("submit", function (e) {
    e.preventDefault(); // جلوگیری از ارسال فرم

    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        document.getElementById("result").innerHTML = "لطفاً مقادیر صحیح وارد کنید.";
        return;
    }

    const bmi = calculateBMI(weight, height);
    let resultText = `شاخص توده بدنی شما: ${bmi.toFixed(2)}`;

    if (bmi < 18.5) {
        resultText += " (کمبود وزن)";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        resultText += " (وزن نرمال)";
    } else if (bmi >= 25 && bmi < 29.9) {
        resultText += " (اضافه وزن)";
    } else {
        resultText += " (چاقی)";
    }

    document.getElementById("result").innerHTML = resultText;

    // نمایش پیشنهادات
    getSuggestions(bmi);
});
