import styles from './pagination.module.css'
import {useNavigate, useParams, useLocation} from "react-router-dom";
import Modal from "../Modal/Modal";

export default function Pagination(props) {
    let navigate = useNavigate();
    let {query} = useParams();

    let paginationObject = props.paginationObject.object;
    let error = props.paginationObject.error;

    let urlPath = (useLocation()).pathname;
    urlPath = (urlPath.split("/page"))[0]
    urlPath = (urlPath.split("/search"))[0]
    if (urlPath === "/"){
        urlPath = "";
    }


    function changePage(pageNumber) {
        if (query) {
            navigate(`${urlPath}/search/${query}/page/${pageNumber}`);
        } else {
            navigate(`${urlPath}/page/${pageNumber}`);
        }
    }

    function nextPage() {
        if (paginationObject.currentPage + 1 === paginationObject.totalPages) return;
        if (query) {
            navigate(`${urlPath}/search/${query}/page/${paginationObject.currentPage + 1}`);
        } else {
            navigate(`${urlPath}/page/${paginationObject.currentPage + 1}`);
        }
    }

    const beforePage = () => {
        if (paginationObject.currentPage - 1 === -1) return;
        if (query) {
            navigate(`${urlPath}/search/${query}/page/${paginationObject.currentPage - 1} `)
        } else {
            navigate(`${urlPath}/page/${paginationObject.currentPage - 1}`)
        }
    }

    if(error){
        return (
            <Modal className="error" show={true}>{error}</Modal>
        );
    }else {
        return (
            <div className={styles['next-page-container']}>
                {paginationObject.currentPage === 0 ? null :
                    <span className={`${styles["change-page"]} material-symbols-outlined`}
                          onClick={beforePage}>navigate_before</span>}

                {paginationObject.totalPages >= 4 && paginationObject.currentPage >= 2 ?
                    <span onClick={() => changePage(0)}> 1... </span> : ""}

                <div className={styles["inner-pagination"]}>

                    {paginationObject.currentPage <= 1 ?
                        <span onClick={paginationObject.currentPage === 0 ? null : beforePage}
                              className={paginationObject.currentPage === 0 ? styles.active : null}>1</span>
                        : paginationObject.currentPage >= paginationObject.totalPages - 2 ? <span
                                onClick={paginationObject.currentPage === paginationObject.totalPages - 1 ? () => changePage(paginationObject.totalPages - 3) : beforePage}>{paginationObject.totalPages - 2}</span>
                            : <span onClick={beforePage}>{paginationObject.currentPage}</span>
                    }

                    {paginationObject.totalPages >= 2 ?
                        paginationObject.currentPage <= 1 ?
                            <span onClick={paginationObject.currentPage === 1 ? null : nextPage}
                                  className={paginationObject.currentPage === 1 ? styles.active : null}>2</span>
                            : paginationObject.currentPage >= paginationObject.totalPages - 1 ? <span
                                    onClick={paginationObject.currentPage === paginationObject.totalPages - 1 ? beforePage : null}>{paginationObject.totalPages - 1}</span>
                                : <span className={styles.active}>{paginationObject.currentPage + 1}</span>
                        : null}

                    {paginationObject.totalPages >= 3 ?
                        paginationObject.currentPage <= 1 ?
                            <span onClick={() => changePage(2)}>3</span>
                            : paginationObject.currentPage >= paginationObject.totalPages - 2 ?
                                <span onClick={paginationObject.currentPage === paginationObject.totalPages - 1 ? null : nextPage}
                                      className={paginationObject.currentPage === paginationObject.totalPages - 1 ? styles.active : null}>{paginationObject.totalPages}</span>
                                : <span onClick={nextPage}>{paginationObject.currentPage + 2}</span>
                        : null}

                </div>

                {paginationObject.totalPages >= 4 && paginationObject.currentPage <= paginationObject.totalPages - 3 ?
                    <span onClick={() => changePage(paginationObject.totalPages - 1)}> ...{paginationObject.totalPages}</span> : ""}

                {paginationObject.currentPage === paginationObject.totalPages - 1 ? null :
                    <span className={`${styles["change-page"]} material-symbols-outlined`}
                          onClick={nextPage}>navigate_next</span>}
            </div>
        );
    }
}