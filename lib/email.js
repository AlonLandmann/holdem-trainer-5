import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: 'info@holdem-trainer.com',
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3'
  }
})

function sendEmail(options) {
  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

export function sendVerificationLink(recipient, token) {
  sendEmail({
    from: 'info@holdem-trainer.com',
    to: recipient,
    subject: 'Email verificatoin link',
    text: `Please verify your email address by following this link: ${process.env.ORIGIN}/verification?token=${token}`
  })
}

export function sendPasswordResetCode(recipient, code) {
  sendEmail({
    from: 'info@holdem-trainer.com',
    to: recipient,
    subject: 'Password reset code',
    text: `Your password reset code is: ${code}.`
  })
}