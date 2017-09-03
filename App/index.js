var express = require("express");
var todo_db = require("./seed.js");
var bodyparser = require("body-parser");
var app = express();
app.use("/",bodyparser.urlencoded({extended:false}))
app.use("/",express.static(__dirname+"/public"));

app.get("/api/todos",function(req,res){
    res.json(todo_db.todo);
})

app.delete("/api/todos/:id" , function (req,res) {

    var del_id = req.params.id;
    var todo = todo_db.todo[del_id];

    if(!todo) {
        res.status(400).json({error: "Todo doesn't exist"});
    }
    else{
        todo.status = todo_db.StatusEnums.Delete;
        res.json(todo_db.todo);
    }
})

app.post("/api/todos",function (req,res) {
    var todo = req.body.todo_title;
    if(!todo || todo == "" || todo.trim() == "")
    {
        res.status(400).json({error: "Todo Error"})
    }
    else
    {
        todo_new_obj = {
            title : req.body.todo_title,
            status : todo_db.StatusEnums.Active
        }
    }
    todo_db.todo[todo_db.next_to_do++] = todo_new_obj;
    res.json(todo_db.todo);
})

app.put("/api/todos/:id" , function (req,res) {
    var mod_id = req.params.id;
    var todo = todo_db.todo[mod_id];
    if(!todo)
    {
        res.status(400).json({error:"Enter valid id"});
    }
    else
    {
        var todo_title = req.body.todo_title;
        if(todo_title && todo_title!="" && todo_title.trim() != "" )
        {
            todo.title = todo_title;
        }
        var todo_status = req.body.todo_status;
        if(todo_status && (todo_status==todo_db.StatusEnums.Active || todo_status == todo_db.StatusEnums.Complete))

        {
            todo.status = todo_status;
        }
    }
    res.json(todo_db.todo);
})

app.get("/api/todos/active",function (req,res) {
    var obj = {};
    var i;
    for(i=1;i<todo_db.next_to_do;i++)
    {
        var my_status = todo_db.todo[i];
        if(my_status.status == todo_db.StatusEnums.Active)
            obj[i] = todo_db.todo[i];
    }
    res.json(obj);
})

app.get("/api/todos/completed",function (req,res) {
    var obj = {};
    var i;
    for(i=1;i<todo_db.next_to_do;i++)
    {
        var my_status = todo_db.todo[i];
        if(my_status.status == todo_db.StatusEnums.Complete)
            obj[i] = todo_db.todo[i];
    }
    res.json(obj);
})

app.get("/api/todos/deleted",function (req,res) {
    var obj = {};
    var i;
    for(i=1;i<todo_db.next_to_do;i++)
    {
        var my_status = todo_db.todo[i];
        if(my_status.status == todo_db.StatusEnums.Delete)
            obj[i] = todo_db.todo[i];
    }
    res.json(obj);
})

app.put("/api/todos/complete/:id",function (req,res) {

    var my_id = req.params.id;
    var todo = todo_db.todo[my_id];
    if(!todo)
    {
        res.status(400).json({Error:"Not valid id"});
    }
    else
    {
        todo.status = todo_db.StatusEnums.Complete;
    }
    res.json(todo_db);

})

app.put("/api/todos/active/:id",function (req,res) {

    var my_id = req.params.id;
    var todo = todo_db.todo[my_id];
    if(!todo)
    {
        res.status(400).json({Error:"Not valid id"});
    }
    else
    {
        todo.status = todo_db.StatusEnums.Active;
    }
    res.json(todo_db);

})
app.listen(4000);