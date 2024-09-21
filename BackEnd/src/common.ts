const use = function (req: any, res: any, next: any) {
  function wrap(fn: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  }
};

enum ResponseType {
  success = "S",
  error = "E",
}

function setResponse(
  res: any,
  statusCode = 200,
  status = "S",
  message = "operation completed successfully",
  data = {}
) {
  return res
    .status(statusCode)
    .json({
      status: status === ResponseType.success ? "success" : "error",
      message,
      data,
    });
}

export { use, setResponse, ResponseType };
