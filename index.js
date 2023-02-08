import pkg from "body-parser";
import express from "express";
import Joi from "joi";

const { json } = pkg;

const app = express();
const PORT = 3000;

let courses = [
  {
    id: 1,
    name: "farhan",
  },
  {
    id: 2,
    name: "rangga",
  },
  {
    id: 3,
    name: "azhar",
  },
  {
    id: 4,
    name: "ade",
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.json(courses);
});

app.get("/api/course", (req, res) => {
  res.send(courses);
});

app.get("/api/course/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("id salah");
  res.send(course);
});

app.post("/api/course", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  console.log(req.body);
  courses.push(course);
  res.status(201).send(courses);
});

app.put("/api/course/:id", (req, res) => {
  //find id
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("id salah");

  //validate
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //update
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/course/:id", (req, res) => {
  //find id
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("id salah");

  //delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  //response
  res.status(200).send("berhasil di hapus");
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}
