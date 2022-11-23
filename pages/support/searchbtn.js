import style from '../../styles/support.module.css'

const Btnsearch = () => {
    return (
        <>
            <form>
                <input type="text" name="search" 
                className={style.searchbtn} autoComplete="off"/>
            </form>
        </>
    )
}

export default Btnsearch