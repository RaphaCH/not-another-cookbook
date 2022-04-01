
const recipesStube = [{
  // scrapSource: {
  //   type: String,
  //   required: true
  // },
  category: 'pasta',
  mainIngredient: 'pasta',
  title: 'Pasta with tomato sauce',
  servingAmount: 2,
  cookingTime: '15 minutes',
  ingredients:
    [
      {
        name: 'pasta',
        quantity: '1 cup',
        unit: 'cup',
        nutrition: [
          {
            calories: '100k',
          },
          {
            fat: '10',
          },
          {
            carbs: '20',
          },
          {
            protein: '30',
          }
        ]
      }
    ],
  instructions:
    [
      ['Bring the water to boil Add the pasta to the boiling water Cook for 15 minutes Add the tomato sauce Cook for 5 minutes'],
      ['Add the cheese Cook for 5 minutes Add the basil Cook for 5 minutes Add the parsley']
    ],
  image: 'https://picsum.photos/200/300',
  userImage: null
}]

module.exports = recipesStube

