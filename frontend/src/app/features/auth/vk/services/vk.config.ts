import * as VKID from '@vkid/sdk';
import { environment } from '../../../../../environments/environment';

export const initVKConfig = () => {
  const init = VKID.Config.init({
    app: 52346268, // Идентификатор приложения.
    // redirectUrl: 'https://rukhman.github.io/colabRepo/redirect-auth', // Адрес для перехода после авторизации.
    redirectUrl: environment.redirectUrl, // Адрес для перехода после авторизации.
    state: 'dj29fnsadjsd82', // Произвольная строка состояния приложения.
    codeVerifier: 'FGH767Gd65', // Верификатор в виде случайной строки. Обеспечивает защиту передаваемых данных.
    scope: 'email phone', // Список прав доступа, которые нужны приложению.
    // mode: VKID.ConfigAuthMode.InNewTab, // По умолчанию авторизация открывается в новой вкладке.
    mode: VKID.ConfigAuthMode.Redirect, // По умолчанию авторизация открывается в новой вкладке.
    __debug: true,
  });
};
