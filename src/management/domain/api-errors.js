class ApiValidationError {
    constructor(message) {
        this.message = message;
    }
    
    toString() {
        return this.message;
    }




}

exports.ApiValidationError = ApiValidationError;