import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123');
            console.log(decoded._id);
            console.log(decoded.admin);
            if (decoded.admin) {
                next();
            }
            else {
                return res.status(403).json({
                    message: 'No access',
                });
            }
        }
        catch (err) {
            return res.status(403).json({
                message: 'No access',
            });
        }
    }
    else {
        return res.status(403).json({
            message: 'No access',
        });
    }
}