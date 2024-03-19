exports.getErrors = (error) => {
    if (error.code === 11000) {
        throw new Error('User with the provided email already exists.');
    } else if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        throw new Error(`Validation errors: ${validationErrors.join(', ')}`);
    } else {
        console.error('An unexpected error occurred during user registration:', error);
        throw new Error('An unexpected error occurred during user registration. Please try again later.');
    }
}