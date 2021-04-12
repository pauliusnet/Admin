import { Api } from './generated-api';
import store from '../state/store';
import { setAccessToken } from '../state/auth/auth.actions';

const api = new Api({ baseUrl: 'http://localhost:3000', baseApiParams: { credentials: 'include' } });

const originalRequest = api.request;

api.request = async (...args) => {
    try {
        return await originalRequest(...args);
    } catch (error) {
        const hasAuthorizationHeader = args[0]?.headers && 'Authorization' in args[0]?.headers;
        if (error.status === 401 && hasAuthorizationHeader) {
            const { data } = await api.users.refreshToken().catch((error) => {
                store.dispatch(setAccessToken(''));
                throw error;
            });
            store.dispatch(setAccessToken(data.accessToken));
            args[0].headers = { ...args[0].headers, Authorization: `Bearer ${data.accessToken}` };
            return originalRequest(...args);
        }
        throw error;
    }
};

export default api;
export * from './generated-api';
