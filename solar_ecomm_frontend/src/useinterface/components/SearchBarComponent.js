import React from 'react'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useStyles } from '../css/UserInterfaceCss';


export default function SearchBarComponent(props) {
    const classes=useStyles()

  return (
    <div className={classes.serachbar_innerdiv} style={{width:props.parentWidth}} >
          <input  placeholder='Search for items & brands ' fullwidth className={classes.sb_input} style={{width:props.width}}/>
          <IconButton>
            <SearchIcon />
          </IconButton>
    </div>

  )
}
