const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get('/',function(req,res)
{
  res.sendFile(__dirname+"/index.html");
});

app.post('/',function(req,res)
{
  var fname=req.body.firstname;
  var lname=req.body.lastname
  var inputemail=req.body.inputEmail;

  var data={
    members:[
      {
        email_address:inputemail,
        status:"subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname
        }
      }
    ]
  };
  var jsondata=JSON.stringify(data);
const url="https://us4.api.mailchimp.com/3.0/lists/95e8c8b732"
 const options={
   method:"POST",
   auth:"kamakshi:e092b941fa79c789f39f60b0f4045585-us4"
 };
const request=https.request(url,options,function(response)
{

  if(response.statusCode===200)
  {
    res.sendFile(__dirname+ "/success.html");
  }
  else
  {
    res.sendFile(__dirname+"/failure.html");
  }
  response.on("data",function(data)
{
  console.log(JSON.parse(data));
});
});
request.write(jsondata);
request.end();
});

app.post("/failure",function(req,res)
{
  res.redirect('/');
});
app.listen(process.env.PORT || 3000, function()
{
  console.log("server running");
});
// e092b941fa79c789f39f60b0f4045585-us4
// 95e8c8b732
