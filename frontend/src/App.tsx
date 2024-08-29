import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress } from '@mui/material';
import { Delete as DeleteIcon, Check as CheckIcon } from '@mui/icons-material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { backend } from 'declarations/backend';

interface Todo {
  id: bigint;
  description: string;
  completed: boolean;
}

interface FormInput {
  description: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm<FormInput>();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const fetchedTodos = await backend.getTodos();
      setTodos(fetchedTodos);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      setLoading(true);
      await backend.addTodo(data.description);
      reset();
      await fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
      setLoading(false);
    }
  };

  const toggleTodo = async (id: bigint) => {
    try {
      setLoading(true);
      await backend.toggleTodo(id);
      await fetchTodos();
    } catch (error) {
      console.error('Error toggling todo:', error);
      setLoading(false);
    }
  };

  const deleteTodo = async (id: bigint) => {
    try {
      setLoading(true);
      await backend.deleteTodo(id);
      await fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Todo List
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('description', { required: true })}
          label="New Todo"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Todo
        </Button>
      </form>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {todos.map((todo) => (
            <ListItem key={Number(todo.id)} dense button onClick={() => toggleTodo(todo.id)}>
              <ListItemText
                primary={todo.description}
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
                  <DeleteIcon />
                </IconButton>
                {todo.completed && (
                  <IconButton edge="end" aria-label="completed">
                    <CheckIcon />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default App;
