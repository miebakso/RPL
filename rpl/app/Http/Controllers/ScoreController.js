'use strict'

const Category = use('App/Model/Category')

const Team = use('App/Model/Team')

const Participant = use('App/Model/Participant')

class ScoreController {

	* score (request, response) {
		const category = yield Category.findBy('id',request.param('id'))
		if (category.type==1){
			const teams = yield Team.query().where('category_id', request.param('id')).orderBy('time','asc').fetch()
			yield response.sendView('competition/final', { teams:teams.toJSON()})
		} else {
			const participants = yield Participant.query().where('category_id', request.param('id')).orderBy('time','asc').fetch()
			yield response.sendView('competition/final', { participants:participants.toJSON()})
		}

	}
}

module.exports = ScoreController
