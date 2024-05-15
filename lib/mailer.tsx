import { readFileSync } from "fs";
import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap"
import { Html, Button } from "@react-email/components";

/**
 * For this example to work, you need to set up a sending domain,
 * and obtain a token that is authorized to send from the domain.
 * @see https://help.mailtrap.io/article/69-sending-domain-setup
 */

const TOKEN = process.env.MAILTRAP_TOKEN;
const SENDER_EMAIL = process.env.SENDER_EMAIL!;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL!;

export async function sendMail() {
	var transport = nodemailer.createTransport({
		host: "sandbox.smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: process.env.MAILTRAP_USERNAME,
			pass: process.env.MAILTRAP_PASSWORD,
		}
	});

	// Note: 'sandbox: true' can be passed for making requests to Testing API
	transport.sendMail({
		text: "Welcome to Mailtrap Sending!",
		to: RECIPIENT_EMAIL,
		from: SENDER_EMAIL,
		subject: "Hello from Mailtrap!",
		html: `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">

  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
  </head>
  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">A fine-grained personal access token has been added to your account<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
  </div>

  <body style="background-color:#ffffff;color:#24292e;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Helvetica,Arial,sans-serif,&quot;Apple Color Emoji&quot;,&quot;Segoe UI Emoji&quot;">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:480px;margin:0 auto;padding:20px 0 48px">
      <tbody>
        <tr style="width:100%">
          <td><img alt="Github" height="32" src="https://react-email-demo-ndjnn09xj-resend.vercel.app/static/github.png" style="display:block;outline:none;border:none;text-decoration:none" width="32" />
            <p style="font-size:24px;line-height:1.25;margin:16px 0"><strong>@<!-- -->alanturing</strong>, a personal access was created on your account.</p>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:24px;border:solid 1px #dedede;border-radius:5px;text-align:center">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:14px;line-height:24px;margin:0 0 10px 0;text-align:left">Hey <strong>alanturing</strong>!</p>
                    <p style="font-size:14px;line-height:24px;margin:0 0 10px 0;text-align:left">A fine-grained personal access token (<a style="color:#067df7;text-decoration:none" target="_blank">resend</a>) was recently added to your account.</p><a style="line-height:1.5;text-decoration:none;display:inline-block;max-width:100%;font-size:14px;background-color:#28a745;color:#fff;border-radius:0.5em;padding:12px 24px 12px 24px" target="_blank"><span><!--[if mso]><i style="letter-spacing: 24px;mso-font-width:-100%;mso-text-raise:18" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">View your token</span><span><!--[if mso]><i style="letter-spacing: 24px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p style="font-size:14px;line-height:24px;margin:16px 0;text-align:center"><a style="color:#0366d6;text-decoration:none;font-size:12px" target="_blank">Your security audit log</a> ・<!-- --> <a style="color:#0366d6;text-decoration:none;font-size:12px" target="_blank">Contact support</a></p>
            <p style="font-size:12px;line-height:24px;margin:16px 0;color:#6a737d;text-align:center;margin-top:60px">GitHub, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107</p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>

</html>
`
	}).then(console.log)
		.catch(console.error)
}