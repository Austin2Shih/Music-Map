exports.up = async function(knex) {
    await knex.schema.createTable('users', (table) => {
        table.string('id').primary();
        table.string('name');
        table.string('city');
        table.float('latitude');
        table.float('longitude');
        table.string('access_token');
        table.string('refresh_token');
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTable('users');
};
