const Report = require("../schemas/report");
const Comment = require("../schemas/comment");

exports.createReport = async (req, res) => {
    const report = new Report(req.body);
    try {
      const reportSaved = await report.save();
      res.status(200).json(reportSaved);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };
  
  exports.commentReport = async (req, res) => {
    const { desc, reportId } = req.body;
  
    try {
      const comment = new Comment({
        reportId: reportId,
        desc: desc,
      });
      await comment.save();
      res.status(200).json(comment);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };
  
  exports.labelReport = async (req, res) => {
    const { label, reportId } = req.body;
    const report = await Report.findOne({ _id: reportId });
  
    if (!report) {
      return res.status(400).json({ msg: "report was not found" });
    }
  
    try {
      report.likes = label;
      await report.save();
      res.status(200).json({ msg: "report labeled" });
    } catch (error) {
      res.status(400).json(error.message);
    }
  };