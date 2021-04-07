import Content from 'components/Content'
import Info from 'components/Info'

export default function Home() {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-between">
      <Content />
      <Info />
    </div>
  )
}
