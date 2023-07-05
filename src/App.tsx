import logo from '/lambda.png'
import './App.css'

function App() {

  return (
    <>
      <div>
        <a href="https://lambda.kevinzonda.com" target="_blank">
          <img style={{minWidth: '128px', minHeight: '128px'}} src={logo} className="logo" alt="KevinZondaLambda logo" />
        </a>
      </div>
      <h1 style={{marginBottom: '0'}}>λ: Serverless Simple</h1>
      <h2 className={"grey-text"}>Managed Serverless Service by KevinZonda</h2>

      <button disabled={true}>Available Soon</button>
    </>
  )
}

export default App
