import React from 'react'
import { PaginationItem } from 'reactstrap';

const PagesCounter = (props) => {
    const pageNumbers = [];

    for(let i = 1; i<= Math.ceil(props.totalProducts / props.productsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className='pagenation' style={{textAlign: 'center'}}>
            {pageNumbers.map(page => (
                <li key={page} className='page-item'>
                    <a onClick={() => props.paginate(page)} href='#!' className='page-link' style={{color: '#000 !important'}}>
                        {page}
                    </a>
                </li>
            ))}

            </ul>
        </nav>
    )
}
export default PagesCounter;
