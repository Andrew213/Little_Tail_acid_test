import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@img/logo.png';
import { Avatar, Dropdown, Button } from 'antd';
import { YuqueOutlined, CarryOutOutlined } from '@ant-design/icons';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import cn from 'classnames';

import styles from './styles.module.scss';
import useAction from '@/hooks/useAction';

const Navigation: React.FC = () => {
    const {
        Session: { session, user },
    } = useTypedSelector(state => state);
    const { LogOut } = useAction();
    const navigate = useNavigate();

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar__container}>
                <div className={styles.navbar__logoContainer}>
                    <h2>
                        <Link to="/">
                            <img src={logo} alt="logo cat" className={styles.navbar__logo} />
                            <span style={{ color: '#7347c1' }}>Little</span>
                            <span style={{ color: '#0674ec' }}>Tail</span>
                        </Link>
                    </h2>
                </div>
                <ul className={styles.navbar__menu}>
                    <li className={cn(styles.navbar__menuItem, styles.navbar__menuItem_animals)} key={'animals'}>
                        <YuqueOutlined className={styles.navbar__menuItemIcon} />
                        <Link to="/animals">
                            <p className={styles.navbar__text}>Животные</p>
                        </Link>
                    </li>
                    <li className={cn(styles.navbar__menuItem, styles.navbar__menuItem_today)} key={'today'}>
                        <CarryOutOutlined className={styles.navbar__menuItemIcon} />
                        <Link to="/today">
                            <p className={styles.navbar__text}>Записи</p>
                        </Link>
                    </li>
                </ul>

                {session && (
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: '1',
                                    label: (
                                        <Button
                                            danger
                                            style={{
                                                width: '100%',
                                            }}
                                            onClick={() => {
                                                LogOut();
                                                navigate('/');
                                            }}
                                        >
                                            Выйти
                                        </Button>
                                    ),
                                },
                            ],
                        }}
                    >
                        <div className={styles.user}>
                            <p className={cn(styles.user__name, styles.user__name_firstName)}>{user.first_name}</p>
                            <p className={cn(styles.user__name, styles.user__name_lastName)}>{user.last_name}</p>
                            <Avatar
                                className={styles.user__ava}
                                src="https://avatar.iran.liara.run/public/job/doctor/male"
                            />
                        </div>
                    </Dropdown>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
