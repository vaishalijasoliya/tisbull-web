import React, { useState } from "react";
// import "./button-group.css";
import styles from './Stocks.module.scss'

const ButtonGroup = ({ buttons, doSomethingAfterClick }) => {
    const [active, setActive] = useState('');

    const [clickedId, setClickedId] = useState(-1);

    const handleClick = (event, id) => {
        setClickedId(id);
        doSomethingAfterClick(event);
    };
    //   var currentPath = pathname

    // console.log(id,'clickedId')

    return (
        <>
            {buttons.map((buttonLabel, i) => (
                <button
                    key={i}

                    name={buttonLabel}
                    //   className={styles.batnserluisf}
                    onClick={(event) => handleClick(event, i)}
                    className={i === clickedId ?   styles.active: styles.active2}

                    // className={clickedId === '0' ? styles.active :clickedId = '1' ? styles.active2 :styles.listnull }
                >
                    {console.log(clickedId, 'i45484')}
                    {buttonLabel}
                </button>
            ))}
        </>
    );
};

export default ButtonGroup;