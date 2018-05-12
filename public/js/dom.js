
var userName = document.querySelector('#userName');
var userNameIcon = document.querySelector('#UsernameIcon');

var email = document.querySelector('#email');
var emailIcon = document.querySelector('#emailIcon');

var phone = document.querySelector('#phone');
var phoneIcon = document.querySelector('#phoneIcon');

var password = document.querySelector('#password');
var passwordIcon = document.querySelector('#passwordIcon');

var errorMessage = document.querySelector('#formError');
var formSubmit = document.querySelector('#formSubmit');



//General function
function createErrorEventListener(element, errorCondition, errorIcon, errorMsg) {
  element.addEventListener('blur', function(event) {
    var value = event.target.value;
    if (errorCondition(value)) {
      errorIcon.style.visibility = 'hidden';
      errorMessage.textContent = '';
    } else {
      errorIcon.style.visibility = 'visible';
      errorMessage.textContent = errorMsg;
    }
  });
};




//Username validation
var usernameValidation = function(value){
 return RegExp('^[a-zA-Z_]*$').test(value)
};

//password validation
var passwordValidation = function(value){
  return value.length === 0 || RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})').test(value)
};

//email validation
var emailValidation = function(value){
  return value.length === 0 || RegExp(/\S+@\S+\.\S+/).test(value)
};


// phone validation
var phoneValidation = function(value){
  return value.length === 0 || RegExp('^\[0-9]{10}$').test(value)
};




//username validation test
createErrorEventListener(userName, usernameValidation, userNameIcon, 'Names cannot contain numbers or special characters');
//password test
createErrorEventListener(password, passwordValidation, passwordIcon, 'Password should contain capital letters and numbers');
//email test
createErrorEventListener(email, emailValidation, emailIcon, 'Invalid email');
//phone test
createErrorEventListener(phone, phoneValidation, phoneIcon, 'Phone number should be 10 digits');



 
