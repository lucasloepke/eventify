'use client'

import { useState } from 'react'
import { Camera, Mic, Github, Upload, FileText } from 'lucide-react'
import { Button } from "./button"
import { Input } from "./input"
import { Textarea } from "./textarea"

export default function LandingPage() {
  const [isRecording, setIsRecording] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await fetch('/api/python', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('File uploaded successfully:', data);
        } else {
          console.error('File upload failed.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
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
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200">
        <header className="bg-black text-white p-4 w-full text-center">
          <h1 className="text-2xl font-bold">eventify</h1>
        </header>
    

      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl text-center mb-4">
          <h2 className="text-3xl font-bold mb-2">eventify your calendar</h2>
          <p className="text-lg">
            . . .
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <div>
            <Input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button>
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" /> Upload
              </label>
            </Button>
          </div>
          <Button onClick={handleCameraAccess}>
            <Camera className="mr-2 h-4 w-4" /> Camera
          </Button>
          <Button onClick={handleVoiceRecording}>
            <Mic className="mr-2 h-4 w-4" /> {isRecording ? 'Stop' : 'Record'} Voice
          </Button>
        </div>

        <Textarea
          placeholder="Or type your event details here..."
          className="mt-4 w-full h-40 p-4 max-w-md rounded-lg shadow-lg"
        />
      </div>

      <footer className="bg-secondary text-secondary-foreground p-4 flex justify-center items-center">
        <a
          href="https://github.com/lucasloepke/eventify"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <Github className="mr-2 h-4 w-4" />
          <span>repository</span>
        </a>
      </footer>
    </main>
  )
}