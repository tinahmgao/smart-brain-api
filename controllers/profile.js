const handleProfileGet = (req, res, db) => {
  const { id } = req.params
  db.select('*')
    .from('users')
    .where({
      id: id
    })
    .then(user => {
      console.log(user[0])
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('No such user')
      }
    })
    .catch(err => res.status(400).json('Error getting user'))
}

module.exports = {
  handleProfileGet: handleProfileGet
}
