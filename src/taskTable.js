const {TaskModel, _} = require("./db")

async function insertTask(teamName, description, startDate, finalDate){
  const ntask = TaskModel.build({
    team_name: teamName,
    description: description,
    start_date: startDate,
    final_date: finalDate
  })
  await ntask.save()
}

async function updateTaskToFinished(taskId) {
  const task = await TaskModel.findByPk(taskId)
  task.is_finished = true
  
  await task.save()
}
async function listAllTasks(){
  const tasks = await TaskModel.findAll()

  return tasks
}

async function listTasksForTeamName(teamName){
  const tasks = await TaskModel.findAll({
    where: {
      team_name: teamName
    }
  })

  return tasks
}

module.exports = {insertTask, updateTaskToFinished, listAllTasks, listTasksForTeamName}