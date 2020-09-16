
exports.up = function(knex) {
    return knex.schema.createTable('transaction',(table)=>{
        table.increments('idTransaction').primary();
        table.float('amount').notNullable();
        table.string('status').notNullable();
        table.string('description').notNullable();
        table.string('paymentMethod').notNullable();
        table.string('currencyId');
        table.integer('externalReference').references('idUser').inTable('Merchant');
    })
};

exports.down = function(knex) {
  
};
