document.addEventListener('DOMContentLoaded', () => {
    const budgetInput = document.getElementById('total-amount');
    const budgetButton = document.getElementById('total-amount-button');
    const expenseTitleInput = document.getElementById('product-title');
    const expenseAmountInput = document.getElementById('user-amount');
    const expenseButton = document.getElementById('check-amount');
    const amountDisplay = document.getElementById('amount');
    const expenditureDisplay = document.getElementById('expenditure-value');
    const balanceDisplay = document.getElementById('balance-amount');
    const listContainer = document.getElementById('list');
    const budgetError = document.getElementById('budget-error');
    const productTitleError = document.getElementById('product-title-error');

    let budget = 0;
    let expenses = [];

    // Update the display for budget, expenses, and balance
    const updateDisplay = () => {
        amountDisplay.textContent = budget;
        let totalExpenses = 0;
        for (let i = 0; i < expenses.length; i++) {
            totalExpenses += expenses[i].amount;
        }
        expenditureDisplay.textContent = totalExpenses;
        balanceDisplay.textContent = (budget - totalExpenses);
        renderExpenseList();
    };

    // Render the expense list
    const renderExpenseList = () => {
        listContainer.innerHTML = '';
        expenses.forEach((expense, index) => {
            const expenseItem = document.createElement('div');
            expenseItem.className = 'sublist-content';
            expenseItem.innerHTML = `
                <div class="product">${expense.title}</div>
                <div class="amount">${expense.amount}</div>
                <button class="edit" data-index="${index}"><i class="fas fa-edit"></i></button>
                <button class="delete" data-index="${index}"><i class="fas fa-trash"></i></button>
            `;
            listContainer.appendChild(expenseItem);
        });

        // Add event listeners for edit and delete buttons
        listContainer.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                expenseTitleInput.value = expenses[index].title;
                expenseAmountInput.value = expenses[index].amount;
                expenses.splice(index, 1);
                updateDisplay();
            });
        });

        listContainer.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                expenses.splice(index, 1);
                updateDisplay();
            });
        });
    };

    // Set the total budget
    budgetButton.addEventListener('click', () => {
        const inputValue = parseFloat(budgetInput.value);
        if (isNaN(inputValue) || inputValue <= 0) {
            budgetError.classList.remove('hide');
        } else {
            budget = inputValue;
            budgetError.classList.add('hide');
            updateDisplay();
            budgetInput.value = '';
        }
    });

    // Add an expense
    expenseButton.addEventListener('click', () => {
        const title = expenseTitleInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value);
        if (!title || isNaN(amount) || amount <= 0) {
            productTitleError.classList.remove('hide');
        } else {
            productTitleError.classList.add('hide');
            expenses.push({ title, amount });
            expenseTitleInput.value = '';
            expenseAmountInput.value = '';
            updateDisplay();
        }
    });
});
