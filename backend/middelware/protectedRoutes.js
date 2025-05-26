import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || '1bb06b1a29b8b50339f61e4444cbd71a334ddd50dc312b75bd5aef91656197361994d3b91aa3809227d378c46f5c2729e5a72ad60617359317b1f545c764b4a6'; // Your JWT secret key

// Middleware to verify JWT token from cookies
export const verifyToken = (req, res, next) => {


  
  
  // Get token from cookies
  const token = req.cookies.token;


  if (!token) {
    return res.status(403).json({ message: 'unauthonticated' });
  }

  try {

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded)
    req.user = decoded;
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
