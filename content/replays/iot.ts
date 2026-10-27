import type { ReplayContent } from "./types"

/**
 * Copy for the IoT replay (components/replays/iot-replay.tsx) on the IoT
 * module page.
 *
 * The machine and its parameters are real: CNC Drilling on the demo account
 * sends Vibration (mm/s), Beholder (bar) and Silo (PSI) along with its part
 * counter, and over the last month they read 1 to 5 mm/s, 5 to 10 bar and 30
 * to 50 PSI. The order B01-S60 is the one it was running on 26 October 2026.
 * The 4.5 mm/s limit is ours, set near the top of that range.
 *
 * The showcase pictures are real captures of the app.
 */

export type IotDemo = {
  machine: string
  connecting: string
  online: string
  lastMessage: string
  order: string
  /** Decimal separator for the ticking values. */
  decimal: "." | ","
  vibration: string
  tank: string
  silo: string
  counter: string
  counterUnit: string
  chartTitle: string
  limit: string
  alertTitle: string
  alertBody: string
}

export const iotReplay: Record<"en" | "da", ReplayContent<IotDemo>> = {
  en: {
    label:
      "Animation of CNC Drilling coming online: its live vibration, tank pressure and silo values tick in every second, the vibration chart draws as the readings arrive, the part counter counts up, and when vibration crosses the 4.5 mm/s limit the value turns amber and an alert goes to the shift leader.",
    demo: {
      machine: "CNC Drilling",
      connecting: "Connecting",
      online: "Online",
      lastMessage: "Last message 1 s ago",
      order: "Order B01-S60",
      decimal: ".",
      vibration: "Vibration",
      tank: "Tank",
      silo: "Silo",
      counter: "Counter",
      counterUnit: "parts",
      chartTitle: "Vibration, live",
      limit: "Limit 4.5",
      alertTitle: "Vibration over the limit",
      alertBody: "4.8 mm/s against a limit of 4.5. Sent to the shift leader at 16:48.",
    },
    showcaseTitle: "What a connected machine gives you",
    showcases: [
      {
        title: "Live values at the machine",
        body: "Whatever the machine or sensor reports, the operator panel can show it as it arrives. A value outside its range changes colour, so nobody has to read a number to see that something is off.",
        image: "/images/replays/iot/telemetry-numbers.webp",
        alt: "An operator panel tablet showing a machine online with temperature at 182 °C in amber and humidity at 41 %",
      },
      {
        title: "Every reading kept, not just the last one",
        body: "Readings are stored against the machine, so the same signal becomes a curve over hours or days. Next to the limit it was set up with, you can see when it started to drift.",
        image: "/images/replays/iot/telemetry-chart.webp",
        alt: "An operator panel tablet showing a machine's kWh over 48 hours as a step chart with a maximum line",
      },
      {
        title: "Part counts by the hour, straight from the machine",
        body: "The part counter comes in on the same connection. Hour by hour you can see the pace drop and pick up again, without anyone writing it down.",
        image: "/images/replays/iot/unit-per-hour.webp",
        alt: "The CNC Drilling unit per hour chart from the operator panel, from 06:00 to 14:00",
      },
    ],
  },
  da: {
    label:
      "Animation af CNC Drilling, der kommer online: vibration, tryk i beholderen og silo tikker ind hvert sekund, vibrationskurven tegnes, mens målingerne kommer, og tælleren tæller op. Da vibrationen går over grænsen på 4,5 mm/s, bliver værdien gul, og skiftlederen får en alarm.",
    demo: {
      machine: "CNC Drilling",
      connecting: "Forbinder",
      online: "Online",
      lastMessage: "Sidste besked for 1 s siden",
      order: "Ordre B01-S60",
      decimal: ",",
      vibration: "Vibration",
      tank: "Beholder",
      silo: "Silo",
      counter: "Tæller",
      counterUnit: "emner",
      chartTitle: "Vibration, live",
      limit: "Grænse 4,5",
      alertTitle: "Vibrationen er over grænsen",
      alertBody: "4,8 mm/s, og grænsen er 4,5. Skiftlederen fik besked kl. 16:48.",
    },
    showcaseTitle: "Det får I ud af en maskine, der er koblet på",
    showcases: [
      {
        title: "Liveværdier ved maskinen",
        body: "Det, maskinen eller sensoren melder, kan operatørpanelet vise, så snart det kommer. Ryger en værdi uden for sit område, skifter den farve. Så skal ingen læse et tal for at se, at noget er galt.",
        image: "/images/replays/iot/telemetry-numbers.webp",
        alt: "Et operatørpanel på en tablet med en maskine online, temperatur på 182 °C i gult og luftfugtighed på 41 %",
      },
      {
        title: "Alle målinger bliver gemt, ikke kun den sidste",
        body: "Målingerne bliver gemt på maskinen, så det samme signal bliver til en kurve over timer eller dage. Med grænsen ved siden af kan I se, hvornår det begyndte at skride.",
        image: "/images/replays/iot/telemetry-chart.webp",
        alt: "Et operatørpanel på en tablet med en maskines kWh over 48 timer og en linje for maksimum",
      },
      {
        title: "Emner pr. time, direkte fra maskinen",
        body: "Tælleren kommer ind på den samme forbindelse. Time for time kan I se tempoet falde og komme op igen, uden at nogen skriver det ned.",
        image: "/images/replays/iot/unit-per-hour.webp",
        alt: "Kurven over emner pr. time for CNC Drilling fra operatørpanelet, fra 06:00 til 14:00",
      },
    ],
  },
}
