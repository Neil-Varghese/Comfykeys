//this is the error handling wrapasync function
module.exports = (fn) => {    //fn is the function that we want to run
    return (req,res,next) => {
        fn(req,res,next).catch(next);
    };
};