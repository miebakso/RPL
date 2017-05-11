'use strict'

const Schema = use('Schema')

class ParticipantsTableSchema extends Schema {

  up () {
    this.create('participants', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.string('country')
      table.float('time')
      table.integer('category_id').unsigned().references('id').inTable('categories')
    })
  }

  down () {
    this.drop('participants')
  }

}

module.exports = ParticipantsTableSchema
