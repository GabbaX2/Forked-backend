const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Errore interno del server',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

module.exports = errorHandler;