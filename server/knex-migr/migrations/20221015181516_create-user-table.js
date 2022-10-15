exports.up = async function(knex) {
    await knex.schema.createTable('users', (table) => {
        table.uuid('uuid');
        table.string('name');
        table.string('location');
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTable('users');
};
