import EventEmitter from 'events'

export default {
    BASE_API_URL: process.env.NEXT_PUBLIC_API_HOST,
    IS_INTERNET_AVAILABLE: true,
    SESSION_TOKEN: 'session_token',
    ACCESS_TOKEN: 'access_token',
    USER_DATA: 'user_data',
    CUST_LOADER: '',
    EventEmitter: new EventEmitter()
}
