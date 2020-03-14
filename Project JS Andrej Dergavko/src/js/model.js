const model = {
  getWeightDifference: function(a, b) {
    return this.round(Math.abs(a - b), 10)
  },

  getBMI: function(weight, height) {
    const bmi = weight / Math.pow(height / 100, 2);
    return Math.round(bmi * 10) / 10;
  },

  getChangesLastDays: function(weightList, days) {
    const recordsByInterval = this.getRecordsByInterval(weightList, Date.now() - 86400001 * days, Date.now());

    const dates = Object.keys(recordsByInterval);
    const firstDate = Math.min(...dates);
    const lastDate = Math.max(...dates);

    return this.round((recordsByInterval[lastDate] - recordsByInterval[firstDate]), 10)
  },

  getChangeForDay: function (weightList) {
    const dates = Object.keys(weightList);
    const firstDate = Math.min(...dates);
    const lastDate = Math.max(...dates);

    const days = (lastDate - firstDate) / 86400001;
    
    if (days <= 0) {
      return '-';
    }

    const changeForDay = (weightList[lastDate] - weightList[firstDate]) / days;

    return this.round(changeForDay, 100);
  },

  getDaysLeft: function (currentWeight, targetWeight, changeForDay) {
    const remainingWeight = this.getWeightDifference(currentWeight, targetWeight);
    const daysLeft = Math.abs(this.round((remainingWeight / changeForDay), 1));

    if (isNaN(daysLeft)) {
      return '-';
    }

    return daysLeft;
  },

  getMaxWeight: function (weightList) {
    const weights = Object.values(weightList);

    return Math.max(...weights);
  },

  getMinWeight: function (weightList) {
    const weights = Object.values(weightList);

    return Math.min(...weights);
  },

  getAmountRecords: function (weightList) {
    return Object.keys(weightList).length;
  },

  round: function (number, decimalPlace) {
    return Math.round(number * decimalPlace) / decimalPlace;
  },

  getRecordsByInterval: function(weightList, startTime, finishTime) {
    const records = {};

    for (let key in weightList) {
      if (key >= startTime && key <= finishTime) {
        records[key] = weightList[key];
      }
    }

    return records;
  },
};

export default model;
