import logo from '/lambda.png'
import './LandingPage.css'
import {useNavigate} from "react-router-dom";

export const LandingPage = () => {
  const nav = useNavigate()

  return (
    <div className={"landing-div"}>
      <div>
        <a href="https://lambda.kevinzonda.com" target="_blank">
          <img style={{minWidth: '128px', minHeight: '128px'}} src={logo} className="logo" alt="KevinZondaLambda logo"/>
        </a>
      </div>
      <h1 style={{marginBottom: '0'}}>λ: Serverless Simple</h1>
      <h2 className={"grey-text"}>Managed Serverless Service by KevinZonda</h2>

      <button style={{marginLeft: '10px'}} onClick={() => nav('/panel')}>Start Σ Platform →</button>
    </div>
  )
}
