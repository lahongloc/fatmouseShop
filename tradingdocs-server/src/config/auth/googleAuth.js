const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../app/models/User");

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: process.env.CALLBACK_URL,
			passReqToCallback: true,
			scope: ["profile", "email"],
		},
		async function (request, accessToken, refreshToken, profile, done) {
			// Here you can handle user profile, save to database, etc.
			console.log("google id la: ", profile.id);
			console.log("display name la: ", profile.displayName);
			console.log("email la: ", profile.emails[0].value);
			console.log("body la: ", request.body);
			try {
				const response = await fetch(
					"https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					},
				);
				console.log("ten cua user: ", profile);

				const userInfo = await response.json();
				console.log("user in fo la: ", userInfo);
				let user = await User.findOne({ googleId: userInfo.id });
				if (!user) {
					const newUser = new User({
						googleId: userInfo.id,
						fullName: userInfo.name,
						email: userInfo.email,
						username: userInfo.name,
					});
					await newUser.save();
					return done(null, newUser);
				}

				return done(null, user);
			} catch (err) {
				return done(err);
			}
		},
	),
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await GoogleUser.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

module.exports = passport;
