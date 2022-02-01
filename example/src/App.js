import React from 'react'

import { useMyHook } from 'react-strophe-hook'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
