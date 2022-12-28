require("dotenv").config()

const {insertTask, updateTaskToFinished, listAllTasks, listTasksForTeamName} = require("./taskTable")

const express = require("express")
var app = express()

const PORT = 8080 | parseInt(process.env.PORT)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.sendFile( __dirname + "/page.html")
})
app.post("/submit", (req, res) => {
  const body = req.body

  if (body.startDate.length != 10 || body.finalDate.length != 10){
    res.sendStatus(400)
    return
  }
  insertTask(body.teamName, body.description, body.startDate, body.finalDate)

  res.sendStatus(200)
})
app.get("/list_tasks", async (req, res) => {
  res.send(await listAllTasks())
})
app.get("/list_tasks/:team_name", async (req, res) => {
  res.send(await listTasksForTeamName(req.body.team_name))
})

app.listen(PORT, () => {
  console.log("Server started in port " + PORT + ".")
})