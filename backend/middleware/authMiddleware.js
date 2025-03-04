import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Debugging log

    // Ensure the decoded token contains an ID
    if (!decoded.id) {
      return res.status(401).json({ message: 'Invalid token structure' });
    }

    req.user = decoded;
    console.log('Attached user:', req.user); // Debugging: Verify req.user

    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
