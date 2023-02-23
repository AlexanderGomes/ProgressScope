const User = require("../schemas/user");
const Code = require("../schemas/code");
const Report = require("../schemas/report");
const Team = require("../schemas/team");
const Ratings = require("../schemas/ratings");
const Comment = require("../schemas/comment");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.registerUser = async (req, res) => {
  const { name, email, password, code } = req.body;

  const findUser = await User.findOne({ email });

  if (findUser) {
    return res.status(400).json({ msg: "there's an account on this email" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const findCode = await Code.findOne({ code });

  if (!findCode) {
    return res.status(400).json({ error: "Invalid code" });
  }

  if (!findCode.canBeUsed()) {
    return res.status(400).json({ error: "Code usage limit exceeded" });
  }

  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword,
    role: findCode.role,
    companyId: findCode.companyId,
  });

  findCode.markAsUsed(newUser._id);
  await findCode.save();
  await newUser.save();
  res.status(200).json(newUser);
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  //finding user
  const user = await User.findOne({ email });

  //validation
  if (!user) {
    res.status(405).json("Wrong email");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(402).json({ msg: "passwords don't match" });
  }

  res.status(200).json(user);
};

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

exports.rateCollegue = async (req, res) => {
  const { stars, userId, desc } = req.body;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(400).json({ msg: "user was not found" });
  }

  try {
    const rating = new Ratings({
      userId: userId,
      likes: stars,
      desc: desc,
    });

    await rating.save();
    res.status(200).json({ msg: "rating created" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.createTeam = async (req, res) => {
  const team = new Team(req.body);
  try {
    const teamSaved = await team.save();
    res.status(200).json(teamSaved);
  } catch (error) {
    res.status(400).json({ msg: "error creating the report" });
  }
};

exports.addMember = async (req, res) => {
  const { teamId, memberId } = req.body;

  try {
    const team = await Team.findOne({ _id: teamId });
    const newMember = await User.findOne({ _id: memberId });
    team.members.push(newMember);
    await team.save();
    res.status(200).json({ msg: "member added to the team" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.removeMember = async (req, res) => {
  const { teamId, memberId } = req.body;

  const team = await Team.findOne({ _id: teamId });

  if (!team) {
    res.status(400).json({ msg: `${team} was not found` });
  }

  const memberIndex = team.members.indexOf(memberId);
  if (memberIndex === -1) {
    res.status(400).json({ msg: `${memberIndex} was not found` });
  }

  team.members.splice(memberIndex, 1);
  await team.save();
  res.status(200).json({ msg: "member removed" });
};

function generateSecureCode(length = 6) {
  const buffer = crypto.randomBytes(length);
  const code = buffer.toString("base64").replace(/[+\/]/g, "").slice(0, length);
  return code;
}

exports.codeForTeam = async (req, res) => {
  const { usageLimit, companyId, teamId } = req.body;

  const getCode = generateSecureCode();

  const newCode = new Code({
    code: getCode,
    usageLimit: usageLimit,
    companyId: companyId,
    teamId: teamId,
  });

  newCode.save();
  res.status(201).json(newCode);
};

exports.useCodeTeam = async (req, res) => {
  const { code, memberId } = req.body;

  const findCode = await Code.findOne({ code });

  if (!findCode) {
    return res.status(400).json({ error: "Invalid code" });
  }

  try {
    const newMember = await User.findOne({ _id: memberId });
    const team = await Team.findOne({ _id: findCode.teamId });

    team.members.push(newMember);
    await team.save();

    res.status(200).json({ msg: "member added to the team" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
