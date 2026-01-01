import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {User} from "../model/user.model.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: "http://localhost:8000/auth/google/callback",
        },
        async (_accessToken, _refreshToken, profile, done) => {
        try {
            const email = profile.emails?.[0]?.value;
            if (!email) {
                return done(new Error("Google account has no email"), undefined);
            }
            let user = await User.findOne({ email });

            if (user) {
                // Link Google account if not already linked
                if (!user.googleId) {
                    user.googleId = profile.id;
                    user.authProvider = "google";
                    await user.save();
                }
                return done(null, user);
            }
            // Create new user
            user = await User.create({
                name: profile.displayName,
                email,
                googleId: profile.id,
                authProvider: "google"
            });
            return done(null, user);
        } catch (err) {
            return done(err, undefined);
        }
    }
)
);
