import addRecordFormTemplate from "../../../../templates/addRecordForm.hbs";
import weightPageController from "../../../controllers/weightPageController";
import helpers from "../../../helpers";

const addRecordFormView = {
  show: function() {
    const dateNow = new Date();
    const fullYear = addRecordFormView.getZeroFirstFormat(dateNow.getFullYear());
    const month = addRecordFormView.getZeroFirstFormat(dateNow.getMonth() + 1);
    const date = addRecordFormView.getZeroFirstFormat(dateNow.getDate());
    
    const context = {
      date: `${fullYear}-${month}-${date}`,
      time: dateNow.toLocaleTimeString()
    };
    
    helpers.renderByTemplate(addRecordFormTemplate, context, "", "beforeend");

    const add = document.getElementById('add-record-input-weight');
    add.focus();

    const form = document.forms.addRecord;
    form.addEventListener('submit', weightPageController.addWeightRecord);

    const removeAddRecordButton = document.getElementById(
      "remove-add-record-button"
    );
    removeAddRecordButton.addEventListener("click", addRecordFormView.remove);

    const addRecordWrapper = document.getElementById("add-record-wrapper");
    addRecordWrapper.addEventListener("click", event => {
      if (event.target === addRecordWrapper) {
        addRecordFormView.remove();
      }
    });
  },

  remove: function() {
    const addRecordWrapper = document.getElementById("add-record-wrapper");
    addRecordWrapper.remove();
  },

  getZeroFirstFormat: function(value) {
    if (value < 10) {
      value = "0" + value;
    }
    return value;
  }
};

export default addRecordFormView;
