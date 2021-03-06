'use strict'

const Validator = use('Validator')
const Event = use('App/Model/Event')

class EventController {

  * index(request, response) {
    const events = yield Event.query().orderBy('created_at','desc').fetch()
    yield response.sendView('event/index', { events:events.toJSON() })
  }

  * create(request, response) {
    yield response.sendView('event/create')
  }

  * store(request, response) {
    const eventData = request.except('_csrf','submit')
    const validation = yield Validator.validate(eventData, Event.rules)
    if(validation.fails()){
      yield request
        .withOnly('title','start','end','description') 
        .andWith({ errors:validation.messages()})
        .flash()
      response.redirect('back')
    }
    yield Event.create(eventData)
    yield response.sendView('event/create', {successMessage: 'Created Event Successfully'})
  }

  * show(request, response) {
    const event = yield Event.findBy('id',request.param('id'))
    yield response.sendView('event/show', { event:event.toJSON() })
  }

  * edit(request, response) {
    const event = yield Event.findBy('id',request.param('id'))
    yield response.sendView('event/edit', { event:event.toJSON() })
  }

  * update(request, response) {
    const eventData = request.except('_csrf','submit')
    const validation = yield Validator.validate(eventData, Event.rules)
    if(validation.fails()){
      yield request
        .withOnly('title','start','end','description') 
        .andWith({ errors:validation.messages()})
        .flash()
      response.redirect('back')
    }
    const event = yield Event.findBy('id', request.param('id'))
    event.title = eventData.title
    event.start = eventData.start
    event.end = eventData.end
    event.description = eventData.description
    yield event.save()
    yield response.redirect('/event')
  }

  * destroy(request, response) {
    const event = yield Event.findBy('id', request.param('id'))
    yield event.delete()
    yield response.redirect('/event')
  }

  * events(request, response) {
    const events = yield Event.query().orderBy('created_at','desc').fetch()
    yield response.sendView('competition/events', {events:events.toJSON()})
  }

}

module.exports = EventController
