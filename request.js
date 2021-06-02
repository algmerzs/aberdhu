const request = require("request");
const url =
  "https://newsapi.org/v2/everything?q=keyword&apiKey=777055cd61184a9d8850ab434dd98cab";
let news = "";

request(
  {
    url: url,
    json: true,
  },
  (err, res, body) => {
    if (!err) {
      console.log(body);
    } else {
      console.log("error: ", err);
    }
  }
);

console.log(news);

// module.exports = news;
