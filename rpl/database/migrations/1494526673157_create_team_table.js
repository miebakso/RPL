'use strict'

const Schema = use('Schema')

class TeamsTableSchema extends Schema {

  up () {
    this.create('teams', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.string('country')
      table.string('name1')
      table.string('name2')
      table.string('name3')
      table.string('name4')
      table.float('time')
      table.integer('category_id').unsigned().references('id').inTable('categories')
    })
  }

  down () {
    this.drop('teams')
  }

}

module.exports = TeamsTableSchema
