# iMed Document

By DannyFeng

## What is iMed?
iMed is a personal learning project developed by Danny Feng for healthcare worker to store patients information and their medical records. It has a Java Spring boot backend with RESTful API for CRUD, and a frontend written in React.js. Dev version uses H2 in memory database, easy to pass to other developer to review the code and run the application. It can be easily switch to other database drivers, such as PostgreSQL in a few minutes.

## What feature it has?

- HATEOAS API with CRUD.
- Event driven dynamic data update. When a user (try it in multiple tab) edits a field, all the other users will see the new data dynamically without reloading the page. This is event driven by web socket. Not interval or timer is used.
- Data versioning to avoid concurrent modification.
- Pagination support for both backend and frontend, this is to improve performance for large data.
- Single page React.js frontend without any web page reloading for all user interactions.

## How to run it?

Simply change directory (CD) to `imed/core`, run `$ ./mvnw spring-boot:run`

I made it to use maven to download npm, react, spring boot, all dependencies and compile both frontend and backend in one go by the above command.

After you see “Started IMedApplication”, open the browser and visit [http://localhost:8080/](http://localhost:8080/)

## Can you quickly tell me the database schema?

Very simple.

`Patient` has `id` (key), `medicare id` (unique), `first name`, `last name`, a set of `MedicalRecord`

(one patient to many records).

`MedicalRecord` has `id` (key), `Patient` (many records to one patient), and `content`.

## Can I see the API?

Sure. It is a HATEOAS RESTful API with CRUD and pagination.

As mentioned in how to run section above, after you run it, in command line, try the following.

```$ curl localhost:8080/api/

$ curl localhost:8080/api/patients

$ curl localhost:8080/api/medicalRecords

$ curl -X POST localhost:8080/api/patients -d "{\"medicareId\": \"1874637\", \"firstName\": \""Jack"\", \"lastName\": \""Ann"\"}" -H "Content-Type:application/json"

$ curl -X POST localhost:8080/api/medicalRecords -d "{\"content\": \"this is a med record\", \"patient\": \""http://localhost:8080/api/patients/1"\"}" -H "Content-Type:application/json"

$ curl http://localhost:8080/api/patients/1/medicalRecords ```
