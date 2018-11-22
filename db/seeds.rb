# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

drinks = [
  {name:'cola', price:'120', stock:'5', maker:'cocacola', date:'2019-10-11', kind:'can'},
  {name:'redbull', price:'200', stock:'5', maker:'redbull', date:'2018-12-23', kind:'can'},
  {name:'water', price:'100', stock:'5', maker:'samda', date:'2019-08-23', kind:'pet'}
]

Drink.create! drinks
