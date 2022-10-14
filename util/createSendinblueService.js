import nodemailer from 'nodemailer'

// https://nodemailer.com/about/
export default (smtpUser, smtpPassword, smtpHost, smtpPort) => {
  const options = {
    service: 'SendinBlue',
    auth: {
      user: smtpUser,
      pass: smtpPassword
    }
  }

  if (smtpHost) {
    options.host = smtpHost
  }

  if (smtpPort) {
    options.port = smtpPort
  }

  return nodemailer.createTransport(options)
}
