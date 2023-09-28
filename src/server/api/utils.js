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

  module.exports = { requireUser, requireAdminStatus }