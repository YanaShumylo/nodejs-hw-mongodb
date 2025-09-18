
export const errorHandler = (error, req, res, next) => {
    console.error(error);

    res.status(500).json({
        status: 500,
        message: "Something went wrong",
        error: error.message,
    });
};
