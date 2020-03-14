import settingsPageTemplate from "../../../../templates/settingsPage.hbs";
import settingsPageController from "../../../controllers/settingsPageController";

const settingsPage = {
  show: function(userData) {
    const main = document.getElementById("main");
    main.innerHTML = settingsPageTemplate(userData);

    const userSettings = document.getElementById("user-settings");

    const inputs = userSettings.querySelectorAll(".settings__input");
    inputs.forEach(function(item) {
      item.addEventListener("input", settingsPage.toggleButtonActivity);
    });

    const forms = userSettings.querySelectorAll("form");
    forms.forEach(function(item) {
      item.addEventListener("submit", settingsPageController.changeUserData);
    });

    const changePasswordForm = document.forms.changePassword;
    changePasswordForm.addEventListener('submit', settingsPageController.changePassword);
  },

  toggleButtonActivity: function(event) {
    const input = event.target;
    const button = input.closest("form").querySelector(".settings__submit");

    if (input.dataset.currentvalue !== input.value) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  },

  showErrorMessage: function (formName, message) {
    const form = document.forms[formName];
    const messageBox = form.querySelector('.settings__message-box');

    messageBox.innerHTML = message;
  }
};

export default settingsPage;
