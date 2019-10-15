export default function formatJSend (req, res, body) {
  
  /**
   * If the status code is failing then return a custom error message object without
   * the code data information.
   * 
   * If the status code is not failing and the application is in development then
   * return a custom error object with the failing code stack trace.
   */
  function formatError(res, body) {
    const clientError = res.statusCode >= 400 && res.statusCode < 500;
    if (clientError) {
      return {
        status: 'error',
        messsage: body.messsage,
        code: body.code,
      };
    }
    const debugMode = process.env.NODE_ENV ==='development';
    return {
      status: 'error',
      message: (debugMode) ? body.message : 'Internal Server Error',
      code: (debugMode) ? body.code : 'INTERNAL_SERVER_ERROR',
      data: (debugMode) ? body.stack : undefined,
    };
  }

  function formatSuccess(res, body) {
    if (body.data && body.pagination) {
      return {
        status: 'success',
        data: body.data,
        pagination: body.pagination,
      };
    } return {
      status: 'success',
      data: body,
    };
  }

  let response;
  if (body instanceof Error) {
    response = formatError(res, body);
  } else {
    response = formatSuccess(res, body);
  }
  
  response = JSON.stringify(response);
  res.header('Content-Length', Buffer.byteLength(response));
  res.header('Content-Type', 'application/json');

  return response;
}
