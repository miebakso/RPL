'use strict'

const Lucid = use('Lucid')

class Event extends Lucid {

	static get rules() {
		return {
			title: 'required|max:40',
			start: 'required',
			end: 'required',
			description: 'required'
		}
	}
}

module.exports = Event
