const Company = require("../schemas/company");
const User = require("../schemas/user");
const Code = require("../schemas/code");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");


exports.registerCompany = async (req, res) => {
  const { company, email, password, employees } = req.body;

  const findCompany = await Company.findOne({ email });

  if (findCompany) {
    return res.status(400).json({ msg: "there's an account on this email" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const companyObj = await Company.create({
    company,
    email,
    password: hashedPassword,
    employees,
  });

  res.status(200).json({ companyObj });
};

exports.loginCompany = async (req, res) => {
  const { email, password } = req.body;

  //finding user
  const company = await Company.findOne({ email });

  //validation
  if (!company) {
    res.status(405).json("Wrong email");
  }

  const passwordMatch = await bcrypt.compare(password, company.password);

  if (!passwordMatch) {
    res.status(402).json({ msg: "passwords don't match" });
  }

  res.status(200).json(company);
};

function generateSecureCode(length = 6) {
  const buffer = crypto.randomBytes(length);
  const code = buffer.toString("base64").replace(/[+\/]/g, "").slice(0, length);
  return code;
}

exports.createCode = async (req, res) => {
  const { usageLimit, role, companyId } = req.body;

  const getCode = generateSecureCode();

  const newCode = new Code({
    code: getCode,
    usageLimit: usageLimit,
    role: role,
    companyId: companyId,
  });

  newCode.save((err) => {
    if (err && err.name === "ValidationError") {
      res.status(400).json({ error: "Invalid value for role field" });
    } else if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(201).json(newCode);
    }
  });
};

exports.changeRole = async (req, res) => {
  const { userId, newRole } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({ msg: "user not found" });
  }

  try {
    user.role = newRole;
    await user.save();
    res.status(200).json({ msg: "changed roles of user" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
