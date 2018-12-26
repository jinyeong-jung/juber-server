import { Greeting } from "src/types/graph";

const resolvers = {
  Query: {
    sayHello: (): Greeting => {
      return {
        text: "Hello",
        error: false
      };
    }
  }
};

export default resolvers;
