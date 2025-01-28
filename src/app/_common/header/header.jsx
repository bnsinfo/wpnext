import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='' style={{padding: '20px', display: 'flex', gap: '20px', fontWeight: '600', fontSize: '20px', justifyContent: 'center'}}>
        <Link href='/'>Home</Link>
        <Link href='/products'>Products</Link>
    </div>
  )
}

export default Header