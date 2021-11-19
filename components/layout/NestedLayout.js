import React from 'react'
import Header from '../nft-marketplace/Header'

function NestedLayout(props) {
    return (
        <div>
            <Header/>
            {props.children}
        </div>
    )
}

export default NestedLayout
