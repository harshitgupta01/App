var StatusEnums = {
    Active : "Active",
    Complete: "Complete",
    Delete : "Delete"
}

var todo = {
    1:{title: "Learn js", status : StatusEnums.Active},
    2:{title: "Learn pyhton", status : StatusEnums.Active},
    3:{title: "Learn ajax", status : StatusEnums.Active}
}

var next_to_do = 4;

module.exports = {
    StatusEnums : StatusEnums,
    todo : todo,
    next_to_do : next_to_do
}