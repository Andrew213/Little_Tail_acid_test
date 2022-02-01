import React from 'react';
import useAction from '@/hooks/useAction';
import { Pagination, Typography } from 'antd';
import qs from 'qs';
import { createBrowserHistory } from 'history';

import styles from './styles.module.scss';
import PetsList from './PetsList/PetsList';

const PetsPagination: React.FC = () => {
    const history = createBrowserHistory();
    const filterParams = history.location.search.substr(1);
    const filtersFromParams = qs.parse(filterParams);

    const [currentPage, setCurrentPage] = React.useState(filtersFromParams.page || 1);

    React.useEffect(() => {
        if (filtersFromParams.page) {
            setCurrentPage(Number(filtersFromParams.page));
        }
    }, [filtersFromParams.page, history.location.search]);

    // React.useEffect(() => {
    // }, []);
    // const filterParams = history.location.search.substr(1);
    // const filtersFromParams = qs.parse(filterParams);
    // if (filtersFromParams.page) {
    //     setCurrentPage(Number(filtersFromParams.page));
    // }

    // React.useEffect(() => {
    //     history.push(`?page=${currentPage}`);
    // }, [currentPage]);

    const handeonChange = React.useCallback((page: number) => {
        history.push(`?page=${page}`);

        // const filterParams = history.location.search.substr(1);
        // const filtersFromParams = qs.parse(filterParams);
        // if (filtersFromParams.page) {
        // }

        setCurrentPage(page);
    }, []);

    return (
        <div className={styles.petsContainer}>
            <PetsList pageNum={currentPage as number} />
            <Pagination
                current={currentPage as number}
                className={styles.pagination}
                total={23}
                onChange={handeonChange}
                defaultPageSize={5}
            />
        </div>
    );
};

export default PetsPagination;
