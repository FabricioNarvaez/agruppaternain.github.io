function appendField(value) {
    const field = document.createElement("td");
    field.textContent = value;
    return field;
}

function appendSpan(value, difPos, isLeft = true){
    const span = document.createElement("span");
    if(isLeft){
        span.textContent = value;
        span.classList.add("leftText");
    }else{
        const triangle = document.createElement("span");
        triangle.classList.add("triangle");
        const difPosSpan = document.createElement("span");
        difPosSpan.style.marginRight = "5px";
        if(difPos < 0){
            triangle.classList.add("redTriangle");
            span.style.color = "red";
        }else if(difPos > 0){
            triangle.classList.add("greenTriangle");
            span.style.color = "green";
        }
        if(difPos !== 0) difPosSpan.textContent = `${Math.abs(difPos)}`;
        span.appendChild(triangle);
        span.appendChild(difPosSpan);
        span.classList.add("rightText");
    }
    return span;
}

function sortByGoals(a, b){
    if(a.goals > b.goals || a.GD > b.GD){
        return -1;
    }else if(a.goals < b.goals || a.GD < b.GD){
        return 1;
    }else{
        return 0;
    }
}

export { appendField, sortByGoals, appendSpan };