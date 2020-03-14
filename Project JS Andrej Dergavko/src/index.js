// Styles
import "./styles/style.css";
import "./styles/header.css";
import "./styles/aside.css";
import "./styles/main.css";
import "./styles/personal-data-form.css";
import "./styles/weight-page.css";
import "./styles/authentication-card.css";
import "./styles/login-form.css";
import "./styles/add-record-form.css";
import "./styles/settings-page.css";
import "./styles/statistics-page.css";

// Modules
import storageService from "./js/storageService";
import router from "./js/applicationRouter";
import globalController from "./js/controllers/globalController";
import authenticationCardView from "./js/views/authenticationCardView";

// IMG
import  "./img/user.png";
import  "./img/cross.png";
import  "./img/weight.png";
import  "./img/settings.png";
import  "./img/apple.png";
import  "./img/statistics.png";

const main = () => {
  const weightPageLink = document.getElementById("weight-page-link");
  weightPageLink.addEventListener("click", () => {
    router.navigate("");
  });

  const statisticsPageLink = document.getElementById("statistics-page-link");
  statisticsPageLink.addEventListener("click", () => {
    router.navigate("/statistics");
  });

  const settingsPageLink = document.getElementById("settings-page-link");
  settingsPageLink.addEventListener("click", () => {
    router.navigate("/settings");
  });

  const exitLoginButton = document.getElementById("exit-account-button");
  exitLoginButton.addEventListener('click', globalController.exitAccount);

  const rememberedUser = storageService.getRememberedUser();
  if (!storageService.getFromLocalStorage("state")) {
    storageService.setToLocalStorage("state", {});
  }

  if (rememberedUser) {
    globalController.run();
  } else {
    authenticationCardView.show();
  }
};

window.addEventListener("load", main());
