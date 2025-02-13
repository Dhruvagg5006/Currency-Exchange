let exchangeRate = null;

function populateSelect(currencies) {
    const selects = document.querySelectorAll("select");

    for (const select of selects) {
        currencies.forEach(currency => {
            const option = document.createElement("option");
            option.value = currency;

            const text = document.createTextNode(currency);
            option.appendChild(text);

            select.appendChild(option);
        });
    }
}

async function fetchCurrencies() {
    const res = await fetch("https://api.frankfurter.dev/v1/currencies");
    const data = await res.json();

    populateSelect(Object.keys(data));
}

async function fetchRates() {
    const fromCurr = document.getElementById("fromSelect").value;
    const toCurr = document.getElementById("toSelect").value;

    const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${fromCurr}&symbols=${toCurr}`);
    const data = await res.json();

    console.log(data);
    exchangeRate = data.rates[toCurr];

    // Update the UI
    document.getElementById("fromTitle").textContent = fromCurr;
    document.getElementById("toTitle").textContent = toCurr;

    const val = document.getElementById("fromVal").value;
    document.getElementById("toVal").value = data.rates[toCurr] * val;
}

function updateOutput() {
    if (exchangeRate === null)
        return;

    const val = document.getElementById("fromVal").value;

    const output = val * exchangeRate;
    document.getElementById("toVal").value = output;
}

fetchCurrencies();
document.querySelector("button").addEventListener("click", fetchRates);
document.getElementById("fromVal").addEventListener("input", updateOutput);
