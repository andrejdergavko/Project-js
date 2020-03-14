import infoboxView from "./infoboxView";
import chartView from "./chartView";
import recordsView from "./recordsView";
import weightPageTemplate from "../../../../templates/weightPage.hbs";

const weightPageView = {
  show: function(userData) {
    const main = document.getElementById('main');
    main.innerHTML = weightPageTemplate('');

    infoboxView.show(userData);
    chartView.show(userData.weightList);
    recordsView.show(userData.weightList);
  },
};

export default weightPageView;
