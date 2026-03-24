const send = (res, responseData, data = {}) => {
  const { code, message } = responseData || {};

  return res.status(code || 500).send({
    responseCode: code || 500,
    responseMessage: message || "Something went wrong",
    responseData: data,
  });
};

const setErrmsg = (responseObj, customMsg = "") => {
  return {
    code: responseObj?.code || 500,
    message: customMsg || responseObj?.message || "Error",
  };
};

export { send, setErrmsg };