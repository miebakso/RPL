'use strict'

const Validator = use('Validator')
const Category = use('App/Model/Category')

class CategoryController {

  * index(request, response) {
    const categories = yield Category.query().orderBy('created_at','desc').fetch()
    yield response.sendView('category/index', { categories:categories.toJSON() })
  }

  * create(request, response) {
    yield response.sendView('category/create')
  }

  * store(request, response) {
  	const category = new Category
    const validation = yield Validator.validate({ name:request.input('name') }, Category.rules)
    if(validation.fails()){
      yield request
        .withOnly('name') 
        .andWith({ errors:validation.messages()})
        .flash()
      response.redirect('back')
    }
    category.name = request.input('name')
    category.status = 0;
    category.type = request.input('type')
    yield category.save()
    yield response.sendView('category/create', {successMessage: 'Created Category Successfully'})
  }

  * show(request, response) {
    const category = yield Category.findBy('id',request.param('id'))
    yield response.sendView('category/show', { category:category.toJSON() })
  }

  * edit(request, response) {
    const category = yield Category.findBy('id',request.param('id'))
    yield response.sendView('category/edit', { category:category.toJSON() })
  }

  * update(request, response) {
    const categoryData = request.except('_csrf','submit')
    console.log(categoryData)
    const validation = yield Validator.validate(categoryData, Category.rules)
    if(validation.fails()){
      yield request
        .withOnly('name') 
        .andWith({ errors:validation.messages()})
        .flash()
      response.redirect('back')
    }
    const category = yield Category.findBy('id', request.param('id'))
    category.name = categoryData.name
    category.status = categoryData.status
    category.type = categoryData.type
    yield category.save()
    yield response.redirect('/category')
  }

  * destroy(request, response) {
    const category = yield Category.findBy('id', request.param('id'))
    yield category.delete()
    yield response.redirect('/category')
  }

  *category(request, response){
    const categories = yield Category.query().where('status',1).orderBy('created_at','desc').fetch()
    yield response.sendView('competition/category', { categories:categories.toJSON() })
  }

}

module.exports = CategoryController
