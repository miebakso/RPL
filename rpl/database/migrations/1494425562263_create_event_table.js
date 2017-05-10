'use strict'

const Schema = use('Schema')

class EventsTableSchema extends Schema {

  up () {
    this.create('events', (table) => {
      table.increments()
      table.timestamps()
      table.string('title',40).notNullable()
      table.time('start').notNullable()
      table.time('end').notNullable()
      table.text('description').notNullable()
    })
  }

  down () {
    this.drop('events')
  }

}

module.exports = EventsTableSchema
