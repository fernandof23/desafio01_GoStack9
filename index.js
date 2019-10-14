const express = require('express')

const app = express()

app.use(express.json())


const projects = []

let i = 0

app.use((req, res, next) => {
    i++
    console.log(`Ate o momento foram feitas ${i} requisições no servidor`)
    next()
})


function checkID(req, res, next) {
    const { id } = req.params
    const project = projects.find(p => p.id == id)
    if (!project) {
        return res.status(400).json({ error: "Project not found" })
    }
    return next()
}







app.post('/projects', (req, res) => {
    const project = { id: req.body.id, title: req.body.title, tasks: req.body.tasks }
    projects.push(project)
    return res.json(projects)
})


app.get('/projects', (req, res) => {
    return res.json({ projects })
})

app.put('/projects/:id', checkID, (req, res) => {
    const { id } = req.params
    const { title } = req.body

    const project = projects.find(proj => proj.id == id)
    project.title = title
    return res.json(project)

})


app.delete('/projects/:id', checkID, (req, res) => {
    const { id } = req.params

    const projectIndex = projects.findIndex(p => p.id == id)
    projects.splice(projectIndex, 1)
    return res.send()
})

app.post('/projects/:id/tasks', checkID, (req, res) => {
    const { id } = req.params
    const { title } = req.body

    const projectTask = projects.find(p => p.id == id)
    projectTask.tasks.push(title)
    return res.json(projectTask)

})








app.listen('3000')