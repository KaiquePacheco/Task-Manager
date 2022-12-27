require("dotenv").config()

const express = require("express")
var app = express()

const PORT = 8080 | parseInt(process.env.PORT)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.sendFile( __dirname + "/page.html")
})
app.post("/submit", (req, res) => {
  console.log(req.body)
  res.redirect("http://localhost:" + PORT)
})

app.listen(PORT, () => {
  console.log("Server started in port " + PORT + ".")
})