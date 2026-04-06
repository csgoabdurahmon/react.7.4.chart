"use strict";

const app = require("./app");

const PORT = 5567;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
