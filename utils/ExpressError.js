class ExpressError extends Error{         // Extending the Error class
    constructor(statusCode,message){      // Constructor to set the status code and message
        super();                          // Calling the super class constructor
        this.statusCode = statusCode;
        this.message = message;
    };
};

module.exports = ExpressError;