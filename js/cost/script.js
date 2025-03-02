const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const searchExpense = document.getElementById('searchExpense');
const expenseReport = document.getElementById('expenseReport');
const submitBtn = document.getElementById('submitBtn'); // دکمه ارسال
let editingExpenseIndex = -1; // ایندکس هزینه‌ای که در حال ویرایش است

// تابع برای ذخیره مخارج در LocalStorage
function saveExpenses(expenses) {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// تابع برای بارگذاری مخارج از LocalStorage
function loadExpenses() {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  return expenses;
}

// تابع برای نمایش مخارج در صفحه
function displayExpenses(expenses) {
  if (expenses.length === 0) {
    expenseList.innerHTML = ''; // خالی کردن بخش نمایش هزینه‌ها
    return;
  }

  let expenseTable = `
    <table class="table table-bordered">
      <thead>
        <tr class="bg-success text-center">
          <th>عنوان هزینه</th>
          <th>مقدار</th>
          <th>دسته‌بندی</th>
          <th>تاریخ</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  expenses.forEach((expense, index) => {
    expenseTable += `
      <tr data-id="${expense.id}">
        <td>${expense.name}</td>
        <td>${(expense.amount / 1000).toLocaleString()} تومان</td> <!-- تبدیل ریال به تومان -->
        <td>${expense.category}</td>
        <td>${expense.date}</td>
        <td class="action-buttons">
          <i class="fas fa-edit text-warning" onclick="editExpense('${expense.id}')"></i>
          <i class="fas fa-trash-alt text-danger" onclick="deleteExpense('${expense.id}')"></i>
        </td>
      </tr>
    `;
  });

  expenseTable += `</tbody></table>`;
  expenseList.innerHTML = expenseTable;
}

// نمایش گزارش هزینه‌ها
function displayExpenseReport() {
  const expenses = loadExpenses();
  const categoryTotals = {};

  expenses.forEach(expense => {
    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }
    categoryTotals[expense.category] += expense.amount;
  });

  let categoryReport = '';
  for (const category in categoryTotals) {
    categoryReport += `
      <tr>
        <td>${category}</td>
        <td>${(categoryTotals[category] / 1000).toLocaleString()} تومان</td> <!-- تبدیل ریال به تومان -->
      </tr>
    `;
  }

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  document.getElementById('totalExpensesByCategory').innerHTML = categoryReport;
  document.getElementById('totalExpenses').innerHTML = `<h6>مجموع هزینه‌ها: ${(total / 1000).toLocaleString()} تومان</h6>`;  <!-- تبدیل ریال به تومان -->
}

// افزودن یا ویرایش هزینه جدید
expenseForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const expenseName = document.getElementById('expenseName').value;
  const expenseAmount = parseInt(document.getElementById('expenseAmount').value, 10) * 1000; // تبدیل تومان به ریال
  const expenseCategory = document.getElementById('expenseCategory').value;
  const expenseDate = document.getElementById('expenseDate').value;

  if (expenseName && expenseAmount > 0 && expenseCategory && expenseDate) {
    const expenses = loadExpenses();
    const expenseId = Date.now().toString();

    if (editingExpenseIndex === -1) {
      expenses.push({ id: expenseId, name: expenseName, amount: expenseAmount, category: expenseCategory, date: expenseDate });
    } else {
      const expenseToEdit = expenses.find(exp => exp.id === editingExpenseIndex);
      expenseToEdit.name = expenseName;
      expenseToEdit.amount = expenseAmount;
      expenseToEdit.category = expenseCategory;
      expenseToEdit.date = expenseDate;
      editingExpenseIndex = -1;
      submitBtn.textContent = "اضافه کردن هزینه"; // بازگشت به "اضافه کردن"
    }

    saveExpenses(expenses);

    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseCategory').value = '';
    document.getElementById('expenseDate').value = '';

    displayExpenses(expenses);
    displayExpenseReport();
  } else {
    alert('لطفاً تمامی فیلدها را پر کنید.');
  }
});

// ویرایش هزینه
function editExpense(expenseId) {
  const expenses = loadExpenses();
  const expense = expenses.find(exp => exp.id === expenseId);
  document.getElementById('expenseName').value = expense.name;
  document.getElementById('expenseAmount').value = expense.amount / 1000; // تبدیل ریال به تومان
  document.getElementById('expenseCategory').value = expense.category;
  document.getElementById('expenseDate').value = expense.date;
  editingExpenseIndex = expenseId;
  submitBtn.textContent = "ویرایش هزینه"; // تغییر متن دکمه به "ویرایش"
}

// حذف هزینه
function deleteExpense(expenseId) {
  if (confirm('آیا مطمئن هستید که می‌خواهید این هزینه را حذف کنید؟')) {
    const expenses = loadExpenses();
    const filteredExpenses = expenses.filter(exp => exp.id !== expenseId);
    saveExpenses(filteredExpenses);
    displayExpenses(filteredExpenses);
    displayExpenseReport();
  }
}

// فیلتر کردن هزینه‌ها بر اساس جستجو
searchExpense.addEventListener('input', function() {
  const query = searchExpense.value.toLowerCase();
  const expenses = loadExpenses();

  const filteredExpenses = expenses.filter(expense => {
    return (
      expense.name.toLowerCase().includes(query) ||
      expense.category.toLowerCase().includes(query) ||
      expense.amount.toString().includes(query) ||
      expense.date.toLowerCase().includes(query) // جستجو در تاریخ نیز افزوده شد
    );
  });

  displayExpenses(filteredExpenses);
});

// بارگذاری مخارج و گزارش هزینه‌ها بعد از بارگذاری صفحه
document.addEventListener('DOMContentLoaded', function() {
  const expenses = loadExpenses();
  displayExpenses(expenses);
  displayExpenseReport();
});


// jalaliDatepicker.startWatch();
 