'use strict'

const Validator = use('Validator')
const Video = use('App/Model/Video')

class VideoController { 

  * index(request, response) {
    const videos = yield Video.query().orderBy('created_at','desc').fetch()
    yield response.sendView('video/index', { videos:videos.toJSON() })
  }

  * create(request, response) {
    yield response.sendView('video/create')
  }

  * store(request, response) {
    const videoData = request.except('_csrf','submit')
    const validation = yield Validator.validate(videoData, Video.rules)
    if(validation.fails()){
      yield request
        .withOnly('title','video_url') 
        .andWith({ errors:validation.messages()})
        .flash()
      response.redirect('back')
    }
    yield Video.create(videoData)
    yield response.sendView('video/create', {successMessage: 'Created Video Successfully'})
  }

  * show(request, response) {
    const video = yield Video.findBy('id',request.param('id'))
    yield response.sendView('video/show', { video:video.toJSON() })
  }

  * edit(request, response) {
    const video = yield Video.findBy('id',request.param('id'))
    yield response.sendView('video/edit', { video:video.toJSON() })
  }

  * update(request, response) {
    const videoData = request.except('_csrf','submit')
    const validation = yield Validator.validate(videoData, Video.rules)
    if(validation.fails()){
      yield request
        .withOnly('title','video_url') 
        .andWith({ errors:validation.messages()})
        .flash()
      response.redirect('back')
    }
    const video = yield Video.findBy('id', request.param('id'))
    video.title = videoData.title
    video.video_url = videoData.video_url
    yield video.save()
    yield response.redirect('/video')
  }

  * destroy(request, response) {
    const video = yield Video.findBy('id', request.param('id'))
    yield video.delete()
    yield response.redirect('/video')
  }

  * live(request, response) {
    const video = yield Video.last()
    yield response.sendView('competition/live', {video:video.toJSON()})
  }

}

module.exports = VideoController
