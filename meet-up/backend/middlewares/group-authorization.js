//Require Authorization:
//Current User must be the organizer of the group
//or a member of the group with a status of "co-host"
const { Group, Membership } = require("../db/models");

const isValidGroup = async (req, res, next) => {
  const { groupId } = req.params;
  const group = await Group.findByPk(groupId);
  if (!group) {
    const err = new Error("Group couldn't be found");
    err.status = 404;
    next(err);
  } else {
    req.group = group;
    next();
  }
};

const groupAuth = async (req, res, next) => {
  const { user, group } = req;
  const membership = await Membership.findOne({
    where: {
      memberId: user.id,
      groupId: group.id,
    },
  });

  if (
    membership &&
    (group.organizerId === user.id ||
      membership.status === "host" ||
      membership.status === "co-host")
  ) {
    req.locals = { isGroupAuth: true };
  } else {
    req.locals = { isGroupAuth: false };
  }

  next();
};

module.exports = {
  isValidGroup,
  groupAuth,
};
