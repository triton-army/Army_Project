const express = require("express");
const bcrypt = require("bcryptjs");

const User =
  require("../models/User");

const router =
  express.Router();

router.post(
  "/register",
  async (req, res) => {

    try {

      const {
        nickname,
        gender,
        email,
        password
      } = req.body;

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const user =
        new User({
          nickname,
          gender,
          email,
          password:
            hashedPassword
        });

      await user.save();

      res.json({
        success: true
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        success: false
      });

    }

  }
);

module.exports = router;