const cities = ["Davis", "Sacramento", "San Francisco", "San Jose", "Los Angeles", "Fremont", "San Diego", "Irvine", "Oakland", "Palo Alto"]

function randomCity() {
    return cities[Math.floor(Math.random() * 10)]
}

function makeName() {
    var result = ""
    var characters = "abcdefghijklmnopqrstuvwxyz"
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

exports.up = async function(knex) {
  for (let i = 0; i < 1000; i++) {
    await knex('users').insert({id: `${i}`, name: makeName(), city: randomCity()})
  }
};

exports.down = async function(knex) {
    for (let i = 0; i < 1000; i++) {
        await knex('users').where('id', `${i}`).del()
    }
};
