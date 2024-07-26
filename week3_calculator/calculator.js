function calc(int) {
    var history = document.getElementById('history');
    if(history.value.length >= 20) {
        alert('20자 이상 입력할 수 없습니다.');
        return;
    }
    history.value += int;
}

function resultEval() {
    var history = document.getElementById('history');
    if(history.value === '') {
        alert('식을 입력해 주세요!');
        document.getElementById('result').value = null;
        return;
    }
    var result = eval(history.value);
    document.getElementById('result').value = result;
}

function reset() {
    document.getElementById('history').value = '';
    document.getElementById('result').value = '';
}

function backspace() {
    var history = document.getElementById('history');
    history.value = history.value.slice(0, -1);
}