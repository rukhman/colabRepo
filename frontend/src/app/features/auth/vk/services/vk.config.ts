import * as VKID from '@vkid/sdk';

export const initVKConfig = () => {
  VKID.Config.init({
    app: 52346268, // Идентификатор приложения.
    redirectUrl: 'http://localhost:4200/redirect-auth', // Адрес для перехода после авторизации.
    state: 'dj29fnsadjsd82', // Произвольная строка состояния приложения.
    codeVerifier: 'FGH767Gd65', // Верификатор в виде случайной строки. Обеспечивает защиту передаваемых данных.
    scope: 'email phone', // Список прав доступа, которые нужны приложению.
    mode: VKID.ConfigAuthMode.InNewTab, // По умолчанию авторизация открывается в новой вкладке.
    // mode: VKID.ConfigAuthMode.Redirect, // По умолчанию авторизация открывается в новой вкладке.
  });
};