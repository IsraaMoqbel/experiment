console.log('im in the dom');

var userName = document.querySelector('#userName');
var userNameIcon = document.querySelector('#userIcon');

var email = document.querySelector('#email');
var emailIcon = document.querySelector('#emailIcon');


var phone = document.querySelector('#phone');
var phoneIcon = document.querySelector('#phoneIcon');

var password = document.querySelector('#password');
var passwordIcon = document.querySelector('#passwordIcon');

var errorMessage = document.querySelector('#formError');
var formSubmit = document.querySelector('#formSubmit');
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

var isLetters = function(value){
  return RegExp('^[a-zA-Z ]*$').test(value)
};

var hasNoSpecialCharacters = function(value){
  return RegExp('^[a-zA-Z0-9_]*$').test(value)
};

var isPasswordStrong = function(value){
  return value.length === 0 || RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})').test(value)
};

var arePasswordsMatching = function(value){
  return password.value === value
};
var emailValidation = function(value){
return value.length === 0 || RegExp('/^(([^<>()[]\.,;:\s@\"]+(.[^<>()[]\.,;:\s@\"]+)*)|(\".+\"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/').test(value)
};

// createErrorEventListener(userName, hasNoSpecialCharacters, userNameIcon, 'Usernames cannot contain special characters'
// );
// createErrorEventListener(email, emailValidation, emailIcon, 'Email is not valid!'
// );
// createErrorEventListener(phone, hasNoSpecialCharacters, phoneIcon, 'Phone is not valid!'
// );
//
// createErrorEventListener(password, isPasswordStrong, passwordIcon, 'Passwords must contain 1 uppercase, 1 lowercase letter, 1 number or special character and be at least 8 characters'
// );

formSubmit.addEventListener('click' ,function(event){
//   event.preventDefault()
//   if (fullName.value.length > 0
//   && isLetters(fullName.value)
//   && userName.value.length > 0
//   && hasNoSpecialCharacters(userName.value)
//   && password.value.length > 0
//   && isPasswordStrong(password.value)
//   && arePasswordsMatching(confirmPassword.value)
// )
{
      var data = JSON.stringify({
        userName: userName.value,
        email: email.value,
        password: password.value
      })
      console.log(data);
      fetch('/signup', {
        headers: { 'content-type': 'application/json' },
        method: 'POST',
        body: data
      })
      .then(res => res.json())
      .then(res => {
        if (res.error){
          errorMessage.textContent = res.message;
        } else if (res.success) {
          window.location = '/';
        }
      })
      .catch(err => {
        errorMessage.textContent = 'There has been an error submitting your form. Please try again later.';
      })
    }
    // else {
    //   errorMessage.textContent = 'Please complete the form before submitting';
    // }
})
