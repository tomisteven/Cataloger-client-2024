import React, {useState} from 'react'
import {Tab} from "semantic-ui-react"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import "./Auth.scss"


export default function Auth() {
  //variables
  const [activeIndex, setActiveIndex] = useState(0);
  //const {LogoWhite, LogoMio } = Icon;


  //funciones
  const openLogin = () => {
    setActiveIndex(0);
  }



  //paneles de tabs
  const panes = [
    {
      menuItem: "Entrar",
      render: () => (
        <Tab.Pane>
          <LoginForm />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Nuevo usuario",
      render: () => (
        <Tab.Pane>
          <RegisterForm openLogin={openLogin} />
        </Tab.Pane>
      )
    }
  ]

  return (
    <div className="auth">
      <Tab className="auth__form" panes={panes} activeIndex={activeIndex} onTabChange={(_,data)=> setActiveIndex(data.activeIndex)} />
    </div>
  )
}
