function filterErrors(error: string[]) {
    let message = '';
    error.forEach((detail: string) => {
        message += detail;
    });
    return message;
}

export { filterErrors };
