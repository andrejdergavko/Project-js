const storageService = {
  setToLocalStorage: function(key, value) {
    const JSONValue = JSON.stringify(value);
    localStorage.setItem(key, JSONValue);
  },

  getFromLocalStorage: function(key) {
    return JSON.parse(localStorage.getItem(key));
  },

  createUser: function(userName) {
    this.setToLocalStorage(userName, {});
  },

  getUser: function(userName) {
    return this.getFromLocalStorage(userName);
  },

  deleteUser: function(userName) {
    localStorage.removeItem(userName);
  },

  setAuthorizedUser: function(userName) {
    const state = this.getFromLocalStorage("state");
    state.authorizedUser = userName;
    this.setToLocalStorage("state", state);
  },

  getAuthorizedUser: function() {
    const state = this.getFromLocalStorage("state");

    if (state) {
      return state.authorizedUser;
    }

    return null;
  },

  setRememberedUser: function(userName) {
    const state = this.getFromLocalStorage("state");
    state.rememberedUser = userName;
    this.setToLocalStorage("state", state);
  },

  getRememberedUser: function() {
    const state = this.getFromLocalStorage("state");

    if (state) {
      return state.rememberedUser;
    }

    return null;
  },

  // User data
  //========================================
  setIsRegistered: function(userName, isRegistered) {
    const user = this.getFromLocalStorage(userName);
    user.isRegistered = isRegistered;
    this.setToLocalStorage(userName, user);
  },

  getIsRegistered: function(userName) {
    const user = this.getFromLocalStorage(userName);
    return user.isRegistered;
  },

  setPassword: function(userName, password) {
    const user = this.getFromLocalStorage(userName);
    user.password = String(password);
    this.setToLocalStorage(userName, user);
  },

  getPassword: function(userName) {
    const user = this.getFromLocalStorage(userName);
    return user.password;
  },

  setHeight: function(userName, height) {
    const user = this.getFromLocalStorage(userName);
    user.height = height;
    this.setToLocalStorage(userName, user);
  },

  getHeight: function(userName) {
    const user = this.getFromLocalStorage(userName);
    return user.height;
  },

  setAge: function(userName, age) {
    const user = this.getFromLocalStorage(userName);
    user.age = age;
    this.setToLocalStorage(userName, user);
  },

  getAge: function(userName) {
    const user = this.getFromLocalStorage(userName);
    return user.age;
  },

  setGender: function(userName, gender) {
    const user = this.getFromLocalStorage(userName);
    user.gender = gender;
    this.setToLocalStorage(userName, user);
  },

  getGender: function(userName) {
    const user = this.getFromLocalStorage(userName);
    return user.gender;
  },

  setDailyActivity: function(userName, dailyActivity) {
    const user = this.getFromLocalStorage(userName);
    user.dailyActivity = dailyActivity;
    this.setToLocalStorage(userName, user);
  },

  getDailyActivity: function(userName) {
    const user = this.getFromLocalStorage(userName);
    return user.dailyActivity;
  },

  setTargetWeight: function(userName, desiredWeight) {
    const user = this.getFromLocalStorage(userName);
    user.desiredWeight = desiredWeight;
    this.setToLocalStorage(userName, user);
  },

  getTargetWeight: function(userName) {
    const user = this.getFromLocalStorage(userName);
    return user.desiredWeight;
  },

  // Weight data
  //========================================
  setWeightRecord: function(userName, date, weight) {
    const user = this.getUser(userName);

    if (user.weightList === undefined) {
      user.weightList = {};
    }

    user.weightList[date] = weight;

    this.setToLocalStorage(userName, user);
  },

  getWeightRecord: function(userName, date) {
    const user = this.getFromLocalStorage(userName);

    return user.weightList[date];
  },

  deleteWeightRecord: function(userName, date) {
    const user = this.getFromLocalStorage(userName);
    delete user.weightList[date];
    this.setToLocalStorage(userName, user);
  },

  getWeightList: function(userName) {
    const user = this.getFromLocalStorage(userName);
    return user.weightList;
  },

  setWeightList: function(userName, weightList) {
    const user = this.getFromLocalStorage(userName);
    user.weightList = weightList;
    this.setToLocalStorage(userName, user);
  },

  getStartWeight: function(userName) {
    const weightList = this.getWeightList(userName);
    const dates = Object.keys(weightList);

    const firstDate = dates.reduce((previous, current) => {
      if (+previous > +current) {
        return +current;
      }
      return +previous;
    });

    return weightList[firstDate];
  },

  getCurrentWeight: function(userName) {
    const weightList = this.getWeightList(userName);
    const dates = Object.keys(weightList);

    const lastDate = dates.reduce((previous, current) => {
      if (+previous < +current) {
        return +current;
      }
      return +previous;
    });

    return weightList[lastDate];
  }
};

export default storageService;
