const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

// 1. Be Polite, Greet the User

app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;

    res.send(`What a delight it is to see you once more, ${username}.`);
})

// 2. Rolling the Dice

app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number);

    // to check the type of the number variable
    // console.log(typeof number);
    

    if(isNaN(number)) {
        return res.send('You must specify a number.')
    }

    const random = Math.floor(Math.random() * (number + 1));

    res.send(`You rolled a ${random}`)
})

// 3. I Want THAT One!

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);

    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        return res.send('This item is not yet in stock. Check back soon!');
    }

    const item = collectibles[index];
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);

})

// 4. Filter Shoes by Query Parameters

  const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];


app.get('/shoes', (req, res) => {
  let filteredShoes = shoes;

  const minPrice = parseFloat(req.query['min-price']);
  const maxPrice = parseFloat(req.query['max-price']);
  const type = req.query.type;

  if (!isNaN(minPrice)) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
  }

  if (!isNaN(maxPrice)) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
  }

  if (type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
  }

  res.json(filteredShoes);
});