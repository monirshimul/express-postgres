const express = require("express");
const app = express();
const pool = require("./db")

app.use(express.json());


// get all todos

const data = [{ name: "monir", age: 32 }]
app.get("/todos", async (req, res) => {
    try {
        const allTodo = await pool.query("SELECT * FROM todo")
    return res.json(allTodo.rows)
    } catch (error) {
        console.error(error.message)
    }
    
})

// get a single todo

app.get('/todos/:id', async (req, res)=>{
    try {
        const {id} = req.params
        const getTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        return res.json(getTodo.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// adding data

app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description])
        return res.json(newTodo.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// update a data 

app.put('/todos/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const update = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id])
        return res.json(`${id} has been updated`)
    } catch (error) {
        console.error(error.message)
    }
})

// Delete todo

app.delete('/todos/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const todoDelete = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        return res.json(`${id} has been deleted`)
    } catch (error) {
        console.error(error.message)
    }
})




app.listen(5000, () => {
    console.log("App is running at 5050")
})
