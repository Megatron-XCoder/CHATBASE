const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const onlineUsers = new Map();

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ msg: "Incorrect Username or Password", status: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ msg: "Incorrect Username or Password", status: false });

    await User.findByIdAndUpdate(user._id, { isOnline: true }, { new: true });

    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.status(400).json({ msg: "Username already used", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.status(400).json({ msg: "Email already used", status: false });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
      "isOnline"
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({ msg: "User ID is required" });

    await User.findByIdAndUpdate(userId, { isOnline: false }, { new: true });
    onlineUsers.delete(userId);

    const io = req.app.get('socketio');
    if (io) {
      io.emit('user-status', userId, false);
    }

    return res.status(200).json({ msg: "Logged out successfully" });
  } catch (ex) {
    next(ex);
  }
};
