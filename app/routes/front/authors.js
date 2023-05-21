const ejs = require("ejs");

module.exports = async (req, res) => {
    title = "Autorzy"
    ejs.renderFile("views/authors.ejs", {title: title}, (err, html) => {
        if (err) {
            console.log(err);
        } else {
            res.send(html);
        }
    });

}
