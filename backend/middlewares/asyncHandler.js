// Desc: middleware to nomalize error handling in async functions
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    res.status(500).json({ message: error.message });
  });
};//  middleware to nomalize error handling in async functions

export default asyncHandler;  
