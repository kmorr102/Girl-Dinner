//require user function
function requireUser(req,res,next) {
    if(!req.user) {
      res.status(401);
      next({
        name: "MissingUserError",
        message:"You must be logged in to perform this action"
      });
    }
    next()
  };

  function requireAdminStatus(req, res, next) {
    if (req.user && !req.user.isAdmin) {
      res.status(403);
      next ({
        name: "Unathorized",
        message: "Must be an administrator to perform this action"
      });
    }
    else if (req.user && req.user.isAdmin) {
      next();
    }
  };
  function checkAuthentication(req, res, next) {
    
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      // Verify the token with your secret key
      const user = jwt.verify(token, JWT_SECRET);
      req.user = user;
      next();
    } catch (error) {
      // If the token is invalid, return an unauthorized response
      res.status(401).json({ message: "Unauthorized" });
    }
  }
  
  module.exports = { requireUser, requireAdminStatus,checkAuthentication }