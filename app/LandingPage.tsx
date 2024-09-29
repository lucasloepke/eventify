'use client'

import { useState, useEffect } from 'react'
import { Camera, Mic, Github, Upload } from 'lucide-react'
import { Button } from "./button"
import { Input } from "./input"
import { Textarea } from "./textarea"

export default function LandingPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [icsContent, setIcsContent] = useState<string | null>(null)
  const [naturalLanguageResponse, setNaturalLanguageResponse] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/image', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setIcsContent(data.ics_content);
                setNaturalLanguageResponse(data.natural_language_response);
                
                // Create a Blob from the ICS content
                const blob = new Blob([data.ics_content], { type: 'text/calendar' });
                const url = window.URL.createObjectURL(blob);
                
                // Create a download link
                const a = document.createElement('a');
                a.href = url;
                a.download = 'event.ics';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            } else {
                console.error('File upload failed.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setIsLoading(false);
        }
    }
  };

  const handleCameraAccess = () => {
    // Handle camera access logic here
    console.log('Accessing camera')
  }

  const handleVoiceRecording = () => {
    setIsRecording(!isRecording)
    // Handle voice recording logic here
    console.log('Voice recording:', isRecording ? 'stopped' : 'started')
  }

  return (
<main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#04061f] via-[#132780] via-[#413c90] via-[#684391] to-[#a2578f]">


      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl text-white text-center mb-4">
          <h2 className="text-3xl font-medium mb-2">Eventify your calendar</h2>
          {isLoading ? (
            <p className="text-4xl">
              <span className="loading-dot">.</span>
              <span className="loading-dot">.</span>
              <span className="loading-dot">.</span>
            </p>
          ) : (
            <p className="text-4xl">
              . . .
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <div>
            <Input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button>
              <label htmlFor="file-upload" className="flex items-center cursor-pointer">
                <Upload className="mr-2 h-4 w-4" /> Upload
              </label>
            </Button>
          </div>
          <div>
            <Input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button>
              <label htmlFor="file-upload" className="flex items-center cursor-pointer">
                <Camera className="mr-2 h-4 w-4" /> Camera
              </label>
            </Button>
          </div>
          <Button onClick={handleVoiceRecording}>
            <Mic className="mr-2 h-4 w-4" /> {isRecording ? 'Stop' : 'Record'} Voice
          </Button>
        </div>

        <Textarea
          placeholder="Or paste your event details here..."
          className="mt-4 w-full h-40 p-4 max-w-md rounded-lg shadow-lg"
        />

        {naturalLanguageResponse && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Event Information:</h3>
            <p className="whitespace-pre-wrap">{naturalLanguageResponse}</p>
          </div>
        )}

      </div>

      <footer className="bg-secondary text-secondary-foreground p-4 flex justify-center items-center">
        <a
          href="https://github.com/lucasloepke/eventify"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-white hover:text-[#eed532] transition-all duration-300 ease-in-out transform hover:scale-110 hover:-translate-y-1"
        >
          <Github className="mr-2 h-4 w-4 text-white hover:text-[#eed532]" />
          <span>repository</span>
        </a>
      </footer>
    </main>
  )
}
