function appendField(value) {
    const field = document.createElement("td");
    field.textContent = value;
    return field;
}

function sortByGoals(a, b) {
    if (a.goals > b.goals || a.GD > b.GD) {
        return -1;
    } else if (a.goals < b.goals || a.GD < b.GD) {
        return 1;
    } else {
        return 0;
    }
}

function checkCookies(cookieString) {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
        const cookieTrimed = cookie.trim();
        if (cookieTrimed.startsWith(cookieString)) {
            return cookieTrimed.substring(
                cookieString.length,
                cookieTrimed.length
            );
        }
    }
    return false;
}

export { appendField, sortByGoals, checkCookies };
