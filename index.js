// =========================
// CALCULATE TOTALS
// =========================
function calculateTotals() {
  const rows = document.querySelectorAll("#invoice-table tr");
  let grandTotal = 0;

  rows.forEach((row, index) => {
    if (index === 0) return; // skip header row

    const qtyInput = row.querySelector(".qty");
    const priceInput = row.querySelector(".price");
    const totalCell = row.querySelector(".row-total");

    if (!qtyInput || !priceInput || !totalCell) return;

    const qty = parseFloat(qtyInput.value) || 0;
    const price = parseFloat(priceInput.value) || 0;
    const total = qty * price;

    totalCell.textContent = `$${total.toFixed(2)}`;
    grandTotal += total;
  });

  document.getElementById("grand-total").textContent = grandTotal.toFixed(2);
}

// =========================
// EVENT LISTENERS
// =========================
document.addEventListener("input", (e) => {
  if (e.target.classList.contains("qty") || e.target.classList.contains("price")) {
    calculateTotals();
  }
});

// =========================
// PDF DOWNLOAD
// =========================
document.getElementById("download-btn").addEventListener("click", () => {
  const invoice = document.getElementById("invoice");

  const options = {
    margin: 0.5,
    filename: "invoice.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
  };

  html2pdf().set(options).from(invoice).save();
});

// =========================
// INITIAL LOAD
// =========================
window.addEventListener("DOMContentLoaded", () => {
  calculateTotals();
});