import { NextResponse } from "next/server"

const MONDAY_API_URL = "https://api.monday.com/v2"
const BOARD_ID = "5978901066"
// Same group as the full contact form, all website leads land together.
const GROUP_ID = "group_mm13rdh1"
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type LeadPayload = {
  email?: unknown
  website?: unknown
  /** Module chips the visitor picked in the hero, in display order. */
  modules?: unknown
}

/** Hard cap so a tampered payload can't push an essay into the Monday note. */
const MAX_MODULES = 12
const MAX_MODULE_LENGTH = 40

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LeadPayload
    const website = getString(payload.website)

    // Honeypot, silently accept bots without creating an item.
    if (website.trim()) {
      return NextResponse.json({ success: true })
    }

    const email = getString(payload.email).trim()
    const modules = getModules(payload.modules)

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

    const itemId = data.data.create_item.id

    // The picked modules go on as a note rather than a column, so this stays
    // decoupled from the board's column setup. Best-effort: a failed note must
    // never cost us the lead itself.
    if (modules.length > 0) {
      await addModulesNote(itemId, modules, token)
    }

    return NextResponse.json({ success: true, id: itemId })
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

function getModules(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim().slice(0, MAX_MODULE_LENGTH))
    .filter(Boolean)
    .slice(0, MAX_MODULES)
}

async function addModulesNote(itemId: string, modules: string[], token: string) {
  const query = `mutation ($itemId: ID!, $body: String!) {
    create_update (item_id: $itemId, body: $body) {
      id
    }
  }`

  try {
    const response = await fetch(MONDAY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        "API-Version": "2024-10",
      },
      body: JSON.stringify({
        query,
        variables: {
          itemId,
          body: `Interested in: ${modules.join(", ")}`,
        },
      }),
    })
    if (!response.ok) {
      console.error("Lead modules note failed:", await response.text())
    }
  } catch (error) {
    console.error("Lead modules note error:", error)
  }
}
