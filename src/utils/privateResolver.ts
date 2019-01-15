const privateResolver = resolverFunction => (parent, args, context, info) => {
  if (!context.req.user) {
    throw new Error("No JWT. I refuse to proceed.");
  }
  const resolved = resolverFunction(parent, args, context, info);
  return resolved;
};

export default privateResolver;
