import os
import speech_recognition as sr
from pydub import AudioSegment
import os
from youtube_transcript_api import YouTubeTranscriptApi
  
from pydub import AudioSegment
from pydub.silence import split_on_silence
command2mp3 = "ffmpeg -i videoplayback.mp4 ./speech.mp3"
command2wav = "ffmpeg -i speech.mp3 ./speech.wav"

# def transcribeAudio():
#     video = AudioSegment.from_file("vid.mp4", format="mp4")
#     audio = video.set_channels(1).set_frame_rate(16000).set_sample_width(2)
#     audio.export("audio.wav", format="wav")
#     r = sr.Recognizer()
#     print("i executed")
#     with sr.AudioFile("audio.wav") as source:
#         audio_text = r.record(source)
#     # Recognize the speech in the audio
#     text = r.recognize_google(audio_text, language='en-US')
#     return text


def transcribeAudio(link):
    return YouTubeTranscriptApi.get_transcript(link.split("?")[1][2:])