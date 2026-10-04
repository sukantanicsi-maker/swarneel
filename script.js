const API_URL = 'এখানে আপনার Apps Script Web App URL বসান';

async function loadTotalBuy() {
  const el = document.getElementById('totalBuy');
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    el.textContent = data.totalBuy;
  } catch (err) {
    console.error(err);
    el.textContent = 'ডেটা লোড হয়নি';
  }
}

loadTotalBuy();
