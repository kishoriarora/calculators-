const amountEl = document.getElementById('amount');
const fromEl = document.getElementById('from-currency');
const toEl = document.getElementById('to-currency');
const flagFrom = document.getElementById('flag-from');
const flagTo = document.getElementById('flag-to');
const rateInfo = document.getElementById('rate-info');
const btn = document.getElementById('convert-btn');
const row = document.getElementsByClassName('row select');

// Populate dropdowns with currency codes
const currencyCodes =  ["USD","AED","INR","EUR","GBP","JPY"]
 // expand as needed
 



currencyCodes.forEach(code => {
  fromEl.innerHTML += `<option value="${code}">${code}</option>`;
  toEl.innerHTML += `<option value="${code}">${code}</option>`;
});

function setFlag(elFlag, currency) {
  const country = currency.slice(0,2).toLowerCase();
  elFlag.src = `https://flagcdn.com/24x18/${country}.png`;
}

// Update flags when currency changes
[fromEl, toEl].forEach((sel, i) =>
  sel.addEventListener('change', () => setFlag(i===0 ? flagFrom : flagTo, sel.value))
);

// Perform conversion
btn.addEventListener('click', async () => {
  const amt = parseFloat(amountEl.value) || 1;
  const from = fromEl.value;
  const to = toEl.value;
  const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
  const data = await res.json();
  const rate = data.rates[to];
  const converted = (amt * rate).toFixed(2);
  rateInfo.textContent = `${amt} ${from} = ${converted} ${to} (1 ${from} = ${rate.toFixed(4)} ${to})`;
  setFlag(flagFrom, from);
  setFlag(flagTo, to);
});
