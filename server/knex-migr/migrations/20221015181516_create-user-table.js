exports.up = async function(knex) {
    await knex.schema.createTable('users', (table) => {
        table.uuid('id');
        table.string('name');
        table.string('city');
        table.string('spotify_token');
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTable('users');
};
