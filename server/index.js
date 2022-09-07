const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api/priority-types", (req, res) => {
  res.json({
    data: [
      { value: "Urgent", label: "Urgent" },
      { value: "Regular", label: "Regular" },
      { value: "Trivial", label: "Trivial" },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
