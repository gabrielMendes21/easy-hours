import Delay from './LoadDelay'

export default function Main({ children, className }) {
  return (
    <main
      className={`px-4 mt-16 mb-96 md:px-40 lg:px-80 md:mt-20 md:mb-80 ${className}`}
    >
      <Delay>{children}</Delay>
    </main>
  )
}
