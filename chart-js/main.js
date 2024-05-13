import '/style.css';
import Chart from 'chart.js/auto';

const ctx = document.getElementById('myChart');
const newValueInput = document.querySelector('.value');
const addValueButton = document.querySelector('.addButton');
const addBarButton = document.querySelector('.addNewBarButton');

const chart = new Chart(ctx, {
    type: 'polarArea',
    data: {
        labels: ['Chart 1', 'Chart 2', 'Chart 3'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3],
            backgroundColor: generateColors(3),
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function generateColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(`rgba(${randomColorValue()}, ${randomColorValue()}, ${randomColorValue()}, 0.8)`);
    }
    return colors;
}

function randomColorValue() {
    return Math.floor(Math.random() * 256);
}

function updateSelectBar() {
    const selectBar = document.querySelector('.select');
    selectBar.innerHTML = '';

    chart.data.labels.forEach((label) => {
        const option = document.createElement('option');
        option.value = label;
        option.text = label;
        selectBar.appendChild(option);
    });
}

updateSelectBar();

addValueButton.addEventListener('click', () => {
    const selectBar = document.querySelector('.select');
    const selectedBarLabel = selectBar.value;
    const selectedIndex = chart.data.labels.indexOf(selectedBarLabel);

    chart.data.datasets[0].data[selectedIndex] += parseInt(newValueInput.value);
    chart.update();
    updateSelectBar();
});

addBarButton.addEventListener('click', () => {
    const newBarLabel = `Chart ${chart.data.labels.length + 1}`;
    chart.data.labels.push(newBarLabel);
    chart.data.datasets[0].data.push(newValueInput.value);
    chart.data.datasets[0].backgroundColor.push(generateColors(1)[0]);
    chart.update();
    updateSelectBar();
});