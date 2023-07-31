import Modal from "./Modal.tsx"

type Props = {
  handleRestart: () => void
}

const WinnerModal = ({ handleRestart }: Props) => {
  return (
    <Modal>
      <div className="font-bold text-4xl p-2">Winner</div>
      <div className="p-6">( ͡° ͜ʖ ͡°)👍</div>
      <button
        onClick={handleRestart}
        className="hover:bg-green m-2 mt-6 font-bold px-16 py-2 text-2xl rounded-xl bg-blue color-red border-2 border-red"
      >
        Restart
      </button>
    </Modal>
  )
}

export default WinnerModal
