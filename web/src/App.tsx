interface ButtonProps {
  title: string
}

function Button(props: ButtonProps) {
  return (
    <button>{props.title}</button>
  )
}

function App() {
  return (
    <div>
      <Button title="Botão 1" />
      <Button title="Botão 2" />
      <Button title="Botão 3" />
    </div>
  )
}

export default App
