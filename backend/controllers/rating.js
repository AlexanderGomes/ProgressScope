const User = require("../schemas/user");
const Ratings = require("../schemas/ratings");


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