import globalController from "../controllers/globalController";
import storageService from "../storageService";
import model from "../../js/model";
import weightPageView from "../views/pages/weightPage/weightPageView";
import addRecordFormView from "../views/pages/weightPage/addRecordFormView";
import globalView from "../views/globalView";

const weightPageController = {
  show: function() {
    const user = storageService.getAuthorizedUser();
    const height = storageService.getHeight(user);
    const startWeight = storageService.getStartWeight(user);
    const currentWeight = storageService.getCurrentWeight(user);
    const targetWeight = storageService.getTargetWeight(user);
    const weightList = storageService.getWeightList(user);
    const remaining = model.getWeightDifference(currentWeight, targetWeight);
    const changes = model.getWeightDifference(currentWeight, startWeight);
    const bmi = model.getBMI(currentWeight, height);

    weightPageView.show({
      startWeight: startWeight,
      currentWeight: currentWeight,
      targetWeight: targetWeight,
      remaining: remaining,
      changes: changes,
      bmi: bmi,
      weightList: weightList
    });

    globalView.changePageTitle("Вес");

    const activeButton = document.getElementById("weight-page-link");
    globalView.setActiveNavButton(activeButton);
  },

  refresh: function() {
    weightPageController.show();
  },

  addWeightRecord: function() {
    event.preventDefault();

    const form = document.forms.addRecord;
    const authorizedUser = storageService.getAuthorizedUser();
    const date = form.date.value;
    const time = form.time.value;
    const weight = form.weight.value;
    const parseDate = Date.parse(date + "T" + time);

    storageService.setWeightRecord(authorizedUser, parseDate, weight);

    addRecordFormView.remove();
    weightPageController.refresh();
  },

  handleRecordsAction: function(event) {
    const action = event.target.dataset.action;

    if (action) {
      weightPageController[action](event);
    }
  },

  deleteWeightRecord: function(event) {
    const authorizedUser = storageService.getAuthorizedUser();
    const target = event.target;
    const date = target.closest("[data-date]").dataset.date;

    storageService.deleteWeightRecord(authorizedUser, date);

    if (weightPageController.isWeightListEmpty()) {
      storageService.setIsRegistered(authorizedUser, false);
      globalController.run();
    } else {
      weightPageController.refresh();
    }
  },

  isWeightListEmpty: function() {
    const authorizedUser = storageService.getAuthorizedUser();
    const weightList = storageService.getWeightList(authorizedUser);

    for (var key in weightList) {
      if (weightList.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
};

export default weightPageController;
