const ReportController = require('../controller/report')
const router = require('express').Router()
const { authAdmin, authUser } = require("../middlewares/authentication");

router.get("/", authAdmin, ReportController.getReports);
router.get("/:id", authAdmin, ReportController.getReportById);
router.post("/:reportedId", authUser, ReportController.addReport);
router.patch("/:id", authAdmin, ReportController.updateReport);

module.exports = router