require('dotenv').config();

// prod.js - production keys here!!
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  sendGridKey: process.env.SEND_GRID_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
  nextPublicGAID: process.env.NEXT_PUBLIC_GA_ID,
  carsXe: process.env.CARS_XE_API_KEY,
  facebookID: process.env.FACEBOOK_ID,
  googleMapsId: process.env.GOOGLE_MAPS_ID,
  facebookAPI: process.env.FACEBOOK_API

};
