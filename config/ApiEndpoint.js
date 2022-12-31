import { constants } from "buffer";
import Constants from "./Constants";
// console.log(LOGIN_USER,'Constants');
export default {
    LOGIN_USER: Constants.BASE_API_URL + 'user/login',
    FORGOTPASS: Constants.BASE_API_URL + 'user/forgotPassword',
    DASHBOARD: Constants.BASE_API_URL + 'stock/dashboard',
    ACCOUNT_LIST: Constants.BASE_API_URL + 'account/list',
    PATTERN_LIST: Constants.BASE_API_URL + 'Pattern/list',
    PATTERN_DELETE: Constants.BASE_API_URL + 'Pattern/delete',
    REGISTER_LIST: Constants.BASE_API_URL + 'user/register',
    SOCIAL_LOGIN: Constants.BASE_API_URL + 'user/social/login',
    // USER_FORGOT_PASSWORD: Constants.BASE_API_URL + 'user/forgotPassword',
    USER_VERIFYOTP: Constants.BASE_API_URL + 'user/verifyOtp',
    USER_CRETENEWPASSWORD: Constants.BASE_API_URL + 'user/createNewPassword',
    USER_EDIT: Constants.BASE_API_URL + 'user/edit',
    USERCHANGEPASS: Constants.BASE_API_URL + 'user/changepassword',
    ACCOUNT_VIEW: Constants.BASE_API_URL + 'account/view',
    GET_PROFILE: Constants.BASE_API_URL + 'user/getprofile',
    ADD_ACCOUNT: Constants.BASE_API_URL + 'account/add',
    ADD_CUSTOM_PATTERN: Constants.BASE_API_URL + 'Pattern/customPattern/create',
    EDIT_PATTERN: Constants.BASE_API_URL + 'Pattern/edit',
    EDIT_CUSTOM_PATTERN: Constants.BASE_API_URL + 'Pattern/customPattern/edit',

    PATTERN_PLAY: Constants.BASE_API_URL + 'Pattern/play',
    PATTERN_PAUSE: Constants.BASE_API_URL + 'Pattern/pause',
    ACCOUNT_DELETE: Constants.BASE_API_URL + 'account/delete',
    ORDERLIST: Constants.BASE_API_URL + 'order',
    UPLOAD_PROFILE: Constants.BASE_API_URL + 'user/profile/upload',
    ACCOUNT_SWITCH: Constants.BASE_API_URL + 'account/switch',
    PATTERN_VIEW: Constants.BASE_API_URL + 'Pattern/view',
    SEARCHLIST: Constants.BASE_API_URL + 'stock/instrumnetlist/search',
    ACCOUNT_EDIT:Constants.BASE_API_URL+'account/edit',
    UPDATE_ACCESS_TOKEN: Constants.BASE_API_URL + 'zerodha/access/update',
    ORDER_DELETE:Constants.BASE_API_URL+'order/delete',
    GET_STOCK_PRICE: Constants.BASE_API_URL + 'stock/price',
    ADD_PATTERN: Constants.BASE_API_URL + 'Pattern/create',
    SCRIP_LIST: Constants.BASE_API_URL + 'stock/instrumnetlist/search',
    CUSTOM_ORDER:Constants.BASE_API_URL+'order/step/CUSTOM',
    // SCRIP_LIST: Constants.BASE_API_URL + 'stock/instrumnetlist',

}
