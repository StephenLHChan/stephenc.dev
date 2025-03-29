const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="mb-3 text-xl underline decoration-wavy decoration-3 underline-offset-6">
      {children}
    </h2>
  )
}

export default SectionTitle
