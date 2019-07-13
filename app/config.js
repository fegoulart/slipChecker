module.exports = function () {

    switch (process.env.NODE_ENV) {
        case 'development':
            return {
                'devEmail': 'fernando@leapi.com'
            };
        case 'production':
            return {
                'devEmail': 'fernando@leapi.com',
            };
        default:
            return {
                'devEmail': 'fernando@leapi.com',

            }
    }
};