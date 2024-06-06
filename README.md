Done Following API & function's
-----------------------------------
1. Create user : Before insert validate the Username
End point : http://localhost:3000/users
Method : Post
Params : {
		"username":"SampleUser",
		"password": "123456"
		"role": "admin" or "user"
	 }

2. Submit Score 
   a) get Token 
	End point : http://localhost:3000/auth/login
	Method : Post
	Params : {
			"username":"SampleUser",
			"password": "123456"
		 }
   b) Submit score 
	End Point : http://localhost:3000/leaderboard/scores
	Method : Post
	{
    		"name":"jitu",
    		"score":100
	}
	Set Token in Header like this way
	Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImppdHUiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxNzY3NDI3MCwiZXhwIjoxNzE3Njc3ODcwfQ.gK13TSOumYUxtgiy8vkBL7Jf3hVWwJAAf2Sh-JXYUOM
3. View Dashboard : will give top 10 user's score
	End Point : http://localhost:3000/leaderboard
	Method : GET
	
4. Logging: All requests should be logged to a file, including the client's IP address,
	the HTTP method, the endpoint, and the response status code.
	Example ::1 POST /auth/login 201

  Required packages 
 
  npm i -g @nestjs/cli
  nest new leaderboard
  npm install @nestjs/typeorm typeorm mysql2
  npm install @nestjs/passport passport passport-jwt @nestjs/jwt @nestjs/config class-validator class-transformer rate-limit express-rate-limit  mysql2@latest morgan
  npm i --save-dev @types/passport-jwt
 
  
  



