export default class HttpClient {
    static get() {
        return Promise.resolve(`buyPrice,buy_qty,sellPrice,sell_qty,enter,
3.37,1,3.41,1,0
3.33,1,3.37,1,0
3.55,1,3.7,1,1
3.23,1,3.27,1,0
3.21,1,3.25,1,0`);
    }
}
