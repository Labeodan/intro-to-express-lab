const express = require("express")
const app = express();
const port = 3000;


// Greeting the user
app.get("/greetings/:userName", (req, res) => {
    const userName = req.params.userName
    const greeting = `<h1>Hello ${userName}, glad you could make it!</h1>`
    res.send(greeting)
})

// Rolling the Dice
app.get("/roll/:anyNum", (req, res) => {
    const anyNum = req.params.anyNum
    const randomNumber = parseInt(Math.floor(Math.random() * anyNum), 10)

    if ( typeof anyNum !== "number" ) {
        return res.send("<h2>You must specify a number.</h2>")
    } else {
        console.log(anyNum)
        return res.send(`<h2>You rolled ${randomNumber}</h2>`)
    }

})


// I want ThAt One
app.get("/collectibles/:index", (req, res) => {
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
    ];

    const index = parseInt(req.params.index);


    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        return res.send("<h2>This item is not yet in stock. Check back soon!</h2>");
    }

    const collectible = collectibles[index];
    const product = collectible.name;
    const price = collectible.price;

    return res.send(`<h2>So, you want the ${product}? For $${price}, it can be yours!</h2>`);
});




// Using Query Parameters


app.get("/shoes", (req, res) => {
    const shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ];
    // const price = req.query.price
    const type = req.query.type
    const minPrice = req.query.minPrice
    const maxPrice = req.query.maxPrice
    let results = shoes

    if (minPrice) {
        results = results.filter((shoe) => shoe.price >= minPrice);
    }

    if (maxPrice) {
        results = results.filter((shoe) => shoe.price <= maxPrice);
    }

    if (type) {
        results = results.filter((shoe) => shoe.type === type);
    }


    return res.send(results);
})




app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})