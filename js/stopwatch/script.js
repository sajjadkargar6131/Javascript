let stopwatchTime = 0; // تغییر به میلی‌ثانیه
let isRunning = false;  // برای کنترل وضعیت کرنومتر
let lastTime = 0; // برای ذخیره زمان آخرین فریم
let stopwatchDisplay = document.getElementById('stopwatchDisplay');
let startStopwatchButton = document.getElementById('startStopwatch');
let resetStopwatchButton = document.getElementById('resetStopwatch');

function updateStopwatch(currentTime) {
  if (isRunning) {
    const deltaTime = currentTime - lastTime; // زمان گذشته از آخرین فریم
    stopwatchTime += deltaTime; // افزایش زمان به میلی‌ثانیه

    const hours = Math.floor(stopwatchTime / 3600000); // تبدیل به ساعت
    const minutes = Math.floor((stopwatchTime % 3600000) / 60000); // تبدیل به دقیقه
    const seconds = Math.floor((stopwatchTime % 60000) / 1000); // تبدیل به ثانیه
    const hundredths = Math.floor((stopwatchTime % 1000) / 10); // گرفتن صدم ثانیه

    stopwatchDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(hundredths).padStart(2, '0')}`;

    lastTime = currentTime; // به‌روزرسانی زمان آخرین فریم
  }

  // درخواست فریم بعدی
  requestAnimationFrame(updateStopwatch);
}

function startStopwatch() {
  isRunning = true;
  lastTime = performance.now(); // ثبت زمان شروع
  startStopwatchButton.textContent = 'توقف کرنومتر';
  startStopwatchButton.classList.remove('btn-success');
  startStopwatchButton.classList.add('btn-warning');
}

function stopStopwatch() {
  isRunning = false;
  startStopwatchButton.textContent = 'شروع کرنومتر';
  startStopwatchButton.classList.remove('btn-warning');
  startStopwatchButton.classList.add('btn-success');
}

function resetStopwatch() {
  stopwatchTime = 0;
  stopwatchDisplay.textContent = '00:00:00:00'; // تنظیم مجدد به حالت صفر
  isRunning = false;
  startStopwatchButton.textContent = 'شروع کرنومتر';
  startStopwatchButton.classList.remove('btn-warning');
  startStopwatchButton.classList.add('btn-success');
}

startStopwatchButton.addEventListener('click', function() {
  if (isRunning) {
    stopStopwatch();
  } else {
    startStopwatch();
    requestAnimationFrame(updateStopwatch); // شروع به گرفتن فریم‌ها
  }
});

resetStopwatchButton.addEventListener('click', resetStopwatch);