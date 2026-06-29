import { NextResponse } from "next/server"

const MONDAY_API_URL = "https://api.monday.com/v2"
const BOARD_ID = "5978901066"
// Same group as the full contact form — all website leads land together.
const GROUP_ID = "group_mm13rdh1"
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type LeadPayload = {
  email?: unknown
  website?: unknown
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LeadPayload
    const website = getString(payload.website)

    // Honeypot — silently accept bots without creating an item.
    if (website.trim()) {
      return NextResponse.json({ success: true })
    }

    const email = getString(payload.email).trim()

    if (!email || !emailPattern.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required" },
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

    const query = `mutation ($boardId: ID!, $groupId: String!, $itemName: String!) {
      create_item (board_id: $boardId, group_id: $groupId, item_name: $itemName) {
        id
      }
    }`

    const variables = {
      boardId: BOARD_ID,
      groupId: GROUP_ID,
      itemName: email,
    }

    const response = await fetch(MONDAY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        "API-Version": "2024-10",
      },
      body: JSON.stringify({ query, variables }),
    })

    const raw = await response.text()

    let data
    try {
      data = JSON.parse(raw)
    } catch {
      return NextResponse.json(
        { error: "Invalid response from Monday.com" },
        { status: 502 }
      )
    }

    if (!response.ok || data.errors || data.error_message || data.error_code) {
      return NextResponse.json(
        {
          error: "Monday.com error",
          details: data.errors ?? data.error_message ?? data,
        },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, id: data.data.create_item.id })
  } catch (error) {
    console.error("Lead API error:", error)

    return NextResponse.json(
      { error: "Internal error", details: String(error) },
      { status: 500 }
    )
  }
}

function getString(value: unknown) {
  return typeof value === "string" ? value : ""
}
