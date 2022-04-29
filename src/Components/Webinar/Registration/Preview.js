import React from 'react'
import { useParams } from 'react-router-dom'

const Preview = () => {
    let parms=useParams()
    console.log(parms)
  return (
    <div><center>Preview</center> </div>
  )
}

export default Preview