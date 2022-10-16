module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'postgres',
      user: 'brandonw504',
      password: 'pciscsi',
      host:'localhost',
      port:5432
    },
    migrations: {
      directory: __dirname + '/knex-migr/migrations',
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
