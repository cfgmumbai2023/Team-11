from youtube_transcript_api import YouTubeTranscriptApi
  
def transcribeAudio(link):
    return YouTubeTranscriptApi.get_transcript(link.split("?")[1][2:])