import Card from './Card'

export default function Task({ name, hours, dueDate }) {
  return (
    <Card>
      <span className="text-base col-span-1/2">{name}</span>
      <span>Prazo de entrega - {dueDate}</span>
      {hours ? <span>{hours} hora(s)</span> : ''}
    </Card>
  )
}
