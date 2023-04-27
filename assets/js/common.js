export function appendField(value) {
    const field = document.createElement("td");
    field.textContent = value;
    return field;
}

export function sortByGoals(a, b){
    if(a.goals > b.goals || a.GD > b.GD){
        return -1;
    }else if(a.goals < b.goals || a.GD < b.GD){
        return 1;
    }else{
        return 0;
    }
}
