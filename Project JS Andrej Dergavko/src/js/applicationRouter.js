import Router from "../../libs/router";
import weightPageController from "./controllers/weightPageController";
import statisticsPageController from "./controllers/statisticsPageController";
import settingsPageController from "./controllers/settingsPageController";

let router = new Router([], "history", "/");

router.add(weightPageController.show );
router.add(/^statistics$/, statisticsPageController.show);
router.add(/^settings$/, settingsPageController.show);

router.listen();

export default router;
