'use strict'

const Schema = use('Schema')

class VideosTableSchema extends Schema {

  up () {
    this.create('videos', (table) => {
      table.increments()
      table.timestamps()
      table.string('title',40).notNullable()
      table.string('video_url').notNullable()
    })
  }

  down () {
    this.drop('videos')
  }

}

module.exports = VideosTableSchema
