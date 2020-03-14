import storageService from '../storageService';
import personalDataFormView from '../views/personalDataFormView';
import globalController from '../controllers/globalController';

const personalDataFormController = {
  setUserData: function (event) {
    event.preventDefault();

    const form = document.forms.personalData;
    const authorizedUser = storageService.getAuthorizedUser();
    const gender = form.gender.value;
    const age = form.age.value;
    const height = form.height.value;
    const weight = form.weight.value;
    const desiredWeight = form.desiredWeight.value;

    storageService.setGender(authorizedUser, gender);
    storageService.setAge(authorizedUser, age);
    storageService.setHeight(authorizedUser, height);
    storageService.setWeightRecord(authorizedUser, Date.now(), weight);
    storageService.setTargetWeight(authorizedUser, desiredWeight);

    storageService.setIsRegistered(authorizedUser, true);
    personalDataFormView.remove();

    globalController.run();
  },
}

export default personalDataFormController;