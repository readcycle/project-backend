const { Report, User } = require("../models");

class ReportController {
  static async addReport(req, res, next) {
    try {
      const { reportedId } = req.params;
      const { title, content } = req.body;

      const reportedUser = await User.findByPk(reportedId);
      if (!reportedUser) throw { name: "DataNotFound" };

      const report = await Report.create({
        title,
        content,
        reporterId: req.user.id,
        reportedId,
      });

      res.status(201).json(report);
    } catch (error) {
      next(error);
    }
  }

  static async getReports(req, res, next) {
    try {
      const reports = await Report.findAll({
        include: [
          { as: "Issuer", model: User, attributes: ["fullname"] },
          { as: "Victim", model: User, attributes: ["fullname"] },
        ],
      });

      res.status(200).json(reports);
    } catch (error) {
      next(error);
    }
  }

  static async getReportById(req, res, next) {
    try {
      const report = await Report.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ["username"], as: "Reporter" },
          { model: User, attributes: ["username"], as: "Reported" },
        ],
      });
      if (!report) throw { name: "DataNotFound" };

      res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  }

  static async updateReport(req, res, next) {
    try {
      const report = await Report.findByPk(req.params.id);
      if (!report) throw { name: "report_not_found" };

      await Report.update(
        { isSolved: !report.isSolved },
        { where: { id: req.params.id } }
      );

      res
        .status(200)
        .json({ message: `Report with id ${report.id} has solved` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReportController;
