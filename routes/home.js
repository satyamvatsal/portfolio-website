const { Router } = require("express");
const router = Router();
const Comment = require("../models/comment");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});
router.post("/contact", async (req, res) => {
  const { name, email, comment } = req.body;
  await Comment.create({
    userName: name,
    email,
    comment,
  });
  res.render("contact", {
    message: "Comment received!",
  });
});

const username = "satyamvatsal"; // Replace with your GitHub username

async function fetchGitHubRepos() {
  const url = `https://api.github.com/users/${username}/repos`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "node.js",
    },
  });
  const repos = await response.json();
  return repos;
}

fetchGitHubRepos();

router.get("/project", async (req, res) => {
  const projects = await fetchGitHubRepos();
  res.render("project", {
    projects: projects,
  });
});

module.exports = router;
