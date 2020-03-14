import globalView from "../views/globalView";
import model from "../model";
import storageService from "../storageService";
import statisticsPageView from "../views/pages/statisticsPage/statisticsPageView";


const statisticsPageController = {
  show: function () {
    const authorizedUser = storageService.getAuthorizedUser();
    const weightList = storageService.getWeightList(authorizedUser);
    const currentWeight = storageService.getCurrentWeight(authorizedUser);
    const targetWeight = storageService.getTargetWeight(authorizedUser);
    const context = {};

    context.changesForWeek = model.getChangesLastDays(weightList, 7);
    context.changesForMonth = model.getChangesLastDays(weightList, 30);
    context.changeForDay = model.getChangeForDay(weightList);
    context.daysLeft = model.getDaysLeft(currentWeight, targetWeight, context.changeForDay);
    context.maxWeight = model.getMaxWeight(weightList);
    context.minWeight = model.getMinWeight(weightList);
    context.amountRecords = model.getAmountRecords(weightList);

    statisticsPageView.show(context);

    globalView.changePageTitle("Статистика");

    const activeButton = document.getElementById("statistics-page-link");
    globalView.setActiveNavButton(activeButton);
  }
};

export default statisticsPageController;
