# react-strophe-hook

> hook wrapper on top of strophe.js

[![NPM](https://img.shields.io/npm/v/react-strophe-hook.svg)](https://www.npmjs.com/package/react-strophe-hook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-strophe-hook
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'react-strophe-hook'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [FahadAminShovon](https://github.com/FahadAminShovon)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
