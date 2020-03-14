import infoBoxTemplate from '../../../../templates/info-box.hbs';
import helpers from '../../../../js/helpers';

const infoboxView = {
  show: function (userData) {
    const weightPageContext = {
      startWeight: userData.startWeight,
      currentWeight: userData.currentWeight,
      targetWeight: userData.targetWeight,
      remaining: userData.remaining,
      changes: userData.changes,
      bmi: userData.bmi,
    };
    
    helpers.renderByTemplate(infoBoxTemplate, weightPageContext, 'weight-page', "afterbegin");
  }
}

export default infoboxView;