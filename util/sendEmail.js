// import nodemailer from 'nodemailer'

// emailService
// https://nodemailer.com/message/
export default async (nodemailerEmailService, {
  from,
  to,
  cc,
  bcc,
  subject,
  text,
  html,
  attachments,

  // Advanced
  sender,
  replyTo,
  inReplyTo,
  messageId,
  references,
  headers
}) => {
  const info = await nodemailerEmailService.sendMail({
    from,
    to,
    cc,
    bcc,
    subject,
    text,
    html,
    attachments,

    // Advanced
    sender,
    replyTo,
    inReplyTo,
    messageId,
    references,
    headers
  })

  return info.messageId
}
