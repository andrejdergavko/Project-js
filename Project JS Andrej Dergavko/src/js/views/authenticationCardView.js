import authenticationCardController from '../controllers/authenticationCardController';
import authenticationCardTemplate from '../../templates/authenticationCard.hbs';
import loginForm from '../../templates/loginForm.hbs';
import signupForm from '../../templates/signupForm.hbs';
import commonView from './globalView';
import helpers from '../helpers';

const authenticationCardView = {
  show: function () {
    helpers.renderByTemplate(authenticationCardTemplate, '', '', "beforeend");

    const buttonBack = document.getElementById('authentication-card-button-back');
    buttonBack.addEventListener('click', authenticationCardView.expandCard);


    this.showAutorizationWin();
    this.showRegistrationWin();
    commonView.showBackground();
  },

  showAutorizationWin: function () {
    helpers.renderByTemplate(loginForm, '', 'authentication-card-side-front', "afterbegin");

    const registrationButton = document.getElementById('login-form-button');
    registrationButton.addEventListener('click', this.expandCard);

    const form = document.forms.autorization;
    form.addEventListener('submit', authenticationCardController.autorization);
  },

  showRegistrationWin: function () {
    helpers.renderByTemplate(signupForm, '', 'authentication-card-side-back', "afterbegin");

    const form = document.forms.registration;
    form.addEventListener('submit', authenticationCardController.registration);
  },

  expandCard: function () {
    const sideFront = document.getElementById('authentication-card-side-front');
    const sideBack = document.getElementById('authentication-card-side-back');

    if (sideFront.style.transform === "rotateY(-180deg)") {
      sideFront.style.transform = "rotateY(0deg)";
      sideBack.style.transform = "rotateY(-180deg)";
    } else {
      sideFront.style.transform = "rotateY(-180deg)";
      sideBack.style.transform = "rotateY(-360deg)";
    }
  },

  showErrorMessage: function (message, formName) {
    const form = document.forms[formName];
    const errorMessage = form.querySelector('.error-mesage');
    errorMessage.innerHTML = message;
  },

  removeAuthenticationCard: function () {
    const authenticationCard = document.getElementById('authentication-card');
    authenticationCard.remove();
    commonView.removeBackground();
  },
}

export default authenticationCardView;