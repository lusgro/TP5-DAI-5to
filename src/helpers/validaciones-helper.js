function getInteger(value) {
    if (value) {
        if (isNaN(value)) {
            return null;
        }
        return parseInt(value);
    }
    return null;
}

function getBoolean(value) {
    if (value) {
        if (value.toLowerCase() === 'true') {
            return true;
        }
        else if (value.toLowerCase() === 'false') {
            return false;
        }
        return null;
    }
    return null;
}

function getDate(value) {
    try {
        let fechaf = value.split("-");
        let year = fechaf[0];
        let month = fechaf[1];
        let day = fechaf[2];
        let date = new Date(year,month,'0');
        if ((day-0) > (date.getDate() - 0)) {
            return null;
        }
        return value;
    }
    catch (error) {
        return null;
    }
}

function getString(value) {
    if (value) {
        return value;
    }
    return null;
}

function getFloat(value) {
    if (value) {
        if (isNaN(value)) {
            return null;
        }
        return parseFloat(value);
    }
    return null;
}

export { getInteger, getBoolean, getDate, getString, getFloat };