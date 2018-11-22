Rails.application.routes.draw do
  get '/vms', to: 'vms#index'
  post '/vms/insertMoney', to: 'vms#insertMoney'
  post '/vms/buy', to:'vms#buy'
end
