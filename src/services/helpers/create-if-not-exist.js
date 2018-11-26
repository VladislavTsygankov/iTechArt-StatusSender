const createIfNotExist = async (Model, selectConfiguration, instance) => {
  const modelInstance = await Model.findOne({
    where: selectConfiguration,
  });

  if (!modelInstance) {
    return await Model.create(instance);
  } else {
    throw new Error('This attribute already exists');
  }
};

export default createIfNotExist;
