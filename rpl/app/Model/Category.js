'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {

	static get rules() {
		return {
			name: 'required|max:40'
		}
	}

	participants() {
		return this.hasMany('App/Model/Participant')
	}

	teams() {
		return this.hasMany('App/Model/Team')
	}
}

module.exports = Category
