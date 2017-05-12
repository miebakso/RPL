'use strict'

const Validator = use('Validator')
const Category = use('App/Model/Category')
const Team = use('App/Model/Team')

class TeamController {
  
  * index(request, response) {
    const teams = yield Team.query().with('category').orderBy('created_at','desc').fetch()
    yield response.sendView('team/index', { teams:teams.toJSON() })
  }

  * create(request, response) {
  	const categories = yield Category.query().where('type',1).where('status',0).fetch()
    yield response.sendView('team/create', {categories:categories.toJSON()})
  }

  * store(request, response) {
    const teamData = request.except('_csrf','submit')
    const validation = yield Validator.validate(teamData, Team.rules)
    if(validation.fails()){
      yield request
        .withOnly('name','country','name1','name2','name3','name4','category_id') 
        .andWith({ errors:validation.messages()})
        .flash()
      response.redirect('back')
    }
    const team = new Team
    team.name = teamData.name
    team.country = teamData.country
    team.time = 0;
    team.name1 = teamData.name1
    team.name2 = teamData.name2
    team.name3 = teamData.name3
    team.name4 = teamData.name4
    team.category_id = teamData.category_id 
    yield team.save()
    yield response.sendView('team/create', {successMessage: 'Created Team Successfully'})
  }

  * show(request, response) {
    const team = yield Team.query().where('id', request.param('id')).with('category').fetch()
    yield response.sendView('team/show', { team:team.toJSON() })
  }

  * edit(request, response) {
  	const categories = yield Category.query().where('type',1).where('status',0).fetch()
    const team = yield Team.query().where('id', request.param('id')).fetch()
    yield response.sendView('team/edit', { team:team.toJSON(), categories:categories.toJSON() })
  }

  * update(request, response) {
    const teamData = request.except('_csrf','submit')
    const validation = yield Validator.validate(teamData, Team.rules)
    if(validation.fails()){
      yield request
        .withOnly('name','country','name1','name2','name3','name4','category_id') 
        .andWith({ errors:validation.messages()})
        .flash()
      response.redirect('back')
    }
    const team = yield Team.findBy('id', request.param('id'))
    team.name = teamData.name
    team.country = teamData.country
    team.time = teamData.time
    team.category_id = teamData.category_id
    yield team.save()
    yield response.redirect('/team')
  }

  * destroy(request, response) {
    const team = yield Team.findBy('id', request.param('id'))
    yield team.delete()
    yield response.redirect('/team')
  }
}

module.exports = TeamController
