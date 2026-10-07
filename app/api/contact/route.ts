import { NextResponse } from "next/server"

const MONDAY_API_URL = "https://api.monday.com/v2"
const BOARD_ID = "5978901066"
const GROUP_ID = "group_mm13rdh1"
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 254
const MAX_PHONE_LENGTH = 40

type ContactPayload = {
  name?: unknown
  email?: unknown
  phone?: unknown
  website?: unknown
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload

    // Honeypot: real visitors never see the website field, bots fill it.
    if (getString(payload.website).trim()) {
      return NextResponse.json({ success: true })
    }

    const name = getString(payload.name).trim()
    const email = getString(payload.email).trim()
    const phone = getString(payload.phone).trim()

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      )
    }

    if (email.length > MAX_EMAIL_LENGTH || !emailPattern.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      )
    }

    if (name.length > MAX_NAME_LENGTH || phone.length > MAX_PHONE_LENGTH) {
      return NextResponse.json(
        { error: "Input is too long" },
        { status: 400 }
      )
    }

    const token = process.env.MONDAY_API_TOKEN
    if (!token) {
      return NextResponse.json(
        { error: "Server configuration error: no token" },
        { status: 500 }
      )
    }

    const columnValues: Record<string, unknown> = {
      text: name,
    }

    if (phone) {
      columnValues.phone = phone
    }

    const query = `mutation ($boardId: ID!, $groupId: String!, $itemName: String!, $columnValues: JSON!) {
      create_item (board_id: $boardId, group_id: $groupId, item_name: $itemName, column_values: $columnValues) {
        id
      }
    }`

    const variables = {
      boardId: BOARD_ID,
      groupId: GROUP_ID,
      itemName: email,
      columnValues: JSON.stringify(columnValues),
    }

    const res = await fetch(MONDAY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        "API-Version": "2024-10",
      },
      body: JSON.stringify({ query, variables }),
    })

    const raw = await res.text()
    console.log("Monday.com raw response:", raw)

    let data
    try {
      data = JSON.parse(raw)
    } catch {
      return NextResponse.json(
        { error: "Invalid response from Monday.com", raw },
        { status: 502 }
      )
    }

    if (data.errors || data.error_message || data.error_code) {
      return NextResponse.json(
        { error: "Monday.com error", details: data.errors ?? data.error_message ?? data },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, id: data.data.create_item.id })
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json(
      { error: "Internal error", details: String(err) },
      { status: 500 }
    )
  }
}

function getString(value: unknown) {
  return typeof value === "string" ? value : ""
}
