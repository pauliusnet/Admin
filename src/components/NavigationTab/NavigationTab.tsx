import { Paper, Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { NavigationRoute } from './NavigationTab.types';

const NavigationTab: React.FunctionComponent = () => {
    const history = useHistory();
    const location = useLocation();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        switch (location.pathname) {
            case NavigationRoute.Tricks:
                setValue(0);
                break;
            case NavigationRoute.Users:
                setValue(1);
                break;
            default:
                history.push(NavigationRoute.Tricks);
                setValue(0);
                break;
        }
    }, []);

    return (
        <Paper square>
            <Tabs value={value} indicatorColor='primary' textColor='primary' onChange={handleChange} centered>
                <Tab label='Tricks' onClick={() => history.push(NavigationRoute.Tricks)} />
                <Tab label='Users' onClick={() => history.push(NavigationRoute.Users)} />
            </Tabs>
        </Paper>
    );
};

export default NavigationTab;
