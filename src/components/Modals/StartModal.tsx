import Modal from "./Modal.tsx"

type Props = {
  handleStart: () => void
}

const GameOverModal = ({ handleStart }: Props) => {
  return (
    <Modal>
      <div className="font-bold text-4xl p-2">Welcome to Party Ascend!</div>
      <div className="p-6">(👍 ͡❛ ͜ʖ ͡❛)👍</div>
      <button
        onClick={handleStart}
        className="hover:bg-green m-2 mt-6 font-bold px-16 py-2 text-2xl rounded-xl bg-blue color-red border-2 border-red"
      >
        Start
      </button>
    </Modal>
  )
}

export default GameOverModal
