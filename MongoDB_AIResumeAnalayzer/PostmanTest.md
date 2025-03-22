 POST Request (Upload Resume Data)
Method: POST
URL: http://localhost:5000/api/resume/upload
Headers:
Content-Type: application/json
Body: (JSON)
json
Copy
Edit
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "+1234567890",
  "skills": ["JavaScript", "Node.js", "MongoDB"],
  "education": "B.Tech in Computer Science",
  "experience": "3 years as a Software Engineer"
}
📌 Expected Response:

json
Copy
Edit
{
  "message": "Resume saved successfully!"
}
