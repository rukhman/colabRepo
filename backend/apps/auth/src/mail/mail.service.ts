import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendActivationMail(to, link) {
        this.mailerService.sendMail({
            to,
            from: "Alan1Kerry@yandex.ru",
            subject: "Активация аккаунта",
            text: "",
            html: 
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        });
    }
}
