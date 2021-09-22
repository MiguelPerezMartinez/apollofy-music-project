const { userModel } = require("../models");

async function register(req, res) {
  const { uid, username, email } = req.body;
  try {
    const foundUser = await userModel.findOne({
      email: email,
    });
    if (!foundUser) {
      const { _id } = await userModel.create({
        firebase_id: uid,
        username: username,
        email: email,
      });
      return res.status(200).send({
        message: "User created very successfully",
        data: {
          userId: _id,
        },
      });
    } else {
      return res.status(201).send({
        message: "User already exists asshole",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      error: error.message,
    });
  }
}

module.exports = {
  register: register,
};
