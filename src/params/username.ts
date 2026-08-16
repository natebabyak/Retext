export const match = (param: string): param is `@${string}` => {
  return param.startsWith("@");
};
