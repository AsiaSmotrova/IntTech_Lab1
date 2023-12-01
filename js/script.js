// Image Slider
const intervalModal = document.getElementById('intervalModal');
const sliderImage = document.getElementById('sliderImage');
let imageSliderInterval;

function openModal() {
  intervalModal.style.display = 'block';
}

function closeModal() {
  intervalModal.style.display = 'none';
}

function setIntervalAndStartSlider() {
  const intervalInput = document.getElementById('intervalInput').value;
  const interval = parseInt(intervalInput);

  if (isNaN(interval) || interval <= 0) {
    alert('Please enter a valid positive number for the interval.');
    return;
  }

  closeModal();
  startImageSlider(interval);
}

function startImageSlider(interval) {
  const imageSources = ['img/image2.jpg', 'img/image3.jpg', 'img/image1.jpg']; // Add your image sources
  let currentIndex = 0;

  imageSliderInterval = setInterval(() => {
    sliderImage.src = imageSources[currentIndex];
    currentIndex = (currentIndex + 1) % imageSources.length;
  }, interval);
}

// Page Load
document.addEventListener('DOMContentLoaded', () => {
  openModal();
  changeBackgroundColor(); // Set initial background color based on current hour
  setInterval(changeBackgroundColor, 3600000); // Update background color every hour (3600000 milliseconds)
});

// Background Color Change
function changeBackgroundColor() {
    const currentHour = new Date().getHours();
    const body = document.body;
  
    // You can customize these colors based on your preference
    if (currentHour >= 6 && currentHour < 12) {
      body.style.backgroundColor = '#FFD700'; // Morning color
    } else if (currentHour >= 12 && currentHour < 18) {
      body.style.backgroundColor = '#87CEEB'; // Afternoon color
    } else {
      body.style.backgroundColor = '#696969'; // Evening/Night color
    }
  }

// Chessboard Table
function generateTable() {
    const minRange = parseInt(document.getElementById('minRange').value);
    const maxRange = parseInt(document.getElementById('maxRange').value);
  
    if (isNaN(minRange) || isNaN(maxRange)) {
      alert('Please enter valid numeric values for min and max range.');
      return;
    }
  
    const chessboardTable = document.getElementById('chessboardTable');
    chessboardTable.innerHTML = ''; // Clear existing table if any
  
    for (let i = 0; i < 10; i++) {
      if (i % 2 == 0) {
        for (let j = 0; j < 10; j++) {
          if (j % 2 == 0){
            const cell = document.createElement('div');
            cell.className = "table-cell-odd";
            cell.textContent = generateRandomNumber(minRange, maxRange);
            chessboardTable.appendChild(cell);
          }
          else {
            const cell = document.createElement('div');
            cell.className = "table-cell-even";
            cell.textContent = generateRandomNumber(minRange, maxRange);
            chessboardTable.appendChild(cell);
          }
        }
      }
      else {
        for (let j = 1; j < 11; j++) {
          if (j % 2 == 0){
            const cell = document.createElement('div');
            cell.className = "table-cell-odd";
            cell.textContent = generateRandomNumber(minRange, maxRange);
            chessboardTable.appendChild(cell);
          }
          else {
            const cell = document.createElement('div');
            cell.className = "table-cell-even";
            cell.textContent = generateRandomNumber(minRange, maxRange);
            chessboardTable.appendChild(cell);
          }
        }
      }
    }
  }
  
  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }