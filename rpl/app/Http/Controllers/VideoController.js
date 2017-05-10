'use strict'

const Validator = use('Validator')
const Video = use('App/Model/Video')

class VideoController { 

  * index(request, response) {
    const videos = yield Video.all()
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
    yield response.redirect('/video')
  }

  * show(request, response) {
    
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    //
  }

  * destroy(request, response) {
    //
  }

  * live(request, response) {
    
  }

}

module.exports = VideoController
