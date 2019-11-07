const   mongoose    = require("mongoose"),
        Todo        = require("./models/todo.js");


let data=[
    {
        item: "Fill portfolio",
        priority: 1,
        description: "Building projects"
    },
    {
        item: "Doing dishes",
        priority: 3,
        description: "My daugther didn't do it"
    },
    {
        item: "Feeding the dog",
        priority: 3,
        description: "Doggy is hungry"
    },
    {
        item: "Really feed the dog",
        priority: 1,
        description: "Else he's gonna bite"
    }
];

function seedDB(){
    data.forEach((seed) => {
        Todo.create(seed, (err,todoItem)=>{
            if(err){
                console.log("seedDB error:" +err);
            } else {
                console.log(todoItem);
            };
        });
    });
};

module.exports = seedDB;