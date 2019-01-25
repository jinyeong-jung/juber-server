import { withFilter } from "graphql-yoga";

const resolvers = {
  Subscription: {
    RideStatusSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("rideUpdate"),
        (payload, _, { context }) => {
          const user = context.currentUser;
          const {
            RideStatusSubscription: { driverId, passengerId }
          } = payload;
          return user.id === driverId || user.id === passengerId;
        }
      )
    }
  }
};

export default resolvers;
