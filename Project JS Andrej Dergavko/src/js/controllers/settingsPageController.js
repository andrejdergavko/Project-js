import globalView from '../views/globalView'
import storageService from '../storageService'
import settingsPageView from '../views/pages/settingsPage/settingsPageView'

const settingsPageController = {
  show: function () {
    const authorizedUser = storageService.getAuthorizedUser();
    const gender = storageService.getGender(authorizedUser);
    const height = storageService.getHeight(authorizedUser);
    const age = storageService.getAge(authorizedUser);
    const desiredWeight = storageService.getTargetWeight(authorizedUser);
    
    settingsPageView.show({
      gender: gender,
      height: height,
      age: age,
      desiredWeight: desiredWeight,
    });
    
    globalView.changePageTitle('Настройки');

    const activeButton = document.getElementById('settings-page-link');
    globalView.setActiveNavButton(activeButton);
  },

  changeUserData: function (event) {
    event.preventDefault();

    const authorizedUser = storageService.getAuthorizedUser();
    const input = event.target.querySelector('[data-action]');
    const action = input.dataset.action;
    const value = input.value;

    storageService[action](authorizedUser, value);
    settingsPageController.show();
  },

  changePassword: function (event) {
    event.preventDefault();

    const authorizedUser = storageService.getAuthorizedUser();
    const truePassword = storageService.getPassword(authorizedUser)
    const currentPassword = event.target.currentPassword.value;
    const newPassword = event.target.newPassword.value;
    const newPasswordAgain = event.target.newPasswordAgain.value;

    if (currentPassword !== truePassword) {
      settingsPageView.showErrorMessage(event.target.name, 'Введенный текущий пароль не соответствует');
      return;
    } else if (newPassword !== newPasswordAgain) {
      settingsPageView.showErrorMessage(event.target.name, 'Вы ввели разные новые пароли');
      return;
    } else if (newPassword.length < 6 || newPassword.length > 20) {
      settingsPageView.showErrorMessage(event.target.name, 'Длинна пароля должна быть не мение 6 символов и не более 20');
      return;
    }

    storageService.setPassword(authorizedUser, newPassword);
    settingsPageController.show();
  }
}

export default settingsPageController;