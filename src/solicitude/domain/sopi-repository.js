const { User } = require("../../auth/domain/models");
const { Manager } = require("../../management/domain/models");
const { Purchase } = require("../../purchases/domain/models");
const {
  Sopi,
  SopiDetail,
  SopiStatus,
  Financing,
  CostCenter,
} = require("./models");

const getSopiById = async (id) => {
  const sopi = await Sopi.findOne({
    where: { id: id },
    include: [{ model: SopiStatus, as: "status" }, {model:CostCenter},{model:Financing}, {model: User, attributes:['username','firstname','lastname']}],
  });
  return sopi;
};

const getSopyByConditions = async(conditions) => {
  const sopi = await Sopi.findOne({
    where: conditions,
    include: [{model: SopiStatus, as: "status"}, {model: CostCenter}, {model:Financing}, {model:User, attributes: ['username','firstname','lastname']}]
  })
  return sopi;
}

const getAllSopis = async (page, perPage) => {
  const sopis = await Sopi.findAll({
    include: [
      { model: SopiStatus, as: "status" },
      { model: Financing },
      { model: CostCenter },
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
    ],
    offset: (page - 1) * perPage,
    limit: perPage,
    distinct: true,
    order: [["createdAt", "ASC"]],
  });
  return sopis;
};

const getAllSopisByConditions = async (conditions, page, perPage) => {
  const sopis = await Sopi.findAll({
    include: [
      { model: SopiStatus, as: "status" },
      { model: Financing },
      { model: CostCenter },
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
    ],
    where: conditions,
    offset: (page - 1) * perPage,
    limit: perPage,
    distinct: true,
    order: [["createdAt", "ASC"]],
  });
  return sopis;
};

const getAllSopisByStatus = async (conditions, page, perPage) => {
  return await Sopi.findAll({
    include: [
      { model: SopiStatus, as: "status", where: conditions },
      { model: SopiStatus, as: "status" },
      { model: Financing },
      { model: CostCenter },
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
    ],
    offset: (page - 1) * perPage,
    limit: perPage,
    distinct: true,
    order: [["createdAt", "ASC"]],
  });
};

const findSopi = async (conditions) => {
  const sopi = await Sopi.findOne({
    where: conditions,
    include: [{ model: SopiStatus, as: "status" }, SopiDetail],
  });
  return sopi;
};

const saveSopi = async (sopi) => {
  return await Sopi.create(sopi);
};

const updateSopi = async (id, sopi) => {
  const sopiToUpdate = await Sopi.findOne({ where: { id } });

  return await sopiToUpdate.update(sopi);
};

const getSopiFromPurchaseManager = async (managerId) => {
  return await Sopi.findAll({
    include: [
      {
        model: Purchase,
        required: true,
        through: { attributes: [] },

        include: [
          {
            model: Manager,
            required: true,
            where: { userId: managerId },
            attributes: ["userId"],
          },
        ],
      },
    ],
  });
  // return await Sopi.findAll({ include:
  //     [{ model: Purchase,
  //         include: [ {model: Manager, required: true, where: {userId: managerId}}],
  //     }]
  // })
};

exports.getSopiById = getSopiById;
exports.findSopi = findSopi;
exports.saveSopi = saveSopi;
exports.updateSopi = updateSopi;
exports.getAllSopis = getAllSopis;
exports.getAllSopisByConditions = getAllSopisByConditions;
exports.getSopiFromPurchaseManager = getSopiFromPurchaseManager;
exports.getAllSopisByStatus = getAllSopisByStatus;
exports.getSopyByConditions = getSopyByConditions;