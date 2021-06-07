export const successHandler = (response, setFeedback, next) => {
    setFeedback({
        open: true,
        severity: "success",
        message: response.data.message
    });
    next();
}

export const infoHandler = (response,setFeedback,next) => {
    setFeedback({
        open: true,
        severity: "info",
        message: response.data.message
    });
    next();
}

export const errorHandler = (err, history, setFeedback) => {
    if (err.message === "Network Error") {
        history.push('/neterr');
    } else {
        const message = err.response?.data?.error ?? err.message;
        setFeedback({
            open: true,
            severity: "error",
            message: message
        })
    }
}