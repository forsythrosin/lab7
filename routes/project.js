var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  models.Project
    .find({'_id':projectID})
    .exec(afterQuery);

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;

  var newProject = new models.Project({
    'title': form_data.project_title,
    'date': form_data.date,
    'summary': form_data.summary,
    'image': form_data.image_url
  });

  newProject.save(afterSave);

  function afterSave(err) {
    if(err) console.log(err);
    res.send();
  }
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  models.Project
    .find({'_id':projectID})
    .remove()
    .exec(afterDeleted);

  function afterDeleted(err) {
    if(err) console.log(err);
    res.send();
  }
}