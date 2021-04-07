// creating mock request and reponse for jest test case
const mockRequest = (sessionData, docId) => ({
  body: sessionData,
  params: {
    docId
  }
});
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue();
  return res;
};
module.exports = { mockRequest, mockResponse };
