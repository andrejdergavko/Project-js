import personalDataFormController from "../controllers/personalDataFormController";
import personalDataFormTemplate from "../../templates/personal-data-form.hbs";
import commonView from './globalView';
import helpers from '../helpers';

const personalDataFormView = {
  show: function () {
    helpers.renderByTemplate(personalDataFormTemplate, '', '', "beforeend");

    const form = document.forms.personalData;
    form.addEventListener('submit', personalDataFormController.setUserData);

    commonView.showBackground();
  },

  remove: function () {
    const form = document.forms.personalData;
    
    form.remove();
    commonView.removeBackground();
  },
}

export default personalDataFormView;