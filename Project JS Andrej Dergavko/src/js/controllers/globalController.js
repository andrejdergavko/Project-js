import storageService from "../storageService";
import router from "../applicationRouter";
import personalDataFormView from "../views/personalDataFormView";
import globalView from "../views/globalView";

const globalController = {
  run: function() {
    const authorizedUser = storageService.getAuthorizedUser();

    if (storageService.getIsRegistered(authorizedUser) === true) {
      router.check();
    } else {
      personalDataFormView.show();
    }

    globalView.changeUserName(authorizedUser);
  },

  exitAccount: function () {
    storageService.setAuthorizedUser('');
    storageService.setRememberedUser('');
    window.location.reload();
  }
};

export default globalController;
