
// ایجاد نرخ‌های تبدیل برای هر دسته واحد
const conversionRates = {
    length: {
        m: 1,
        cm: 100,
        km: 0.001,
        mm: 1000,
        mile: 0.000621371,  // مایل
        yard: 1.09361       // یارد
    },
    temperature: {
        celsius: value => value,
        fahrenheit: value => (value * 9/5) + 32,
        kelvin: value => value + 273.15,
        rankine: value => (value + 273.15) * 9/5  // رنکین
    },
    area: {
        sqm: 1,
        sqm_km: 0.000001,
        sqm_mile: 3.861e-7,
        sqm_foot: 10.7639,
        hectare: 0.0001,  // هکتار
        acre: 0.000247105  // آکر
    },
    volume: {
        liter: 1,
        milliliter: 1000,
        cubic_meter: 0.001,
        gallon: 0.264172,
        pint: 2.11338,  // پینت
        cup: 4.22675  // فنجان
    },
    weight: {
        kg: 1,
        gram: 1000,
        ton: 0.001,
        pound: 2.20462,
        ounce: 35.274,  // اونس
        stone: 0.157473  // استون
    }
};

function changeCategory() {
    let category = document.getElementById('category').value;
    let formHtml = '';

    // نمایش فرم مناسب بر اساس انتخاب نوع واحد
    switch(category) {
        case 'length':
            formHtml = `
                <label for="value" class="form-label">مقدار را وارد کنید:</label>
                <input type="number" id="value" class="form-control" placeholder="مقدار را وارد کنید">
                <br>
                <label for="fromUnit" class="form-label">از واحد:</label>
                <select id="fromUnit" class="form-select">
                    <option value="m">متر</option>
                    <option value="cm">سانتی‌متر</option>
                    <option value="km">کیلومتر</option>
                    <option value="mm">میلی‌متر</option>
                    <option value="mile">مایل</option>
                    <option value="yard">یارد</option>
                </select>
                <br>
                <label for="toUnit" class="form-label">به واحد:</label>
                <select id="toUnit" class="form-select">
                    <option value="m">متر</option>
                    <option value="cm">سانتی‌متر</option>
                    <option value="km">کیلومتر</option>
                    <option value="mm">میلی‌متر</option>
                    <option value="mile">مایل</option>
                    <option value="yard">یارد</option>
                </select>
            `;
            break;
        case 'temperature':
            formHtml = `
                <label for="value" class="form-label">مقدار را وارد کنید:</label>
                <input type="number" id="value" class="form-control" placeholder="مقدار را وارد کنید">
                <br>
                <label for="fromUnit" class="form-label">از واحد:</label>
                <select id="fromUnit" class="form-select">
                    <option value="celsius">سلسیوس</option>
                    <option value="fahrenheit">فارینهایت</option>
                    <option value="kelvin">کلوین</option>
                    <option value="rankine">رنکین</option>
                </select>
                <br>
                <label for="toUnit" class="form-label">به واحد:</label>
                <select id="toUnit" class="form-select">
                    <option value="celsius">سلسیوس</option>
                    <option value="fahrenheit">فارینهایت</option>
                    <option value="kelvin">کلوین</option>
                    <option value="rankine">رنکین</option>
                </select>
            `;
            break;
        case 'area':
            formHtml = `
                <label for="value" class="form-label">مقدار را وارد کنید:</label>
                <input type="number" id="value" class="form-control" placeholder="مقدار را وارد کنید">
                <br>
                <label for="fromUnit" class="form-label">از واحد:</label>
                <select id="fromUnit" class="form-select">
                    <option value="sqm">متر مربع</option>
                    <option value="sqm_km">کیلومتر مربع</option>
                    <option value="sqm_mile">مایل مربع</option>
                    <option value="sqm_foot">فوت مربع</option>
                    <option value="hectare">هکتار</option>
                    <option value="acre">آکر</option>
                </select>
                <br>
                <label for="toUnit" class="form-label">به واحد:</label>
                <select id="toUnit" class="form-select">
                    <option value="sqm">متر مربع</option>
                    <option value="sqm_km">کیلومتر مربع</option>
                    <option value="sqm_mile">مایل مربع</option>
                    <option value="sqm_foot">فوت مربع</option>
                    <option value="hectare">هکتار</option>
                    <option value="acre">آکر</option>
                </select>
            `;
            break;
        case 'volume':
            formHtml = `
                <label for="value" class="form-label">مقدار را وارد کنید:</label>
                <input type="number" id="value" class="form-control" placeholder="مقدار را وارد کنید">
                <br>
                <label for="fromUnit" class="form-label">از واحد:</label>
                <select id="fromUnit" class="form-select">
                    <option value="liter">لیتر</option>
                    <option value="milliliter">میلی‌لیتر</option>
                    <option value="cubic_meter">متر مکعب</option>
                    <option value="gallon">گالن</option>
                    <option value="pint">پینت</option>
                    <option value="cup">فنجان</option>
                </select>
                <br>
                <label for="toUnit" class="form-label">به واحد:</label>
                <select id="toUnit" class="form-select">
                    <option value="liter">لیتر</option>
                    <option value="milliliter">میلی‌لیتر</option>
                    <option value="cubic_meter">متر مکعب</option>
                    <option value="gallon">گالن</option>
                    <option value="pint">پینت</option>
                    <option value="cup">فنجان</option>
                </select>
            `;
            break;
        case 'weight':
            formHtml = `
                <label for="value" class="form-label">مقدار را وارد کنید:</label>
                <input type="number" id="value" class="form-control" placeholder="مقدار را وارد کنید">
                <br>
                <label for="fromUnit" class="form-label">از واحد:</label>
                <select id="fromUnit" class="form-select">
                    <option value="kg">کیلوگرم</option>
                    <option value="gram">گرم</option>
                    <option value="ton">تن</option>
                    <option value="pound">پوند</option>
                    <option value="ounce">اونس</option>
                    <option value="stone">استون</option>
                </select>
                <br>
                <label for="toUnit" class="form-label">به واحد:</label>
                <select id="toUnit" class="form-select">
                    <option value="kg">کیلوگرم</option>
                    <option value="gram">گرم</option>
                    <option value="ton">تن</option>
                    <option value="pound">پوند</option>
                    <option value="ounce">اونس</option>
                    <option value="stone">استون</option>
                </select>
            `;
            break;
    }

    document.getElementById('formContainer').innerHTML = formHtml;
}

// تابع تبدیل واحد
function convertUnit() {
    let category = document.getElementById('category').value;
    let value = parseFloat(document.getElementById('value').value);
    let fromUnit = document.getElementById('fromUnit').value;
    let toUnit = document.getElementById('toUnit').value;

    if (isNaN(value)) {
        alert("لطفا یک مقدار صحیح وارد کنید");
        return;
    }

    let convertedValue;

    // تبدیل واحد بر اساس دسته انتخاب شده
    if (category === "length") {
        let valueInMeters = value / conversionRates.length[fromUnit];
        convertedValue = valueInMeters * conversionRates.length[toUnit];
    } else if (category === "temperature") {
        let tempInCelsius = conversionRates.temperature[fromUnit](value);
        if (toUnit === 'celsius') {
            convertedValue = tempInCelsius;
        } else if (toUnit === 'fahrenheit') {
            convertedValue = (tempInCelsius * 9/5) + 32;
        } else if (toUnit === 'kelvin') {
            convertedValue = tempInCelsius + 273.15;
        } else if (toUnit === 'rankine') {
            convertedValue = (tempInCelsius + 273.15) * 9/5;
        }
    } else if (category === "area") {
        let valueInSquareMeters = value / conversionRates.area[fromUnit];
        convertedValue = valueInSquareMeters * conversionRates.area[toUnit];
    } else if (category === "volume") {
        let valueInLiters = value / conversionRates.volume[fromUnit];
        convertedValue = valueInLiters * conversionRates.volume[toUnit];
    } else if (category === "weight") {
        let valueInKg = value / conversionRates.weight[fromUnit];
        convertedValue = valueInKg * conversionRates.weight[toUnit];
    }

    document.getElementById('result').textContent = `${value} ${fromUnit} برابر است با ${convertedValue} ${toUnit}`;
}

// بارگذاری اولیه فرم برای طول
changeCategory();

