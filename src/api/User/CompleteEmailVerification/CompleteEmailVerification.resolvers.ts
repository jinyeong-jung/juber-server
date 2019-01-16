import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  CompleteEmailVerificationMutationArgs,
  CompleteEmailVerificationResponse
} from "src/types/graph";
import Verification from "../../../entities/Verification";

const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerification: privateResolver(
      async (
        _,
        args: CompleteEmailVerificationMutationArgs,
        { req }
      ): Promise<CompleteEmailVerificationResponse> => {
        const user = req.user;
        const { key } = args;
        if (user.email) {
          try {
            const verification = await Verification.findOne({
              payload: user.email,
              key
            });
            if (verification) {
              user.verifiedEmail = true;
              user.save();
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Can't verify email. Please check your key."
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        } else {
          return {
            ok: false,
            error: "No email to verify."
          };
        }
      }
    )
  }
};

export default resolvers;
