class httpError extends Error{
    constructor(errMsg , errCode){
        super(errMsg);
        this.code = errCode;
    }
}

module.exports = httpError;