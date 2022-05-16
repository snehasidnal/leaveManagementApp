
  const mailjet = require ('node-mailjet')
.connect('08aa5189e7dafc563a77be0e2ab4dc3c', 'df151c0190df5bbabcc32a624304d758')
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "prathameshkalburgi@gmail.com",
        "Name": "prathamesh"
      },
      "To": [
        {
          "Email": "prathameshkalburgi@gmail.com",
          "Name": "prathamesh"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })


