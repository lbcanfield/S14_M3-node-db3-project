const db = require('../../data/db-config')

function find() { // EXERCISE A
     const result = db('schemes as sc')
          .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
          .select('sc.*')
          .groupBy('sc.scheme_id')
          .count('st.step_id as number_of_steps')

     return result
}

async function findById(scheme_id) { // EXERCISE B
     const items = await db('schemes as sc')
          .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
          .where('sc.scheme_id', scheme_id)
          .select('st.*', 'sc.scheme_name', 'st.scheme_id')
          .orderBy('st.step_number')

     const results = {
          scheme_id: items[0].scheme_id,
          scheme_name: items[0].scheme_name,
          steps: []
     }

     items.forEach(item => {
          if (item.step_id) {
               results.steps.push({
                    step_id: item.step_id,
                    step_number: item.step_number,
                    instructions: item.instructions
               })
          }
     })


     return results
}

async function findSteps(scheme_id) { // EXERCISE C
     const items = await db('schemes as sc')
          .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
          .where('sc.scheme_id', scheme_id)
          .orderBy('step_number')

     if (items[0].step_id === null) {
          return []
     }
     return items
}

function add(scheme) { // EXERCISE D
     return db('schemes').insert(scheme)
          .then(([scheme_id]) => {
               return db('schemes').where('scheme_id', scheme_id).first()
          })
}

function addStep(scheme_id, step) { // EXERCISE E
     return db('steps').insert({
          ...step,
          scheme_id
     })
          .then(() => {
               return db('steps').where('scheme_id', scheme_id).orderBy("step_number")
          })
}

module.exports = {
     find,
     findById,
     findSteps,
     add,
     addStep,
}
