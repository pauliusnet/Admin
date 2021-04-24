import React, { useEffect, useState } from 'react';
// @ts-ignore
import { FacebookProvider, LoginButton } from 'react-facebook';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import api from './api';
import './App.css';
import Tricks from './components/Tricks/Tricks';
import jwt from 'jsonwebtoken';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from './state/auth/auth.actions';
import { accessTokenSelector } from './state/auth/auth.selectors';
import './App.css';
import NavigationTab from './components/NavigationTab/NavigationTab';
import { NavigationRoute } from './components/NavigationTab/NavigationTab.types';
import Users from './components/Users/Users';

const App: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(accessTokenSelector);
    const [isAdminViewEnabled, setIsAdminViewEnabled] = useState(false);

    const handleFacebookLogin = async (response: { tokenDetail: { accessToken: string } }) => {
        const { data } = await api.users.authenticate({ facebookAccessToken: response.tokenDetail.accessToken });
        dispatch(setAccessToken(data.accessToken));
    };

    const getIsAdminViewEnabled = (): boolean => {
        if (!accessToken) return false;
        const decoded = jwt.decode(accessToken);
        return typeof decoded !== 'string' && decoded?.role === 'ADMIN';
    };

    useEffect(() => {
        api.users.refreshToken().then(({ data: { accessToken } }) => {
            dispatch(setAccessToken(accessToken));
        });
    }, []);

    useEffect(() => {
        setIsAdminViewEnabled(getIsAdminViewEnabled());
    }, [accessToken]);

    return (
        <div className='App'>
            {isAdminViewEnabled ? (
                <Router>
                    <div>
                        <NavigationTab />
                        <Switch>
                            <Route path={NavigationRoute.Tricks}>
                                <Tricks />
                            </Route>
                            <Route path={NavigationRoute.Users}>
                                <Users />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            ) : (
                <div className='center login-box'>
                    <h1>Wake</h1>
                    {accessToken ? (
                        <h2 className='unauthorized'>Unauthorized</h2>
                    ) : (
                        <div className='login'>
                            <FacebookProvider appId={process.env.REACT_APP_APP_ID}>
                                <LoginButton
                                    className='login-button'
                                    scope='public_profile,email'
                                    onCompleted={handleFacebookLogin}
                                >
                                    <span>Login with Facebook</span>
                                </LoginButton>
                            </FacebookProvider>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
