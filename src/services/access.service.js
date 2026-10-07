'use strict';
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const shopModel = require('../models/shop.model');
const keyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils')
const roleShop = {
    SHOP: 1,
    WRITER: 2,
    EDITOR: 3,
    ADMIN: 0,
}

class AccessService {
    static signUp = async ({name, email, password}) => {
        try{
            // step1: check email exist
            const holderShop = await shopModel.findOne({email}).lean();
            if (holderShop) return {
                code: 'xxx',
                message: 'Shop already registered'
            }
            const passwordHash = await bcrypt.hash(password, 10);

            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [roleShop.SHOP]
            })

            if (newShop) {
                // create privateKey, publicKey
                // const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
                //     modulusLength: 4096,
                //     publicKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     },
                //     privateKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     },
                // })
                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');

                console.log({privateKey, publicKey}) // save to collection KeyStore
                
                const keyStore = await keyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                })

                if (!keyStore) return {
                    code: 'xxxx',
                    message: 'keyStore error'
                }

                // create token pair
                const tokens = await createTokenPair({userId: newShop._id, email}, publicKey, privateKey);
                console.log(`Created Token Success::`, tokens);

                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({fields: ['_id', 'name', 'email'],   object: newShop}),
                        tokens
                    }
                }
            }

            return {
                code: 200,
                metadata: null
            }

        } catch (error) {
            return {
                code: 'xxx1',
                message: error.msg,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService