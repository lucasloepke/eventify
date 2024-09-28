from flask import Flask
import google.generativeai as genai
import os

app = Flask(__name__)

api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

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

def voice_to_text():
    audio_file = request.file['audio']
    #note the expected file is in mp3 format!!!!!!!!!!!!!!!!!!
    audio_path = os.path.join("api/uploads", "recording.mp3")
    audio_file.save(audio_path);


    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio_data = recognizer.record(source)
        transcribed_text = recognizer.recognize_google(audio_data)  # Using Google's free Speech-to-Text

    # Use Generative AI to extract event information
    model = genai.GenerativeModel("gemini-1.5-pro-latest")
    toics = model.generate_content(
        [transcribed_text, "\n\n", "Turn this event into an ICS file. Respond in text so that I can save the response as a .ics"]
    )
    # ---------
    ics_content = toics.text  # Extract the text content for the ICS file
    # Define the file path where you want to save the .ics file
    ics_file_path = "event.ics"
    # Save the ICS content to a file
    with open(ics_file_path, "w") as ics_file:
        ics_file.write(ics_content)

    # ---------
    return response.text
