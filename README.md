<p align="center">
  <a href="https://nextjs-flask-starter.vercel.app/">
    <img src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" height="96">
    <h5 align="center">Eventify</h5>
  </a>
</p>

<p align="center">
  Transform the way you manage events with Eventify, a dynamic application that combines the power of Next.js and Flask with the cutting-edge Google Gemini API.
  <br>
  <span style="font-size: 12px;">Authors: Lucas Loepke, Vladimir Deianov, Conor Reger, Channdavel Kong</span>
</p>


<br/>

## Introduction

Eventify is a cutting-edge hybrid Next.js + Python application that redefines event management. Leveraging the seamless integration of Next.js for the frontend and Flask for the API backend, Eventify enables users to capture, upload, and manage event details like never before. Whether it's snapping a picture of an event pamphlet or recording a voice message, Eventify transforms your input into actionable calendar events.

## How It Works

The Python/Flask server is elegantly integrated into the Next.js app under `/api/`.

This integration is accomplished through [`next.config.js` rewrites](https://github.com/vercel/examples/blob/main/python/nextjs-flask/next.config.js), which direct any request to `/api/:path*` to the Flask API hosted in the `/api` folder.

- **Local Development:** When running locally, the Flask server listens on `127.0.0.1:5328`.
- **Production Deployment:** The Flask server operates as [Python serverless functions](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python) on Vercel, ensuring a smooth experience in production.

## Features

- **Capture and Upload:** Effortlessly upload images of events or pamphlets and transform your experience.
- **Voice Message Recording:** Record voice messages that convey event details, making it easy to capture everything without typing.
- **Calendar Integration:** Automatically add your uploaded images and recorded messages to your calendar, making event management a breeze.

## Authors' Emails
<span style="font-size: 12px;">lucasloepke@gmail.com, deyanovva@gmail.com,connor.reger@gmail.com, csk56@pitt.edu  .</span>

