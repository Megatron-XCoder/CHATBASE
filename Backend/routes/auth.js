const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
} = require("../controllers/userController");

const router = require("express").Router();
const User = require("../models/userModel"); // Import User model

// Login endpoint
router.post("/login", login);

// Register endpoint
router.post("/register", register);

// Get all users except the logged-in user
router.get("/allusers/:id", getAllUsers);

// Set avatar image for the user
router.post("/setavatar/:id", setAvatar);

// Log out the user and set their status to offline
router.post("/logout/:id", logOut); // Changed to POST for consistency

// Optionally, add a route to check user status if needed
router.get("/status/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("isOnline");
    if (user) {
      res.json({ isOnline: user.isOnline });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (ex) {
    res.status(500).json({ msg: "Server error", error: ex.message });
  }
});

module.exports = router;
