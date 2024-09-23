import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'database/models/tokens.model';

@Injectable()
export class TokensService {
    constructor(private jwtService: JwtService) {}

    generateTokens(payload) {
        const accessToken = this.jwtService.sign(payload, {
            privateKey: process.env.JWT_ACCESS_SECRET,
            expiresIn: "30m"
        });
        const refreshToken = this.jwtService.sign(payload, {
            privateKey: process.env.JWT_REFRESH_SECRET,
            expiresIn: "30d"
        });

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        console.log(userId);
        const tokenData = await Token.findOne({where: {userId}});
        if (tokenData) {
            await Token.update({...tokenData, refreshToken}, {where: {userId}});
            return await Token.findOne({where: {userId}});
        }
        const token = await Token.create({userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken) {
        const token = (await Token.findOne({where: {refreshToken}})).refreshToken;
        await Token.destroy({where: {refreshToken}});
        return token;
    }

    validateAccessToken(token) {
        const userData = this.jwtService.verify(token, {
            secret: process.env.JWT_ACCESS_SECRET
        });
        return userData;
    }

    validateRefreshToken(token) {
        const userData = this.jwtService.verify(token, {
            secret: process.env.JWT_REFRESH_SECRET
        });
        return userData;
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({where: {refreshToken}});
        return tokenData;
    }
}
