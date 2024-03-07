class ApiResponse {
    constructor( statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400     //400-499 = client error response & 500-599 = server error response & 100-399 = response
    }
}

export {ApiResponse}