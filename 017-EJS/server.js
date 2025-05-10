// Express Server with EJS Template Engine
import express from 'express';


const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set('view engine', "ejs")
// app.set('views', path.join(import.meta.dirname, 'views'));
// app.use(express.static(path.join(import.meta.dirname, 'public')));






const student = {
name: "Lokman",
age: 22,
dept: "CST"
}

app.get('/report', (req, res) => {
  return  res.render("report", {student} )
 })

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});