type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {

  return (
    <main className="app-bg">

      <div className="container-dashboard">

        {children}

      </div>

    </main>
  )

}