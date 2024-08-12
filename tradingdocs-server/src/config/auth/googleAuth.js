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
			try {
				const response = await fetch(
					"https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					},
				);

				const userInfo = await response.json();
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
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

module.exports = passport;
