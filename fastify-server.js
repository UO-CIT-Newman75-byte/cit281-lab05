const fastify = require("fastify")();
const fs = require('fs');

const students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
  ];

// Get route and JSON/object reply
fastify.get("/cit/student", (request, reply) => {
reply
.code(200)
.header("Content-Type", "application/json; charset=utf-8")
.send(
    students
);
})
fastify.get("/cit/student/:id", (request, reply) => {
   //
//    for (const students of id);
//    parseInt(id); //
const{id} = request.param;
let student = null;
for (const item of studnets){
  if (item.id == parseInt(id)){
    student = item;
  break;
  }
}
if (!student){
  reply
  .code(200)
  .header("Content-Type", "application/json; charset=utf-8")
  .send(students );
}else{
  if (student){
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students );
  }
}
});

fastify.get("*:", (request, reply) => {
        reply
        .code(404)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(
          {test: "This is an error page"});
});

fastify.post("/cit/student", (request, reply) => {
  const {last,first} = request.body;
  //const id = null;
  if(!last||!first){
    reply
    .code(404)
    .header("Content-Type", "text/html; charset=utf-8")
    .send("Not found");
  }
else{
  let id=0
  for(const student of students){
    if(student.id>id){
      id = student.id;
    }
  }
  id++;
students.push({id,last,first});
reply
.code(200)
.header("Content-Type", "application/json; charset=utf-8")
.send(students[students.length-1]);
}
let response=request.body;
reply
.code(200)
.header("Content-Type", "application/json; charset=utf-8")
.send(response);
});

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8082;
fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
})