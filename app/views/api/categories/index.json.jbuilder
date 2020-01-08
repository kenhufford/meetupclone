@categories.each do |category|
  json.set! category.id do
    json.partial! 'category', category: category
    json.groups category.groups, partial: '/api/categories', as: :groups
  end
end
