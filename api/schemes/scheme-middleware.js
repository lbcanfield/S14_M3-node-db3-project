const db = require("../../data/db-config");

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (request, responce, next) => {
     try {
          const schemeCheck = await db('schemes').where('scheme_id', request.params.scheme_id).first()
          if (!schemeCheck) {
               next({
                    status: 404,
                    message: `scheme with scheme_id ${request.params.scheme_id} not found`
               })
          }
          else {
               next()
          }
     }
     catch (error) {
          next(error)
     }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (request, responce, next) => {
     const { scheme_name } = request.body
     if (
          scheme_name === undefined ||
          typeof (scheme_name) !== 'string' ||
          scheme_name.trim().length === 0
     ) {
          next({
               status: 400,
               message: 'invalid scheme_name'
          })
     }
     else {
          next()
     }

}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (request, responce, next) => {
     const { instructions, step_number } = request.body
     if (
          instructions === undefined ||
          typeof (instructions) !== 'string' ||
          !instructions.trim() ||
          step_number < 1 ||
          typeof (step_number) !== 'number'
     ) {
          next({
               status: 400,
               message: "invalid step"
          })
     }
     else {
          next()
     }

}

module.exports = {
     checkSchemeId,
     validateScheme,
     validateStep,
}
