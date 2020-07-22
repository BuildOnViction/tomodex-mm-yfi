const axios = require('axios')
const config = require('config')

const gPrice = {}
const gUSDPrice = {}

const httpClient = axios.create()
httpClient.defaults.timeout = 2500

const getLatestPrice = async (p = false) => {
    try {

        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=yearn-finance&vs_currencies=usd`)
        gPrice[p] = response.data['yearn-finance'].usd

    } catch (err) {
        console.log(err)
    }
    return gPrice[p]
}

const getUSDPrice = async (p = false) => {
    let baseSymbol = 'TOMO'
    try {
        if (p && (config[p] || {}).price) {
            return config[p].price
        }

        let arr = p.split('-')
        baseSymbol = arr[0].toUpperCase()

        if (baseSymbol != 'USDT' && baseSymbol != 'USD') {
            let response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=yearn-finance&vs_currencies=usd`)
            let tokenPrice = response.data['yearn-finance'].usd
            gUSDPrice[baseSymbol] = tokenPrice
        } else {
            gUSDPrice[baseSymbol] = 1
        }

    } catch (err) {
        console.log(err)
    }
    return gUSDPrice[baseSymbol]
}

module.exports = { getLatestPrice, getUSDPrice }
