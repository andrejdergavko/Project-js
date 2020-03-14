import recordsTemplate from "../../../../templates/records.hbs";
import recordTemplate from "../../../../templates/record.hbs";
import addRecordFormView from "../../../views/pages/weightPage/addRecordFormView";
import weightPageController from "../../../controllers/weightPageController";
import helpers from "../../../../js/helpers";

const recordsView = {
  show: function(weightList) {
    helpers.renderByTemplate(recordsTemplate, "", "records-box", "beforeend");

    const recordsBox = document.getElementById("records-box");
    recordsBox.addEventListener(
      "click",
      weightPageController.handleRecordsAction
    );

    const addButton = document.getElementById("add-button");
    addButton.addEventListener("click", addRecordFormView.show);

    this.renderRecordsList(weightList);
  },

  renderRecordsList: function(weightList) {
    let dates = Object.keys(weightList);

    dates = dates.sort((a, b) => {
      return +a - +b;
    });

    for (let date of dates) {
      const dateObject = new Date(+date);
      const calendarDate = `${dateObject.getFullYear()}-${dateObject.getMonth() +
        1}-${dateObject.getDate()}`;
      const time = dateObject
        .toLocaleTimeString()
        .split(":")
        .slice(0, 2)
        .join(":");
      const weight = weightList[date];
      const dateInMilliseconds = +date;
      const context = {
        date: calendarDate,
        time: time,
        dateInMilliseconds: dateInMilliseconds,
        weight: weight
      };
 
      helpers.renderByTemplate(
        recordTemplate,
        context,
        "records-tbody",
        "beforeend"
      );
    }
  }
};

export default recordsView;
