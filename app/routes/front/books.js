const ejs = require("ejs");

module.exports = async (req, res) => {
    title = "Książki"
    ejs.renderFile("views/books.ejs", {title: title}, (err, html) => {
        if (err) {
            console.log(err);
        } else {
            res.send(html);
        }
    });

}
