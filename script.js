document.getElementById('converterForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
  
    const response = await fetch(`/convert?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
    const data = await response.json();
  
    document.getElementById('result').textContent = `Converted Amount: ${data.convertedAmount}`;
  });
  