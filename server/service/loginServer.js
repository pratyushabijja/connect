Meteor.methods({
    loginVerify: function (credentials) {
    check(credentials,Object);
    console.log('login in server!!');
    Accounts.validateLoginAttempt(function(loginAttempt){
    // If email verification is required check if the user has a valid email address and don't allow the login if he has none
     if (!loginAttempt.user.emails[0].verified) {
         throw new Meteor.Error(902, 'Your email address has to be verified first.');
     }
     if (!loginAttempt.allowed) {
     // Only tell the user that something went wrong but not what to enhance security
      throw new Meteor.Error(901, 'Your login credentials are wrong. Try again.');
     } else {
     // In some cases this method isn't invoked with a correct user object...
     if (!loginAttempt.user) {
       throw new Meteor.Error(902, 'No valid user object. Make sure to validate your email address first.');
     }
      // We have a correct login!
      return true;
  }
  });
    console.log("Done");
  },
  getUserRole: function(id){
    check(id,String);
    var userData = {};
    var user = Meteor.users.findOne({_id : id});
    userData.roles = user.profile.appRole;
    console.log("user dataaa!", JSON.stringify(userData));
    return userData;
  }
});
