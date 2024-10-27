import * as VKID from '@vkid/sdk';
import { environment } from '../../../../../environments/environment';

export const initVKConfig = () => {
  // return VKID.Config.init({
  //   app: 52346268, // Идентификатор приложения.
  //   // redirectUrl: 'https://rukhman.github.io/colabRepo/redirect-auth', // Адрес для перехода после авторизации.
  //   redirectUrl: environment.redirectUrl, // Адрес для перехода после авторизации.
  //   state: 'dj29fnsadjsd82', // Произвольная строка состояния приложения.
  //   codeVerifier: 'FGH767Gd65', // Верификатор в виде случайной строки. Обеспечивает защиту передаваемых данных.
  //   scope: 'email phone', // Список прав доступа, которые нужны приложению.
  //   mode: VKID.ConfigAuthMode.InNewTab, // По умолчанию авторизация открывается в новой вкладке.
  //   // mode: VKID.ConfigAuthMode.Redirect, // По умолчанию авторизация открывается в новой вкладке.
  //   __debug: true,
  // });
};
//https://id.vk.com/authorize?code_challenge=xO9UVlVhm2DDSVgVRxTDxFwC_fMNImtHmxHGs8zOh84&code_challenge_method=s256&client_id=52346268&response_type=code&scope=email%20phone&state=dj29fnsadjsd82&prompt=&stats_info=eyJmbG93X3NvdXJjZSI6ImZyb21fY3VzdG9tX2F1dGgiLCJzZXNzaW9uX2lkIjoid3dxaXlvIn0%3D&origin=http%3A%2F%2F127.0.0.1&v=2.3.2&sdk_type=vkid&app_id=52346268&redirect_uri=https%3A%2F%2Fshrimpy.netlify.app%2Fredirect-auth%2F&debug=1
