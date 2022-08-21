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
      "Membership between the user and the group does not exists"
    );
    err.status = 404;
    next(err);
  }

  req.membership = membership;
  next();
};

const deleteMembershipAuth = async (req, res, next) => {
  const { memberId } = req.params;
  const { user, group } = req;

  console.log(group.organizerId, memberId, user.id);
  if (group.organizerId != user.id && user.id != memberId) {
    const err = new Error("Forrbiden");
    err.status = 403;
    next(err);
  }

  next();
};

module.exports = {
  isValidMembership,
  deleteMembershipAuth,
};
