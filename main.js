// Grab all of our DOM elements

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm-password");

// Functions

// Show input error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Validate an email. Thanks, Stackoverflow
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value)) {
    showSuccess;
  } else {
    showError(input, "Email is invalid.");
  }
}

// Check Required fields
function checkRequired(inputArray) {
  inputArray.forEach(function(input) {
    if (input.value.trim() == "") {
      showError(input, `${getFieldName(input)} is required.`);
    } else {
      showSuccess(input);
    }
  });
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check Length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters.`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters.`
    );
  }
}

// Check if passwords match
function matchPasswords(input1, input2) {
  if (input1.value != input2.value) {
    showError(input2, `Passwords must match.`);
  }
}

// Listen for a form submit
form.addEventListener("submit", function(e) {
  e.preventDefault();

  checkRequired([username, email, password, confirm_password]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  matchPasswords(password, confirm_password);
});
