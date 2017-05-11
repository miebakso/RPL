'use strict'

const Validator = use('Validator')
const Category = use('App/Model/Category')
const Participant = use('App/Model/Participant')

class ParticipantController {
  
  * index(request, response) {
    const participants = yield Participant.query().with('category').orderBy('created_at','desc').fetch()
    yield response.sendView('participant/index', { participants:participants.toJSON() })
  }

  * create(request, response) {
  	const categories = yield Category.query().where('type',0).where('status',0).fetch()
    yield response.sendView('participant/create', {categories:categories.toJSON()})
  }

  * store(request, response) {
    const participantData = request.except('_csrf','submit')
    const validation = yield Validator.validate(participantData, Participant.rules)
    if(validation.fails()){
      yield request
        .withOnly('name','country','category_id') 
        .andWith({ errors:validation.messages()})
        .flash()
      response.redirect('back')
    }
    const participant = new Participant
    participant.name = participantData.name
    participant.country = participantData.country
    participant.time = 0;
    participant.category_id = participantData.category_id 
    yield participant.save()
    yield response.sendView('participant/create', {successMessage: 'Created Participant Successfully'})
  }

  * show(request, response) {
    const participant = yield Participant.query().where('id', request.param('id')).with('category').fetch()
    yield response.sendView('participant/show', { participant:participant.toJSON() })
  }

  * edit(request, response) {
  	const categories = yield Category.query().where('type',0).where('status',0).fetch()
    const participant = yield Participant.query().where('id', request.param('id')).fetch()
    yield response.sendView('participant/edit', { participant:participant.toJSON(), categories:categories.toJSON() })
  }

  * update(request, response) {
    const participantData = request.except('_csrf','submit')
    const validation = yield Validator.validate(participantData, Participant.rules)
    if(validation.fails()){
      yield request
        .withOnly('name','country','category_id') 
        .andWith({ errors:validation.messages()})
        .flash()
      response.redirect('back')
    }
    const participant = yield Participant.findBy('id', request.param('id'))
    participant.name = participantData.name
    participant.country = participantData.country
    participant.time = participantData.time
    participant.category_id = participantData.category_id
    yield participant.save()
    yield response.redirect('/participant')
  }

  * destroy(request, response) {
    const participant = yield Participant.findBy('id', request.param('id'))
    yield participant.delete()
    yield response.redirect('/participant')
  }
}

module.exports = ParticipantController
