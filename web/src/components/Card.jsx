export default function Card({ children, borderColor, background }) {
  return (
    <div
      className={`${
        borderColor ? `border-[${borderColor}]` : `border-highlighted`
      }  ${
        background ? `bg-[${background}]` : `bg-white`
      } grid grid-cols-[1fr]  text-[0.625rem] py-2 px-4 border-2 mb-2 hover:bg-highlighted hover:text-white transition-colors`}
    >
      {children}
    </div>
  )
}
