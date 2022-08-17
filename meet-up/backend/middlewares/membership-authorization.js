const { Membership } = require("../db/models");

const isValidMembership = async (req, res, next) => {
  const { memberId, groupId } = req.params;

  const membership = await Membership.findOne({
    where: {
      groupId,
      memberId,
    },
  });

  if (!membership) {
    const err = new Error(
      "Membership between the user and the group does not exits"
    );
    err.status = 404;
    next(err);
  }

  req.membership = membership;
  next();
};

module.exports = {
  isValidMembership,
};
