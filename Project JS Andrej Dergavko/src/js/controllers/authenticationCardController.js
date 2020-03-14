import storageService from '../storageService';
import globalController from '../controllers/globalController';
import personalDataFormView from '../views/personalDataFormView';
import authenticationCardView from '../views/authenticationCardView';

const authenticationCardController = {
  autorization: function(event) {
    event.preventDefault();

    const form = document.forms.autorization;
    const login = form.login.value;
    const password = form.password.value;
    const rememberMe = form.rememberMe;
    
    if (authenticationCardController.isLoginPasswordValid(login, password)) {
      storageService.setAuthorizedUser(login);

      if (rememberMe.checked) {
        storageService.setRememberedUser(login); 
      }
      
      authenticationCardView.removeAuthenticationCard();
      globalController.run();
    } else {
      authenticationCardView.showErrorMessage("Неверный логин или пароль", "autorization");
    }
  },

  registration: function (event) {
    event.preventDefault();

    let isValid = true;
    const form = document.forms.registration;
    const login = form.login.value;
    const password = form.password.value;
    const passwordAgain = form.passwordAgain.value;
    const rememberMe = form.rememberMe;

    if (password !== passwordAgain) {
      isValid = false;
      authenticationCardView.showErrorMessage('Вы ввели разные пароли', "registration");
    } else if (login.length === 0 || login.length > 20){
      isValid = false;
      authenticationCardView.showErrorMessage('Логин должен включать до 20 символов', "registration");
    } else if (authenticationCardController.checkExistenceLogin(login)){
      isValid = false;
      authenticationCardView.showErrorMessage('Такой логин уже существует', "registration");
    }  else if (password.length < 6 || password.length > 20){
      isValid = false;
      authenticationCardView.showErrorMessage('Пароль должен включать от 6 до 20 символов', "registration");
    }

    if (isValid === true) {
      storageService.createUser(login);
      storageService.setPassword(login, passwordAgain);
      storageService.setAuthorizedUser(login);

      if (rememberMe.checked) {
        storageService.setRememberedUser(login); 
      }
      authenticationCardView.removeAuthenticationCard();
      personalDataFormView.show();
    }
  },

  isLoginPasswordValid: function (login, password) {
    const user = storageService.getUser(login);
    
    if (user) {
      return user.password === password;
    }
    return false
  },

  checkExistenceLogin: function (login) {
    if (storageService.getUser(login)) {
      return true;
    }
    return false;
  }
}

export default authenticationCardController;