'use strict'

const Lucid = use('Lucid')

class Team extends Lucid {

	static get rules() {
		return {
			name: 'required|max:100',
			country: 'required',
			name1: 'required',
			name2: 'required',
			name3: 'required',
			name4: 'required'
		}
	}
	
	category() {
		return this.belongsTo('App/Model/Category')
	}
}

module.exports = Team
