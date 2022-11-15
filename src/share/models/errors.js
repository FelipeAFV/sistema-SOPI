

class PermissionError extends Error {

    constructor(message, permissionFailed) {
        super(message)
        this.permissionFailed = permissionFailed;
    }

    
}

exports.PermissionError = PermissionError;