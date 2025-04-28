if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    process.exit(1);
}

module.exports = {
    secret: process.env.JWT_SECRET, // Use the environment variable
    expiresIn: '24h',
    issuer: 'your-app',
    audience: 'your-app-users'
};