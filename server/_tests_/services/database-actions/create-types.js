exports.createEntity = async (body, requestService) => {
  const entity = await requestService.post('/entity').send(body);
  return entity.body;
};