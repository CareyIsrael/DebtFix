document.getElementById("calculateButton").addEventListener("click", function () {
    const income = parseFloat(document.getElementById("income").value);
    const debt = parseFloat(document.getElementById("debt").value) || 0;
    const rent = parseFloat(document.getElementById("rent").value) || 0;
    const utilities = parseFloat(document.getElementById("utilities").value) || 0;
    const transport = parseFloat(document.getElementById("transport").value) || 0;
    const insurance = parseFloat(document.getElementById("insurance").value) || 0;
    const misc = parseFloat(document.getElementById("misc").value) || 0;
  
    let totalExpenses = rent + utilities + transport + insurance + misc;
  
    document.querySelectorAll('.additional-expense').forEach(expense => {
      totalExpenses += parseFloat(expense.value) || 0;
    });
  
    if (isNaN(income) || isNaN(debt)) {
      document.getElementById("result").classList.remove("d-none");
      document.getElementById("result").innerText = "Please enter valid numbers for income and debt.";
      return;
    }
  
    const surplus = income - totalExpenses;
    const monthsToClearDebt = surplus > 0 ? (debt / surplus).toFixed(1) : "∞";
  
    let resultText;
    if (surplus <= 0) {
      resultText = "Your expenses exceed or match your income. Please adjust to create a surplus.";
    } else if (monthsToClearDebt === "∞") {
      resultText = "It will take an indefinite amount of time to clear your debt.";
    } else {
      resultText = `Your monthly surplus is $${surplus.toFixed(2)}. At this rate, it will take approximately ${monthsToClearDebt} months to clear your debt.`;
    }
  
    document.getElementById("result").classList.remove("d-none");
    document.getElementById("result").innerText = resultText;
  });
  
  document.getElementById("add-expense-button").addEventListener("click", function () {
    const name = document.getElementById("new-expense-name").value;
    const amount = parseFloat(document.getElementById("new-expense-amount").value) || 0;
  
    if (!name) {
      alert("Please enter a name for the new expense.");
      return;
    }
  
    const additionalExpensesDiv = document.getElementById("additional-expenses");
  
    const newExpenseDiv = document.createElement("div");
    newExpenseDiv.classList.add("input-group", "mb-2");
  
    const label = document.createElement("label");
    label.innerText = `${name}: $`;
    label.classList.add("input-group-text");
  
    const input = document.createElement("input");
    input.type = "number";
    input.classList.add("form-control", "additional-expense");
    input.value = amount;
  
    newExpenseDiv.appendChild(label);
    newExpenseDiv.appendChild(input);
  
    additionalExpensesDiv.appendChild(newExpenseDiv);
  
    document.getElementById("new-expense-name").value = "";
    document.getElementById("new-expense-amount").value = "";
  });
  