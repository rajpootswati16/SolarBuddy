import React from 'react'
import { usestyle } from '../css/BrandsCss'
import list from "../css/list.png"
import logo from "../css/logo.png"
import { useNavigate } from 'react-router-dom'

export default function TitleComponent(props) {
    const classes = usestyle()
    const navigate=useNavigate()

  return (
    <div style={{display:'flex'}}>
        
      <img alt='logo' src={logo} style={{width:'42px', height:'42px'}}/>
      <div className={classes.titlestyle}>{props.title}</div>
        <div style={{marginLeft:'auto',cursor:'pointer' }} onClick={()=>navigate(props.link)}>
            <img alt='list' src={list} style={{width:'35px', height:'35px'}} />
        </div>
    </div>
  )
}


