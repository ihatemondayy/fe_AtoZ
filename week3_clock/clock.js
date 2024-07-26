function clock() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    let dayOfWeek = daysOfWeek[date.getDay()];
    let dateStr = `${year}-${month}-${day} [${dayOfWeek}]`;
    document.getElementById("dateStr").innerHTML = dateStr;

    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    let seconds = date.getSeconds().toString();
    let timeStr = `
        <span class="galmuri14">${hours[0]}</span>
        <span class="baskervville">${hours[1]}</span>:
        <span class="galmuri14">${minutes[0]}</span>
        <span class="baskervville-italic">${minutes[1]}</span>:
        <span class="baskervville">${seconds[0]}</span>
        <span class="galada">${seconds[1]}</span>
    `;
    document.getElementById("timeStr").innerHTML = timeStr;
}

let alertArray = [];

function addAlert() {
    const hours = document.getElementById('hours-input').value;
    const minutes = document.getElementById('minutes-input').value;
    const seconds = document.getElementById('seconds-input').value;

    if (hours === '' || minutes === '' || seconds === '') {
        alert('모든 칸을 입력하세요.');
        return;
    }

    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
        alert('올바른 시간 값을 입력해 주세요.');
        return;
    }

    const timeString = `${hours}:${minutes}:${seconds}`;

    if (alertArray.length >= 3) {
        alert('알람은 최대 3개까지 설정 가능합니다.');
        return;
    }

    alertArray.push(timeString);
    updateAlertList();
    clearInputs();
}

function updateAlertList() {
    const alertListContainer = document.getElementById('alertListContainer');
    alertListContainer.innerHTML = ''; // 기존 내용을 초기화

    alertArray.forEach((alert, index) => {
        const alertItem = document.createElement('div');
        alertItem.className = 'alert-item';
        alertItem.textContent = alert;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => {
            removeAlert(index);
        };

        alertItem.appendChild(deleteButton);
        alertListContainer.appendChild(alertItem);
    });
}

function removeAlert(index) {
    alertArray.splice(index, 1);
    updateAlertList();
}

function clearInputs() {
    document.getElementById('hours-input').value = '';
    document.getElementById('minutes-input').value = '';
    document.getElementById('seconds-input').value = '';
}

function batteryCheck() {
    const hearts = document.querySelectorAll('.heart');
    let index = 0;

    const intervalId = setInterval(() => {
        if (index < hearts.length) {
            hearts[index].style.display = 'none';
            index++;
        } else {
            clearInterval(intervalId);
            document.querySelector('.clock-wrapper').innerHTML = 'OUT OF BATTERY X(';
        }
    }, 20000);
}

setInterval(clock, 1000);
document.addEventListener('DOMContentLoaded', () => {
    clock();
    batteryCheck();
});