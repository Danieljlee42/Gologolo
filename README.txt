# Adding (Add a logo to the database)
mutation{
  addLogo(
    text: "MICROSOFT",
    color: "#222222",
    fontSize: 14,
    backgroundColor: "#aaaaaa",
    borderColor: "#000000",
    borderRadius: 4,
    borderWidth: 5,
    padding: 5,
    margin: 8
  ){
    lastUpdate
  }
}

# querying 
{
  logos{
    _id,
    text,
    color,
    fontSize,
    backgroundColor,
    borderColor,
    borderRadius,
    borderWidth,
    padding,
    margin,
    lastUpdate
  }
}

#query for specific id

query{
  logo(
    id: "5e93f72b0f132a3590359497"
  ){
    lastUpdate
  }
}

#Query for all

query{
  logos
  {
    lastUpdate
  }
}


#updating
mutation{
  updateLogo(
    id: "5e93f72b0f132a3590359497",
    text: "UPDATED LOGO",
    color: "#222222",
    fontSize: 14,
    backgroundColor: "#aaaaaa",
    borderColor: "#000000",
    borderRadius: 4,
    borderWidth: 5,
    padding: 5,
    margin: 8
  ){
    lastUpdate
  }
}

#removing
mutation{
  removeLogo(
    id: "5e93b69b42fcda157c8a010d"
  ){
    lastUpdate
  }
}