'use strict'

const Schema = use('Schema')

class CategoriesTableSchema extends Schema {

  up () {
    this.create('categories', (table) => {
      table.increments()
      table.timestamps()
      table.string('name', 40).notNullable()
      table.boolean('status').notNullable()
      table.boolean('type').notNullable()
    })
  }

  down () {
    this.drop('categories')
  }

}

module.exports = CategoriesTableSchema
