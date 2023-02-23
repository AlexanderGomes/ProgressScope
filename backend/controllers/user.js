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

