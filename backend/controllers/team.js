const User = require("../schemas/user");
const Team = require("../schemas/team");


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