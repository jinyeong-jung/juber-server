import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetRideHistoryResponse } from "src/types/graph";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Query: {
    GetRideHistory: privateResolver(
      async (_, __, { req }): Promise<GetRideHistoryResponse> => {
        try {
          const rides = await Ride.find({ passengerId: req.user.id });
          if (rides) {
            return {
              ok: true,
              error: null,
              rides
            };
          } else {
            return {
              ok: false,
              error: "Rides not found",
              rides: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            rides: null
          };
        }
      }
    )
  }
};

export default resolvers;
