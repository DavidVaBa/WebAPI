
exports.getTodos = function(req, res, next){

    res.json("Todos List");

}

exports.getTodo = function(req, res, next){

    var todo =  req.params.todo_id;

    res.json("Todo "+ todo);

}

exports.updateTodo = function(req, res, next){

    var todo =  req.params.todo_id;

    res.json("Todo "+ todo + " updated");

}

exports.createTodo = function(req, res, next){

    var todo = {
      id: 1,
      name: "ventura"
    };

    res.json(todo);

}

exports.deleteTodo = function(req, res, next){

    var todo =  req.params.todo_id;

    res.json("Todo "+ todo +" deleted");

}
