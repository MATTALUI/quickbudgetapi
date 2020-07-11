
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('budgets')
  .del()
  .then(function () {
    return knex('budgets').insert([
      {
        name: "Matt",
        user_id: 1,
        dateSaved: 1538149939679,
        incomes: JSON.stringify([{name: "tracefirst", value: 2879.34}]),
        expenses: JSON.stringify([
          {name: "tithing", value: "10%"},
          {name: "fast offerings", value: 20},
          {name: "stulo", value: 669.69},
          {name: "car insurance", value: 150},
          {name: "car payment", value: 200},
          {name: "savings", value: 1000},
          {name: "phone", value: 70}
        ])
      },
      {
        name: "Public Budget",
        user_id: 1,
        dateSaved: 1594495865544,
        public: true,
        incomes: JSON.stringify([{name: "Etsy Sales", value: 420.69}]),
        expenses: JSON.stringify([
          {category: 'General expenses', color: '#000000'},
          {name: "savings", value: "10%"},
          {name: "cat food", calue: 87.03}
        ])
      }
    ]);
  })
  .then(function(){
    return knex.raw("SELECT setval('budgets_id_seq', (SELECT MAX(id) FROM budgets));");
  });
};
