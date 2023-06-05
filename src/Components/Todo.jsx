import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import { BsTrash, BsPencil } from 'react-icons/bs';
import { BiMessageAdd } from 'react-icons/bi';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [editIndex, setEditIndex] = useState(-1); // Track the index of the todo being edited

  useEffect(() => {
    // Retrieve todos from local storage on component mount
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    // Store todos in local storage whenever it changes
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === '' || desc.trim() === '') {
      // Check if either the title or desc is empty
      return; // Return early if validation fails
    }

    if (todos.some((todo) => todo.title === title && todo.desc === desc)) {
      // Check if the title and description already exist in the todos list
      toast.error('Todo already exists!');
      return; // Return early if todo already exists
    }

    if (editIndex === -1) {
      // Add a new todo if not in edit mode
      const newTodo = { title, desc };
      setTodos([...todos, newTodo]);
    } else {
      // Update the existing todo in edit mode
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = { title, desc };
      setTodos(updatedTodos);
      setEditIndex(-1); // Reset edit mode after saving
    }
    setTitle('');
    setDesc('');
  }

  function handleDelete(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function handleEdit(index) {
    const todo = todos[index];
    setTitle(todo.title);
    setDesc(todo.desc);
    setEditIndex(index);
  }

  function handleDeleteAll() {
    setTodos([]);
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Container className="my-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mb-3"
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              className="mb-3"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="me-2">
            {editIndex === -1 ? <BiMessageAdd /> : <BsPencil />}
          </Button>

          {todos.length > 0 && (
            <Button variant="danger" onClick={handleDeleteAll}>
              <BsTrash />
            </Button>
          )}
        </Form>

        <ListGroup className="mt-4">
          {todos.map((todo, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
              <div>
                <span>{todo.title}</span> - <span>{todo.desc}</span>
              </div>
              <div>
                <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(index)}>
                  <BsTrash />
                </Button>
                <Button variant="secondary" size="sm" className="ms-2" onClick={() => handleEdit(index)}>
                  <BsPencil />
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
}

export default Todo;
