const {TaskModel, sequelize} = require("./db")
const { Op } = require("sequelize")

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

async function listAllTasks(teamName){
  const tasks = await TaskModel.findAll({
    where: {
      team_name: {
        [Op.like]: `%${teamName}%`
      }
    }
  })

  return tasks
}

module.exports = {insertTask, updateTaskToFinished, listAllTasks}