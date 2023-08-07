import { useState } from "react";
import { api } from "~/utils/api";

export default function Home() {
  const [todo, setTodo] = useState("")

  const utils = api.useContext()
  const getTodos = api.todo.getTodos.useQuery()
  const submitTodo = api.todo.submitTodo.useMutation({
    onSuccess: () => {
      utils.todo.getTodos.invalidate()
    }
  })
  return (
    <main>
      <form onSubmit={(e) => {
        e.preventDefault()
        if (!todo) {
          return alert("Please enter a todo")
        }
        submitTodo.mutate({
          text: todo
        })
      }}>
        <input type="text" name="todo" id="toto" onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button>Submit</button>
      </form>

      { getTodos.isSuccess && getTodos.data.map((todo) => (
        <div key={todo.id}>
          {todo.text}
        </div>
      ))}
    </main>
  );
}
