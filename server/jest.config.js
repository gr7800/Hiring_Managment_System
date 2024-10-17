export default {
  type: "module",
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "json", "node"],
};
