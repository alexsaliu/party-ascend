import { ReactNode } from "react"

type Props = {
  children: ReactNode[]
}

const Modal = ({ children }: Props) => {
  return (
    <div className="z-[10000000000000] w-full h-full absolute flex items-center justify-center">
      <div className="absolute bg-black opacity-30 w-full h-full"></div>
      <div className="absolute bg-yellow border-4 border-red px-20 py-8 rounded-3xl flex flex-col items-center">
        {...children}
      </div>
    </div>
  )
}

export default Modal
