import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import logger from "./logger.js";
import { config } from "dotenv";
import User from "../models/User.js";

//dotenv
config();

//passport google

const { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CALLBACK } = process.env;

export default function configurePassport(passport) {
  try {
    //google
    passport.use(
      new GoogleStrategy(
        {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          callbackURL: GOOGLE_CALLBACK,
        },
        async function (accessToken, refreshToken, profile, done) {
          try {
            const [user, isNew] = await User.findOrCreate({
              where: {
                googleId: profile?.id,
              },
              defaults: {
                googleId: profile?.id,
                firstName: profile?.name?.familyName,
                lastName: profile?.name?.givenName,
                email: profile?.email,
              },
            });

            console.log(isNew, "<--");

            if (!user) {
              return done("No se pudo crear el usuario");
            } else {
              return done(null, user);
            }
          } catch (error) {
            logger.error(
              `Se produjo un error al verificar al usuario con google \h ${error}`
            );
            throw error;
          }
        }
      )
    );

    //serializar usuario

    passport.serializeUser(function (user, done) {
      try {
        return done(null, user);
      } catch (error) {
        logger.error(`Se produjo un error al serializar el usuario ${error}`);
        throw error;
      }
    });

    //deserializar usuario

    passport.deserializeUser(function (user, done) {
      try {
        return done(null, user);
      } catch (error) {
        logger.error(`Se produjo un error al serializar el usuario ${error}`);
        throw error;
      }
    });
  } catch (error) {
    logger.error(`Se produjo un error al configurar passport ${error}`);
    throw error;
  }
}
