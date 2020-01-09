@categories.each do |category|
  json.set! category.id do
    json.partial! '/api/categories/category', category: category
    json.groups category.groups, partial: '/api/categories/groups', as: :group
  end
end
