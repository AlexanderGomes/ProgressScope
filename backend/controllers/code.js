const User = require("../schemas/user");
const Code = require("../schemas/code");
const Team = require("../schemas/team");
const crypto = require("crypto");


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
  