import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
import { convertHourToMinutes } from "./utils/convert-hour-to-minutes";
import { convertMinutesToHour } from "./utils/convert-minutes-to-hour";

const app = express();
const prisma = new PrismaClient();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return response.json(games);
});

app.get("/games/:id/ads", async (request, response) => {
  const gameId: string = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      gameId: true,
      HourEnd: true,
      hourStart: true,
      id: true,
      name: true,
      useVoiceChannel: true,
      weekDays: true,
      yearsPlayng: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHour(ad.hourStart),
        HourEnd: convertMinutesToHour(ad.HourEnd),
      };
    })
  );
});

app.post("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;
  const body = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlayng: body.yearsPlayng,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHourToMinutes(body.hourStart),
      HourEnd: convertHourToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return response.json(ad);
});

app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;

  const discord = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return response.json(discord);
});

app.listen(port, () => {
  console.log(`[Startup - Server] App running on http://localhost:${port}/`);
});

console.log("ok!!!!");
