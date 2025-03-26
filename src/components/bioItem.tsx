const BioItem = ({
  id,
  year,
  content
}: {
  id: string
  year: string
  content: React.ReactNode
}) => {
  return (
    <div key={id} className="flex pb-2">
      <div className="w-[3.4em]">
        <span className="font-bold">{year}</span>
      </div>
      <div className="ml-10 w-4/5">{content}</div>
    </div>
  )
}

export default BioItem
