import statisticsPageTemplate from "../../../../templates/statisticsPage.hbs";
import settingsPageController from "../../../controllers/settingsPageController";


const statisticsPage = {
  show: function (context) {













    const main = document.getElementById("main");
    main.innerHTML = statisticsPageTemplate(context);
  }
};

export default statisticsPage;
