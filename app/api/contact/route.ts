import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { name, email, subject, message } = await request.json()

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 })
  }

  const res = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": process.env.POSTMARK_SERVER_TOKEN!,
    },
    body: JSON.stringify({
      From: process.env.POSTMARK_SENDER,
      To: "muhammadrafiriz23@gmail.com",
      ReplyTo: email,
      Subject: `[Portfolio] ${subject}`,
      HtmlBody: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => res.statusText)
    console.error("Postmark error:", err)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
