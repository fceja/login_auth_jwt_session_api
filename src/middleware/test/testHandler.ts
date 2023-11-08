export default function someHandlerMW(req, res) {
  return res.send({ message: "Hello, from someHandler" });
}
