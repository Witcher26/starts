concat = (separator, ...values) => values.filter(Boolean).join(separator);

parseBodyErrors = e => {
    if (e.response) {
        return parseBodyErrors(e.response.body);
    }

    if (!e) {
        return undefined;
    }

    if (Array.isArray(e)) {
        return concat(" ", ...e);
    }

    if (typeof e === "string") {
        return e;
    }

    if (!e.errors) {
        return JSON.stringify(e, undefined, 4);
    }

    if (Array.isArray(e.errors)) {
        return concat(" ", ...e.errors);
    }

    return e.errors;
};

export {
    concat,
    parseBodyErrors
}