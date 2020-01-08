@locations.each do |location|
  json.set! location.id do
    json.extract! location, :id, :name, :lat, :long
  end
end
