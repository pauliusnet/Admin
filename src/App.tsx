import React, { useEffect, useState } from 'react';
// @ts-ignore
import { FacebookProvider, LoginButton } from 'react-facebook';
import api from './api';
import './App.css';
import Tricks from './components/Tricks';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from './state/auth/auth.actions';
import { accessTokenSelector } from './state/auth/auth.selectors';

const App: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(accessTokenSelector);

    const handleFacebookLogin = async (response: any) => {
        const { data } = await api.users.authenticate({ facebookAccessToken: response.tokenDetail.accessToken });
        dispatch(setAccessToken(data.accessToken));
    };

    useEffect(() => {
        api.users.refreshToken().then(({ data: { accessToken } }) => {
            dispatch(setAccessToken(accessToken));
        });
    }, []);

    return (
        <div className='App'>
            <FacebookProvider appId={process.env.REACT_APP_APP_ID}>
                {accessToken ? (
                    <Tricks />
                ) : (
                    <LoginButton scope='public_profile,email' onCompleted={handleFacebookLogin}>
                        <span>Login via Facebook</span>
                    </LoginButton>
                )}
            </FacebookProvider>
        </div>
    );
};

export default App;
