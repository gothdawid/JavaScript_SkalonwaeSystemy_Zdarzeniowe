const ejs = require("ejs");

module.exports = async (req, res) => {
    title = "Strona główna"
    ejs.renderFile("views/index.ejs", {title: title}, (err, html) => {
        if (err) {
            console.log(err);
        } else {
            res.send(html);
        }
    });

}
