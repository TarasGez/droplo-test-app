import MenuContainer from '@/components/MenuContainer'

const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-50">
      <div className="flex w-full flex-col items-center px-4 sm:px-8 lg:px-16">
        <MenuContainer />
      </div>
    </main>
  )
}

export default HomePage
