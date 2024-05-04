function sortData() {
  data = account.sort((a, b) => (a.month > b.month ? 1 : -1));
}

sortData();

function renderTableHTML() {
  let HTML = "";
  for (let i = 0; i < data.length; i++) {
    mon = data[i].month;
    inc = data[i].income;
    exp = data[i].expense;

    monName = months[mon - 1];

    if (exp == undefined) {
      exp = 0;
    }

    if (inc == undefined) {
      inc = 0;
    }

    HTML += `<div class="table-row">
                  <div class="cell">${i + 1}</div>
                  <div class="cell">${monName}</div>
                  <div class="cell">${inc} Eur</div>
                  <div class="cell">${exp} Eur</div>
                  <div class="cell">${inc - exp} Eur</div>
              </div>`;
  }

  document.querySelector(".table-content").innerHTML = HTML;
}

function renderTableFooterHTML() {
  let HTML = "";
  let incSum = 0;
  let expSum = 0;

  for (let i = 0; i < data.length; i++) {
    inc = data[i].income;
    exp = data[i].expense;

    if (exp == undefined) {
      exp = 0;
    }

    if (inc == undefined) {
      inc = 0;
    }

    incSum += inc;
    expSum += exp;
  }
  HTML += `<div class="cell"></div>
              <div class="cell"></div>
              <div class="cell">${incSum} Eur</div>
              <div class="cell">${expSum} Eur</div>
              <div class="cell">${incSum - expSum} Eur</div>`;

  document.querySelector(".table-footer").innerHTML = HTML;
}

function renderSummary() {
  summaryRows = [
    "mėnuo, kai buvo mažiausiai uždirbta, bet ne lygu nuliui",
    "mėnuo, kai buvo daugiausiai uždirbta",
    "mėnuo, kai buvo mažiausios išlaidos, bet ne lygios nuliui",
    "mėnuo, kai buvo didžiausios išlaidos",
  ];

  let HTML = "";
  let maxExp = 0;
  let minExp = Infinity;
  let maxRev = 0;
  let minRev = Infinity;

  // get max expenses
  for (let e = 0; e < account.length; e++) {
    val = account[e].expense;
    if (val > maxExp) {
      maxExp = val;
      maxExpMon = account[e].month;
    }
  }

  // get min expenses
  for (let e = 0; e < account.length; e++) {
    val = account[e].expense;
    if (val < minExp) {
      minExp = val;
      minExpMon = account[e].month;
    }
  }

  // get max revenue
  for (let e = 0; e < account.length; e++) {
    val = account[e].income - account[e].expense;
    if (val > maxRev) {
      maxRev = val;
      maxRevMon = account[e].month;
    }
  }

  // get min revenue
  for (let e = 0; e < account.length; e++) {
    val = account[e].income - account[e].expense;
    if (val < minRev) {
      minRev = val;
      minRevMon = account[e].month;
    }
  }

  minRevMonth = months[minRevMon - 1];
  maxRevMonth = months[maxRevMon - 1];
  minExpMonth = months[minExpMon - 1];
  maxExpMonth = months[maxExpMon - 1];

  monthsForSummary = [minRevMonth, maxRevMonth, minExpMonth, maxExpMonth];

  for (let a = 0; a < summaryRows.length; a++) {
    HTML += `<div class="item">
                  <div id="minIncome" class="value">${monthsForSummary[a]}</div>
                  <div class="title">${summaryRows[a]}</div>
              </div>`;
  }
  document.querySelector(".summary-list").innerHTML = HTML;
}

renderTableHTML();
renderTableFooterHTML();
renderSummary();
