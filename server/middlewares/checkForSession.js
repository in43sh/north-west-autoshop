module.exports = ( req, res, next ) => {
  if ( !req.session.user ) {
      req.session.user = {
          user_id: null,
          first_name: null,
          last_name: null,
          street_address: null,
          state: null,
          city: null,
          zip: null,
          email: null,
          phone: null,
          avatar: null,
          title: null,
          longitude: null,
          latitude: null,
          about_message: null,
          proximity: null
      }
  }
  next();
}