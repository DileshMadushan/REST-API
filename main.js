const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

//temporary data array for testing
const courses = [
    { id: 1, name: "cou.01" },
    { id: 2, name: "cou.02" },
    { id: 3, name: "cou.03" }
];

//READ
app.get("/", (req, res) => {
    res.send("Hello...! My name is Dilesh Madhushan");
});
app.get("/courses", (req, res) => {
    res.json(courses);
});
//READ by specific ID
app.get("/courses/:id", (req, res) => {
    //look up at the course to check if it exists
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Not Found');
    res.send(course);
});

//CREATE
app.post("/create_courses", (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//UPDATE
app.put('/update/:id', (req, res) => {
    //look up at the course to check if it exists
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Not Found');

    //update the course
    course.name = req.body.name;
    res.send(course);
});

//DELETE
app.delete('/delete/:id', (req, res) => {
    //look up at the course to check if it exists
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Not Found');

    //delete the course
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course)
});


app.listen(port, () => {
    console.log(`example app listening on ${port}`);
});