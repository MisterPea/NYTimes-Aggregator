const sgMail = require("@sendgrid/mail");
const templateID = process.env.TEMPLATE_ID;
sgMail.setApiKey(process.env.EMAIL_API);

const dateWithSuffix = (day) => {
  const lastChar = day.substring(day.length - 1);
  switch (lastChar) {
    case "1":
      return `${day}st`;
    case "2":
      return `${day}nd`;
    case "3":
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

/**
 * Method to compose email from userObject.
 * @param {Object} userObject The userObject is comprised of:
 * - active
 * - selections
 * - displayName
 * - email
 * - searchArticles
 */
function composeEmail(userObject) {
  const today = new Date();
  const month = today.toLocaleString("default", {month: "long"});
  const day = dateWithSuffix(`${today.getDate()}`);
  const year = today.getFullYear();
  const date = `${month} ${day}, ${year}`;
  const {displayName, email, searchArticles} = userObject;
  const msg = {
    to: email,
    from: "hello_there@misterpea.me",
    template_id: templateID,
    dynamic_template_data: {
      date: date,
      subject: `Your personalized briefing for ${date}`,
      name: displayName,
      articleSearch: searchArticles,
    },
  };
  sgMail.send(msg)
      .then(() => {
        console.log("email sent");
      })
      .catch((err) => {
        console.log(err);
      });
}

module.exports = {composeEmail};
