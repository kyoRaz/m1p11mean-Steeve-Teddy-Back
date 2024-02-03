const path = require('path')
const basename = path.basename(__filename)
const fs = require('fs')
const route = []

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach((file) => {
    try {
      // console.log(file)
      const _route = require(path.join(__dirname, file))
      route.push(_route)
    } catch (error) {
      console.log(error)
    }
  })

module.exports = route
