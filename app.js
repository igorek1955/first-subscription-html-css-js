const https = require('https');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static('public'))


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/signup.html')
})

app.post('/', function(req, res) {
  const name = req.body.userName
  const surname = req.body.userSurname
  const email = req.body.email
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: name,
          LNAME: surname
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data)
  const listId = 'c624131f09'
  const apiKey = 'e231dee6ef3a414401ba08ced98a3f0f-us3'
  const url = 'https://us3.api.mailchimp.com/3.0/lists/c624131f09'
  const options = {
    method: 'POST',
    auth: 'igorek1955:e231dee6ef3a414401ba08ced98a3f0f-us3'
  }
  const request = https.request(url, options, function(response) {
    if (response.statusCode == 200) {
      res.sendFile(__dirname+'/success.html')
    }
      else {
      res.sendFile(__dirname+'/failure.html')
      }
    response.on('data', function(data) {
      console.log(JSON.parse(data))
    })
  })

  // request.write(jsonData);
  request.end();
})

app.post('/failure', function(req, res) {
  res.redirect("/")
})

app.listen(3000, () => console.log('server is running on port 3000'))


// e231dee6ef3a414401ba08ced98a3f0f-us3 -- replace url usX -  with us3 (3 instead of X)
// c624131f09
