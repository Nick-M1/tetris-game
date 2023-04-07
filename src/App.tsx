import Game from "./components/Game";

const ROWS = 20
const COLUMNS = 10

export default function App() {
  return (
      <div className="text-center text-white w-screen h-screen overflow-clip bg-neutral-900">
        <Game rows={ROWS} columns={COLUMNS} />
      </div>
  )
}