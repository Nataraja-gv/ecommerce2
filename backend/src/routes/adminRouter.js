const express = require("express");
const validate = require("validator");
const Admin = require("../models/adminmodel");
const AdminRouter = express.Router();
const bcrypt = require("bcrypt");
const AdminAuth = require("../middleware/adminIndex");

AdminRouter.post("/admin/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!validate.isEmail(email)) {
      throw new Error("invalid email");
    }

    if (!validate.isStrongPassword(password)) {
      throw new Error("Password Should Strong");
    }

    const admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).json("admin already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const adminDetails = new Admin({
      email,
      password: passwordHash,
      name,
    });

    const data = await adminDetails.save();
    res.status(201).json({ message: "Admin created successfully", data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

AdminRouter.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validate.isEmail(email)) {
      throw new Error("invalid email");
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json("admin not found");
    }

    const isValidPassword = await admin.validAdminPassword(password);

    if (!isValidPassword) {
      throw new Error(" Invalid login credentials");
    }

    const token = await admin.getAdminJWT();
    await res.cookie("adminToken", token);

    res.json({ message: "login sucessfully", data: admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

AdminRouter.get("/admin/profile/view", AdminAuth, async (req, res) => {
  try {
    const user = req.user;

    if (user) {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

module.exports = AdminRouter;
