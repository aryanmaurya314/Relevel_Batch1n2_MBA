
const movieRoutes = require('./movie.route')
const theatreRoutes = require('./theatre.routes');
const authRoutes = require('./auth.route');
const userRoute = require('./user.route');

module.exports = (app)=>{
    movieRoutes(app);
    theatreRoutes(app);
    authRoutes(app);
    userRoute(app);
}