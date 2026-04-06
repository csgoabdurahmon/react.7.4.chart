"use strict";

function login(req, res) {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: "Username va parol majburiy" });
  }

  if (username !== "admin" || password !== "admin") {
    return res.status(401).json({ message: "Login yoki parol noto'g'ri" });
  }

  return res.json({
    token: "sample-token",
    user: {
      username: "admin",
    },
  });
}

module.exports = {
  login,
};
