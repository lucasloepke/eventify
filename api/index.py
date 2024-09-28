from flask import Flask
import google.generativeai as genai
import os
from config import GOOGLE_API_KEY

app = Flask(__name__)

genai.configure(api_key=GOOGLE_API_KEY)

@app.route("/api/python")
def image_to_text():
    model = genai.GenerativeModel("gemini-1.5-pro-latest")
    myfile = genai.upload_file("api/uploads/steelhacks.png")
    response = model.generate_content(
        [myfile, "\n\n", "Find and transcribe relevant event information. If an event cannot be found, return 'none'. If there are multiple events, put each on a new line."]
    )
    toics = model.generate_content(
        [response.text, "\n\n", "Turn this event into an ICS file. Respond in text so that I can save the response as a .ics"]
    )
    # ---------
    ics_content = toics.text  # Extract the text content for the ICS file
    # Define the file path where you want to save the .ics file
    ics_file_path = "api/uploads/event.ics"
    # Save the ICS content to a file
    with open(ics_file_path, "w") as ics_file:
        ics_file.write(ics_content)

    # ---------
    return response.text
