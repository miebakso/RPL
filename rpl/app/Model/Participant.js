'use strict'

const Lucid = use('Lucid')

class Participant extends Lucid {
	
	static get rules() {
		return {
			name:'required|max:100',
			country: 'required'
		}
	}

	category() {
		return this.belongsTo('App/Model/Category')
	}
}

module.exports = Participant
