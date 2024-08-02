document.addEventListener("DOMContentLoaded", function() {
    const emails = ["hihi@example.com", "user@example.com"];

    let elInputEmail = document.getElementById("email");
    let elFailureMessage = document.querySelector(".failuremsg-email");
    let elFailureMessage2 = document.querySelector(".failuremsg-email2");

    let elInputPassword = document.getElementById("password");
    let elFailureMessagePassword = document.querySelector(".failuremsg-password");

    let elInputPasswordCheck = document.getElementById("password-check");
    let elFailureMessagePWCheck = document.querySelector(".failuremsg-pwcheck");

    let elSignupButton = document.getElementById("signup");

    function emailLength(value) {
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
    }

    function checkDuplicateEmail(email) {
        return emails.includes(email);
    }

    function strongPassword(str) {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
    }

    function isMatch(password1, password2) {
        return password1 === password2;
    }

    function validateForm() {
        const emailValid = emailLength(elInputEmail.value) && !checkDuplicateEmail(elInputEmail.value);
        const passwordValid = strongPassword(elInputPassword.value);
        const passwordMatch = isMatch(elInputPassword.value, elInputPasswordCheck.value);

        elSignupButton.disabled = !(emailValid && passwordValid && passwordMatch);
    }

    elInputEmail.onkeyup = function() {
        if(elInputEmail.value.length !== 0) {
            if (emailLength(elInputEmail.value) === false) {
                elFailureMessage.classList.remove('hidden');
                elFailureMessage.textContent = "올바른 이메일 형식이 아닙니다.";
                elFailureMessage2.classList.add('hidden');
            } else if (checkDuplicateEmail(elInputEmail.value) === true) {
                elFailureMessage2.classList.remove('hidden');
                elFailureMessage2.textContent = "중복된 이메일입니다.";
                elFailureMessage.classList.add('hidden');
            } else {
                elFailureMessage.classList.add('hidden');
                elFailureMessage2.classList.add('hidden');
            }
        }
        validateForm();
    }

    elInputPassword.onkeyup = function() {
        if(elInputPassword.value.length !== 0) {
            if (strongPassword(elInputPassword.value) === false) {
                elFailureMessagePassword.classList.remove('hidden');
                elFailureMessagePassword.textContent = "비밀번호는 영문자, 숫자, 특수문자를 포함하여 8자리 이상 입력해주세요.";
            } else {
                elFailureMessagePassword.classList.add('hidden');
            }
        }
        validateForm();
    }

    elInputPasswordCheck.onkeyup = function() {
        if(elInputPasswordCheck.value.length !== 0) {
            if (isMatch(elInputPassword.value, elInputPasswordCheck.value) === false) {
                elFailureMessagePWCheck.classList.remove('hidden');
                elFailureMessagePWCheck.textContent = "비밀번호가 일치하지 않습니다.";
            } else {
                elFailureMessagePWCheck.classList.add('hidden');
            }
        }
        validateForm();
    }

    elSignupButton.addEventListener("click", function() {
        if (!elSignupButton.disabled) {
            alert("회원 가입이 완료되었습니다.");
        }
    });
    validateForm();
});
