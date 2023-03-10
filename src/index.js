require("dotenv").config()

const {insertTask, updateTaskToFinished, listAllTasks} = require("./taskTable")

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
    res.send("Some data param is uncorrect or incomplete.")
    return
  }
  insertTask(body.teamName, body.description, body.startDate, body.finalDate)

  res.redirect("/")
})
app.get("/list_tasks", async (req, res) => {
  res.send(await listAllTasks(""))
})
app.get("/list_tasks/:team_name", async (req, res) => {
  res.send(await listAllTasks(req.params.team_name))
})
app.put("/finish_task/:task_id", async (req, res) => {
  const was_found = await updateTaskToFinished(req.params.task_id)
  if (was_found) {
    res.send()
    return
  }
  res.status(404).send("")
})

app.listen(PORT, () => {
  console.log("Server started in port " + PORT + ".")
})