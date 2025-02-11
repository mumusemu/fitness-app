const express = require("express");
const { registerUser, getUserById } = require("../controllers/userController");
const router = express.Router();

// Kullanıcı kaydını alacak olan route
router.post("/register", async (req, res) => {
  try {
    await registerUser(req, res);  // registerUser işlevini çağır
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Kayıt sırasında bir hata oluştu", error: err.message });
  }
});

// Kullanıcıyı ID ile alacak olan route
router.get("/:id", async (req, res) => {
  try {
    await getUserById(req, res);  // getUserById işlevini çağır
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Kullanıcı alınırken bir hata oluştu", error: err.message });
  }
});

module.exports = router;
