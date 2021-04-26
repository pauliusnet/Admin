import { Paper, Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { hasKey } from '../utils';
import { NavigationRoute } from '../routes';

const NavigationTab: React.FunctionComponent = () => {
    const history = useHistory();
    const location = useLocation();
    const [value, setValue] = useState(location.pathname);

    const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Paper square>
            <Tabs value={value} indicatorColor='primary' textColor='primary' onChange={handleChange} centered>
                <Tab
                    value={NavigationRoute.Tricks}
                    label='Tricks'
                    onClick={() => history.push(NavigationRoute.Tricks)}
                />
                <Tab value={NavigationRoute.Users} label='Users' onClick={() => history.push(NavigationRoute.Users)} />
            </Tabs>
        </Paper>
    );
};

export default NavigationTab;
