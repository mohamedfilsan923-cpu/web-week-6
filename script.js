// ==========================================
// REQUIREMENT 2: Work with Multiple Records
// Array to store expense records as objects
// ==========================================
let expenses = [];

// DOM Element References
const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const budgetInput = document.getElementById('monthly-budget');

const expenseListUI = document.getElementById('expense-list');
const totalExpensesUI = document.getElementById('total-expenses');
const remainingBudgetUI = document.getElementById('remaining-budget');
const feedbackUI = document.getElementById('feedback-message');

// ==========================================
// REQUIREMENT 5: Handle User Interactions
// Listening for form submit and budget input events
// ==========================================
expenseForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent page refresh

  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);

  if (name !== '' && !isNaN(amount) && amount > 0) {
    // Add record to array
    expenses.push({ name: name, amount: amount });

    // Reset inputs
    expenseNameInput.value = '';
    expenseAmountInput.value = '';

    // Update Dashboard UI
    updateDashboard();
  }
});

budgetInput.addEventListener('input', updateDashboard);

// ==========================================
// REQUIREMENT 6: Connect Everything Together
// Function to handle processing and UI updates
// ==========================================
function updateDashboard() {
  const budget = parseFloat(budgetInput.value) || 0;

  // ----------------------------------------
  // REQUIREMENT 3: Process Data with Loops
  // Calculate total expenses using a loop
  // ----------------------------------------
  let totalExpenses = 0;
  for (let i = 0; i < expenses.length; i++) {
    totalExpenses += expenses[i].amount;
  }

  const remainingBudget = budget - totalExpenses;

  // ----------------------------------------
  // REQUIREMENT 4: Dynamic DOM Manipulation
  // Render expense items dynamically into the DOM
  // ----------------------------------------
  expenseListUI.innerHTML = ''; // Clear list

  for (let i = 0; i < expenses.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${expenses[i].name}</span> <span>$${expenses[i].amount.toFixed(2)}</span>`;
    expenseListUI.appendChild(li);
  }

  // Update summary numbers on the webpage
  totalExpensesUI.textContent = totalExpenses.toFixed(2);
  remainingBudgetUI.textContent = remainingBudget.toFixed(2);

  // ----------------------------------------
  // REQUIREMENT 1: Implement Decision Making
  // Evaluate budget status and provide visual feedback
  // ----------------------------------------
  feedbackUI.className = 'alert-box'; // reset class

  if (remainingBudget < 0) {
    feedbackUI.textContent = 'Warning: You have exceeded your monthly budget!';
    feedbackUI.classList.add('danger');
  } else if (remainingBudget <= budget * 0.2) {
    feedbackUI.textContent = 'Notice: You have used over 80% of your budget.';
    feedbackUI.classList.add('warning');
  } else {
    feedbackUI.textContent = 'Great job! Your spending is well within budget.';
    feedbackUI.classList.add('normal');
  }
}

// Initial Call to set up UI
updateDashboard();