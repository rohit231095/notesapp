const relation = {};

relation.user = require('../model/user');
relation.notes = require('../model/notes');

relation.notes.belongsTo(relation.user, { foreignKey: 'userId' });
relation.user.hasMany(relation.notes, { foreignKey: 'userId' });

module.exports = relation;