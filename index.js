const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

function logRequests(req, res, next) {
  console.count("Número de requisições");

  return next();
}

server.use(logRequests);

function checkProjectInArray(req, res, next) {
  if(!projects[req.params.id]) {
    return res.status(400).json({ error: 'Project does not exists' });
  }

  return next();
}

server.get('/projects', (req, res) => {
  return res.json(projects);
})

server.get('/projects/:id', checkProjectInArray, (req, res) => {
  const { id } = req.params;

  return res.json(projects[id]);
})

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
})

server.post('/projects/:id/tasks', checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  projects[id].tasks.push(tasks);

  return res.json(projects);
})

server.put('/projects/:id', checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects[id];
  project.title = title;

  return res.json(projects);
})

server.delete('/projects/:id', checkProjectInArray, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.json(projects);
})

server.listen(4000);