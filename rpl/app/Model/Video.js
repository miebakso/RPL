'use strict'

const Lucid = use('Lucid')

class Video extends Lucid {

	static get rules() {
		return {
			title: 'required|max:40',
			video_url: 'required'
		}
	}
}

module.exports = Video
