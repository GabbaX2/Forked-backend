const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const auth = (db) => async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ error: 'Token mancante' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await db.collection('users').findOne({
            _id: new ObjectId(decoded.id)
        });

        if (!user) return res.status(401).json({ error: 'Utente non trovato' });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Autenticazione fallita' });
    }
};

module.exports = auth;
