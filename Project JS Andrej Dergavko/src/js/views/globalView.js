import backgroundTemplate from "../../templates/background.hbs";
import helpers from "../helpers";

const commonView = {
  changePageTitle: function(pageName) {
    const pageTitle = document.getElementById("page-title");

    if (pageName) {
      pageTitle.innerHTML = pageName;
    }
  },

  changeUserName: function(name) {
    const userName = document.getElementById("user-name");
    const userLogo = document.getElementById("user-logo");

    userName.innerHTML = name;
    userLogo.innerHTML = name.charAt(0);
  },

  setActiveNavButton: function(button) {
    const buttons = Array.from(document.querySelectorAll(".nav__button"));

    buttons.forEach(function(item) {
      item.classList.remove("nav__button_active");
    });

    button.classList.add("nav__button_active");
  },

  showBackground: function() {
    helpers.renderByTemplate(backgroundTemplate, "", "main", "afterend");
  },

  removeBackground: function() {
    const background = document.getElementById("background");

    background.style.display = "none";
  }
};

export default commonView;
