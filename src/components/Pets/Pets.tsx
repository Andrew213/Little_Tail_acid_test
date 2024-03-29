import React from 'react';
import { Button, Pagination } from 'antd';
import qs from 'qs';
import { createBrowserHistory } from 'history';

import styles from './styles.module.scss';
import PetsList from './components/PetsList/PetsList';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const Pets: React.FC = () => {
    const history = createBrowserHistory();
    const filterParams = history.location.search.substr(1);
    const filtersFromParams = qs.parse(filterParams);
    const { total } = useTypedSelector(state => state.Pets);

    const [currentPage, setCurrentPage] = React.useState(filtersFromParams.page || 1);

    const handeonChange = React.useCallback((page: number) => {
        history.push(`?page=${page}`);
        setCurrentPage(page);
    }, []);

    React.useEffect(() => {
        if (filtersFromParams.page) {
            setCurrentPage(Number(filtersFromParams.page));
        }
    }, [filtersFromParams.page, history.location.search]);

    return (
        <div className={styles.petsContainer}>
            <PetsList pageNum={currentPage as number} />
            <Pagination
                current={currentPage as number}
                className={styles.pagination}
                total={total}
                onChange={handeonChange}
                defaultPageSize={5}
            />
        </div>
    );
};

export default Pets;
