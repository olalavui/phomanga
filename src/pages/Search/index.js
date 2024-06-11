import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { useParams } from 'react-router-dom'

import styles from '../../components/Layout/components/Comics/Comics.module.scss'
import useFetch from '../../hooks/useFetch'
import Comic from '../../components/Layout/components/Comic'
import Pagination from '../../components/Layout/components/Pagination'
import toast from 'react-hot-toast'

const cx = classNames.bind(styles)

function Search() {
    const params = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [data] = useFetch(`https://otruyenapi.com/v1/api/tim-kiem?keyword=${params.keyword}&page=${currentPage}`)
    const [result, setResult] = useState([])
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        if (data) {
            const totalItems =
                data?.data?.params?.pagination?.totalItems
            const totalItemsPerPage =
                data?.data?.params?.pagination?.totalItemsPerPage
            setResult(data?.data?.items || [])
            totalItems > totalItemsPerPage ?
                setTotalPage(Math.round(totalItems / totalItemsPerPage)) :
                setTotalPage(1)
            toast.success(`Đã tìm kiếm ${totalItems} truyện phù hợp!`)
        }
    }, [data])

    return (
        <div style={{ margin: 'unset' }} className={cx('wrapper')}>
            {data &&
                <>
                    <div className={cx('title')}>
                        <h4 style={{ textTransform: 'unset' }}>
                            {result.length > 0 ?
                                `Tìm kiếm được ${data?.data?.params?.pagination?.totalItems} truyện phù hợp cho từ khoá ''${params.keyword}''` :
                                `Không tìm kiếm được truyện phù hợp!`
                            }
                        </h4>
                    </div>
                    <div className={cx('list')}>
                        {result.map((comic, index) => (
                            <Comic key={index} data={comic} />
                        ))}
                    </div>
                </>
            }
            {result.length > 0 &&
                <Pagination
                    currentPage={currentPage}
                    totalPage={totalPage}
                    itemsPerPage={window.innerWidth > 786 ? 10 : 4}
                    setCurrentPage={setCurrentPage}
                />
            }
        </div>
    )
}

export default Search