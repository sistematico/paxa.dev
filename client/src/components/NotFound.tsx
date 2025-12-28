import "../assets/css/notfound.css"

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen text-4xl">
      {/* <div className="w-xl max-w-7xl border h-64">
        <h1>Not found</h1>
      </div> */}

      <div>
	  <span className="glitch">404</span>
	{/* <span className="offset">404</span> */}
	<span>404</span>
</div>
    </div>
  )
}

export default NotFound
