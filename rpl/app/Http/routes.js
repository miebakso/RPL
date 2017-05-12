'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('admin')
//Route.on('/video').render('video')

Route.resource('/video','VideoController')
Route.resource('/event','EventController')
Route.resource('/category','CategoryController')
Route.resource('/participant','ParticipantController')
Route.resource('/team','TeamController')

Route.on('/competition/home').render('competition/home')
Route.get('/competition/events','EventController.events')
Route.get('/competition/live','VideoController.live')
Route.get('/competition/category','CategoryController.category')
Route.get('/competition/category/:id','ScoreController.score')


