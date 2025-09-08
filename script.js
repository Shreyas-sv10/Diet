// --- DATA STORAGE ---
let weights = [];
let labels = [];
let totalCalories = 0;

// --- CHART.JS SETUP ---
const ctx = document.getElementById('weightChart');
const weightChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Weight (kg)',
      data: weights,
      borderColor: '#388e3c',
      backgroundColor: 'rgba(56, 142, 60, 0.2)',
      borderWidth: 2,
      tension: 0.3,
      pointRadius: 5,
      pointBackgroundColor: '#2e7d32'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: { beginAtZero: false }
    }
  }
});

// --- ADD WEIGHT FUNCTION ---
function addWeight() {
  const todayWeight = document.getElementById('todayWeight').value;
  if (todayWeight) {
    const today = new Date().toLocaleDateString();
    labels.push(today);
    weights.push(todayWeight);
    weightChart.update();
    document.getElementById('todayWeight').value = '';
  }
}

// --- ADD MEAL FUNCTION ---
function addMeal() {
  const mealType = document.getElementById('mealType').value;
  const foodItem = document.getElementById('foodItem').value;
  const calories = parseInt(document.getElementById('calories').value);

  if (foodItem && calories) {
    const li = document.createElement('li');
    li.textContent = `${mealType}: ${foodItem} - ${calories} kcal`;
    document.getElementById('mealList').appendChild(li);

    totalCalories += calories;
    document.getElementById('totalCalories').textContent = totalCalories;

    document.getElementById('foodItem').value = '';
    document.getElementById('calories').value = '';
  }
}

// --- SET GOAL FUNCTION ---
function setGoal() {
  const currentWeight = parseFloat(document.getElementById('currentWeight').value);
  const idealWeight = parseFloat(document.getElementById('idealWeight').value);
  const weeklyGoal = parseFloat(document.getElementById('weeklyGoal').value);

  if (currentWeight && idealWeight && weeklyGoal) {
    let weeks = (currentWeight - idealWeight) / weeklyGoal;
    if (weeks < 0) weeks = 0;

    document.getElementById('goalResult').textContent =
      `✅ You will reach your ideal weight in approx ${weeks.toFixed(1)} weeks.`;

    // Estimate calories per day (approx deficit: 7700 kcal = 1 kg fat)
    const dailyDeficit = (weeklyGoal * 7700) / 7;
    const maintenanceCalories = currentWeight * 30; // rough estimate
    const targetCalories = maintenanceCalories - dailyDeficit;

    document.getElementById('goalResult').textContent += 
      `\n🎯 Recommended daily intake: ~${Math.round(targetCalories)} kcal/day`;
  }
}
