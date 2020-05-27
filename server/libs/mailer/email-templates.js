const { appHost } = require('../../config');

const subjectTemplate = template => {
	const subject = {
		registerInvite: 'Rice | Подтверждение email',
		registerComplete: 'Rice | Аккаунт успешно активирован',
		passwordRestore: 'Rice | Восстановление пароля',
		passwordRestoreComplete: 'Rice | Пароль восстановлен',
		userRemoveAccess: 'Rice | Аккаунт удалён'
	};
	
	return subject[template];
};

const letterTemplate = (template, name, token) => {
	const host = process.env.NODE_ENV === 'production' ? appHost : 'http://localhost:8080';
	const usersLoginPage = `${ host }/users/login`;
	
	const link = {
		registerInvite:  `${ host }/users/${ token }/register/complete`,
		passwordRestore: `${ host }/users/${ token }/password/restore`,
	};
	
	const headerTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml"><head> <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]--><meta content="text/html; charset=utf-8" http-equiv="Content-Type"/><meta content="width=device-width" name="viewport"/> <!--[if !mso]><!--><meta content="IE=edge" http-equiv="X-UA-Compatible"/> <!--<![endif]--><title></title> <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"/> <!--<![endif]--><style type="text/css">body{margin:0;padding:0}table,td,tr{vertical-align:top;border-collapse:collapse}*{line-height:inherit}a[x-apple-data-detectors=true]{color:inherit !important;text-decoration:none !important}</style><style id="media-query" type="text/css">@media (max-width: 620px){.block-grid,.col{min-width:320px !important;max-width:100% !important;display:block !important}.block-grid{width:100% !important}.col{width:100% !important}.col>div{margin:0 auto}img.fullwidth,img.fullwidthOnMobile{max-width:100% !important}.no-stack .col{min-width:0 !important;display:table-cell !important}.no-stack.two-up .col{width:50% !important}.no-stack .col.num4{width:33% !important}.no-stack .col.num8{width:66% !important}.no-stack .col.num4{width:33% !important}.no-stack .col.num3{width:25% !important}.no-stack .col.num6{width:50% !important}.no-stack .col.num9{width:75% !important}.video-block{max-width:none !important}.mobile_hide{min-height:0px;max-height:0px;max-width:0px;display:none;overflow:hidden;font-size:0px}.desktop_hide{display:block !important;max-height:none !important}}</style></head><body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #e2eace;"> <!--[if IE]><div class="ie-browser"><![endif]--><table bgcolor="#e2eace" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e2eace; width: 100%;" valign="top" width="100%"><tbody><tr style="vertical-align: top;" valign="top"><td style="word-break: break-word; vertical-align: top;" valign="top"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#e2eace"><![endif]--><div style="background-color:transparent;"><div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;"><div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px;"><![endif]--><div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;"><div style="width:100% !important;"> <!--[if (!mso)&(!IE)]><!--><div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"> <!--<![endif]--><div align="center" class="img-container center fullwidth" style="padding-right: 0px;padding-left: 0px;"> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><div style="font-size:1px;line-height:25px"> </div><img align="center" alt="Image" border="0" class="center fullwidth" src="https://github.com/constantinesimm/my-cv/blob/master/public/email/email-rounder-dwn.png?raw=true" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 600px; display: block;" title="Image" width="600"/> <!--[if mso]></td></tr></table><![endif]--></div> <!--[if (!mso)&(!IE)]><!--></div> <!--<![endif]--></div></div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]--></div></div></div><div style="background-color:transparent;"><div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;"><div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#FFFFFF;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]--><div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;"><div style="width:100% !important;"> <!--[if (!mso)&(!IE)]><!--><div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"> <!--<![endif]--><div align="center" class="img-container center" style="padding-right: 0px;padding-left: 0px;"> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Image" border="0" class="center" src="https://github.com/constantinesimm/my-cv/blob/master/public/email/email-rice-logotype.png?raw=true" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 330px; display: block;" title="Image" width="330"/> <!--[if mso]></td></tr></table><![endif]--></div> <!--[if (!mso)&(!IE)]><!--></div> <!--<![endif]--></div></div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]--></div></div></div><div style="background-color:transparent;"><div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;"><div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#FFFFFF;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px;"><![endif]--><div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;"><div style="width:100% !important;"> <!--[if (!mso)&(!IE)]><!--><div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"> <!--<![endif]--> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]--><div style="color:#0D0D0D;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"><div style="font-size: 12px; line-height: 1.2; color: #0D0D0D; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14px;">`;
	const footerTemplate = `<!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]--></div><table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%"><tbody><tr style="vertical-align: top;" valign="top"><td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 30px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%"><tbody><tr style="vertical-align: top;" valign="top"><td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td></tr></tbody></table></td></tr></tbody></table> <!--[if (!mso)&(!IE)]><!--></div> <!--<![endif]--></div></div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]--></div></div></div><div style="background-color:transparent;"><div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;"><div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px;"><![endif]--><div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;"><div style="width:100% !important;"> <!--[if (!mso)&(!IE)]><!--><div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"> <!--<![endif]--><div align="center" class="img-container center fullwidth" style="padding-right: 0px;padding-left: 0px;"> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Image" border="0" class="center fullwidth" src="https://github.com/constantinesimm/my-cv/blob/master/public/email/email-rounder-dwn-1.png?raw=true" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 600px; display: block;" title="Image" width="600"/> <!--[if mso]></td></tr></table><![endif]--></div><table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%"><tbody><tr style="vertical-align: top;" valign="top"><td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 30px; padding-right: 30px; padding-bottom: 30px; padding-left: 30px;" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%"><tbody><tr style="vertical-align: top;" valign="top"><td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td></tr></tbody></table></td></tr></tbody></table> <!--[if (!mso)&(!IE)]><!--></div> <!--<![endif]--></div></div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]--></div></div></div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--></td></tr></tbody></table> <!--[if (IE)]></div><![endif]--></body></html>`;
	
	const bodyTemplate = {
		registerInvite: `<p style="font-size: 28px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 34px; margin: 0;"><span style="font-size: 28px;"><strong><span style="font-size: 28px;">Добро пожаловать!</span></strong></span><br/><span style="font-size: 28px;">Вам предоставлен доступ в панель управления ботом Rice-food</span></p></div></div> <!--[if mso]></td></tr></table><![endif]--><div align="center" class="img-container center"> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="" align="center"><![endif]--><img align="center" alt="Image" border="0" class="center" src="https://github.com/constantinesimm/my-cv/blob/master/public/email/email-divider.png?raw=true" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 316px; display: block;" title="Image" width="316"/> <!--[if mso]></td></tr></table><![endif]--></div> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]--><div style="color:#0D0D0D;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.5;padding-top:20px;padding-right:10px;padding-bottom:10px;padding-left:10px;"><div style="font-size: 12px; line-height: 1.5; color: #0D0D0D; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px;"><p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">Для завершения регистрации и активации аккаунта, перейдите по ссылке.<br/><span style="color: #ff0000;"><strong>Обратите внимание!</strong></span> <u>Ссылка действительна в течении 24 часов!</u></p></div></div> <!--[if mso]></td></tr></table><![endif]--><div align="center" class="button-container" style="padding-top:25px;padding-right:10px;padding-bottom:10px;padding-left:10px;"> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 25px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46.5pt; width:183.75pt; v-text-anchor:middle;" arcsize="7%" stroke="false" fillcolor="#ff3b1f"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]--><div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#ff3b1f;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto; width:auto;;border-top:1px solid #ff3b1f;border-right:1px solid #ff3b1f;border-bottom:1px solid #ff3b1f;border-left:1px solid #ff3b1f;padding-top:15px;padding-bottom:15px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;cursor:pointer;"><span style="padding-left:15px;padding-right:15px;font-size:16px;display:inline-block;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><a href="${ link[template] }" style="color: #ffffff; text-decoration: none;font-weight: 600;">Активировать аккаунт</a></span></span></div>`,
		registerComplete: `<p style="font-size: 28px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 34px; margin: 0;"> <span style="font-size: 28px;"><strong><span style="font-size: 28px;">Здраствуйте, ${ name }!</span></strong></span> <br/><span style="font-size: 28px;">Ваш аккаунт в панели управления ботом Rice-food активирован.</span></p></div></div><!--[if mso]></td></tr></table><![endif]--><div align="center" class="img-container center"><!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="" align="center"><![endif]--><img align="center" alt="Image" border="0" class="center" src="https://github.com/constantinesimm/my-cv/blob/master/public/email/email-divider.png?raw=true" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 316px; display: block;" title="Image" width="316"/><!--[if mso]></td></tr></table><![endif]--></div><!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]--><div style="color:#0D0D0D;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.5;padding-top:20px;padding-right:10px;padding-bottom:10px;padding-left:10px;"><div style="font-size: 12px; line-height: 1.5; color: #0D0D0D; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px;"><p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"> Для входа в админпанель управления ботом используйте ваш email и пароль.<br/>Страница авторизации доступна <u>по ссылке</u> ниже.</p></div></div><!--[if mso]></td></tr></table><![endif]--><div align="center" class="button-container" style="padding-top:25px;padding-right:10px;padding-bottom:10px;padding-left:10px;"><!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 25px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46.5pt; width:183.75pt; v-text-anchor:middle;" arcsize="7%" stroke="false" fillcolor="#ff3b1f"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]--><div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#ff3b1f;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto; width:auto;;border-top:1px solid #ff3b1f;border-right:1px solid #ff3b1f;border-bottom:1px solid #ff3b1f;border-left:1px solid #ff3b1f;padding-top:15px;padding-bottom:15px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;cursor:pointer;"> <span style="padding-left:15px;padding-right:15px;font-size:16px;display:inline-block;"> <span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><a href="${ usersLoginPage }" style="color: #ffffff; text-decoration: none;font-weight: 600;">Переход в админпанель</a></span></span></div>`,
		passwordRestore: `<p style="font-size: 28px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 34px; margin: 0;"> <span style="font-size: 28px;"><strong><span style="font-size: 28px;">Здраствуйте, ${ name }!</span></strong></span><br/> <span style="font-size: 28px;">Мы получили запрос на восстановление пароля к вашему аккаунту.</span></p></div></div> <!--[if mso]></td></tr></table><![endif]--><div align="center" class="img-container center"> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="" align="center"><![endif]--><img align="center" alt="Image" border="0" class="center" src="https://github.com/constantinesimm/my-cv/blob/master/public/email/email-divider.png?raw=true" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 316px; display: block;" title="Image" width="316"/> <!--[if mso]></td></tr></table><![endif]--></div> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]--><div style="color:#0D0D0D;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.5;padding-top:20px;padding-right:10px;padding-bottom:10px;padding-left:10px;"><div style="font-size: 12px; line-height: 1.5; color: #0D0D0D; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px;"><p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"> Для сброса пароля и реактивации аккаунта, перейдите по ссылке. <br/><span style="color: #ff0000;"><strong>Обратите внимание!</strong></span> <u>Ссылка действительна в течении 24 часов!</u></p></div></div> <!--[if mso]></td></tr></table><![endif]--><div align="center" class="button-container" style="padding-top:25px;padding-right:10px;padding-bottom:10px;padding-left:10px;"> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 25px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46.5pt; width:183.75pt; v-text-anchor:middle;" arcsize="7%" stroke="false" fillcolor="#ff3b1f"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]--><div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#ff3b1f;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto; width:auto;;border-top:1px solid #ff3b1f;border-right:1px solid #ff3b1f;border-bottom:1px solid #ff3b1f;border-left:1px solid #ff3b1f;padding-top:15px;padding-bottom:15px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;cursor:pointer;"> <span style="padding-left:15px;padding-right:15px;font-size:16px;display:inline-block;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"> <a href="${ link[template] }" style="color: #ffffff; text-decoration: none;font-weight: 600;">Сбросить пароль</a> </span></span></div>`,
		passwordRestoreComplete: `<p style="font-size: 28px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 34px; margin: 0;"> <span style="font-size: 28px;"><strong><span style="font-size: 28px;">Здраствуйте, ${ name }!</span></strong></span> <br/><span style="font-size: 28px;">Пароль успешно восстановлен, аккаунт активирован.</span></p></div></div><!--[if mso]></td></tr></table><![endif]--><div align="center" class="img-container center"><!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="" align="center"><![endif]--><img align="center" alt="Image" border="0" class="center" src="https://github.com/constantinesimm/my-cv/blob/master/public/email/email-divider.png?raw=true" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 316px; display: block;" title="Image" width="316"/><!--[if mso]></td></tr></table><![endif]--></div><!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]--><div style="color:#0D0D0D;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.5;padding-top:20px;padding-right:10px;padding-bottom:10px;padding-left:10px;"><div style="font-size: 12px; line-height: 1.5; color: #0D0D0D; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px;"><p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"> Можете пройти авторизацию используя ваш email и новый пароль.<br/>Страница авторизации доступна <u>по ссылке</u> ниже.</p></div></div><!--[if mso]></td></tr></table><![endif]--><div align="center" class="button-container" style="padding-top:25px;padding-right:10px;padding-bottom:10px;padding-left:10px;"><!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 25px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46.5pt; width:183.75pt; v-text-anchor:middle;" arcsize="7%" stroke="false" fillcolor="#ff3b1f"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]--><div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#ff3b1f;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto; width:auto;;border-top:1px solid #ff3b1f;border-right:1px solid #ff3b1f;border-bottom:1px solid #ff3b1f;border-left:1px solid #ff3b1f;padding-top:15px;padding-bottom:15px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;cursor:pointer;"> <span style="padding-left:15px;padding-right:15px;font-size:16px;display:inline-block;"> <span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><a href="${ usersLoginPage }" style="color: #ffffff; text-decoration: none;font-weight: 600;">Переход в админпанель</a></span></span></div>`,
		userRemoveAccess: `<p style="font-size: 28px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 34px; margin: 0;"> <span style="font-size: 28px;"><strong><span style="font-size: 28px;">Здраствуйте, ${ name }!</span></strong></span> <br/><span style="font-size: 28px;">Вам было прекращено предоставление доступа в админпанель управления ботом Rice-food.</span></p></div></div><!--[if mso]></td></tr></table><![endif]--><div align="center" class="img-container center"><!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="" align="center"><![endif]--><img align="center" alt="Image" border="0" class="center" src="https://github.com/constantinesimm/my-cv/blob/master/public/email/email-divider.png?raw=true" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 316px; display: block;" title="Image" width="316"/><!--[if mso]></td></tr></table><![endif]--></div><!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]--><div style="color:#0D0D0D;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.5;padding-top:20px;padding-right:10px;padding-bottom:10px;padding-left:10px;"><div style="font-size: 12px; line-height: 1.5; color: #0D0D0D; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px;"><p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"> Благодарим за использование нашего сервиса.<br/><strong>Хорошего дня!</strong></p></div></div><!--[if mso]></td></tr></table><![endif]-->`
	};
	
	return headerTemplate + bodyTemplate[template] + footerTemplate;
};

module.exports = {
	subjectTemplate,
	letterTemplate
};