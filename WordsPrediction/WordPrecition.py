import numpy as np
import tensorflow.keras as keras
import librosa
import pyaudio
import wave

modelPath = "model.h5"
NoSampleSpace = 22050

class _WordPrediction:

    model = None
    _mappings =  [
        "cat",
        "dog",
        "go",
        "left",
        "no",
        "one",
        "right",
        "six",
        "up",
        "wow"
    ]
    _instance = None

    def predict(self, filePath):
        #extract MFCCs
        MFCCs = self.preprocess(filePath) #(segments , coefficient)

        #covert 2D aray to 4D array
        MFCCs = MFCCs[np.newaxis , ..., np.newaxis ] #(samples, segments , coefficient, channels)

        preconditions = self.model.predict(MFCCs) #[0.1 , 0.6 , 0.2 , ...... ]
        predicted_index = np.argmax(preconditions)
        predicted_keyword = self._mappings[predicted_index]
        return predicted_keyword

    def preprocess(self, filePath, n_mffc =  13 , n_fft = 2048 , hop_length = 512):

        #loading audio file
        signal , sr = librosa.load(filePath)
        print( "Length is ", len(signal))

        if len(signal) > NoSampleSpace:
            signal = signal[:NoSampleSpace]

        #Extract Features
        MFCCs = librosa.feature.mfcc(signal, n_mfcc=n_mffc  , n_fft = n_fft, hop_length = hop_length)

        return MFCCs.T

def WordPrediction():
    if _WordPrediction._instance is None:
        _WordPrediction._instance = _WordPrediction()
        _WordPrediction.model =  keras.models.load_model(modelPath)
    return _WordPrediction._instance



def userInput(fileName):
    CHUNK = 1024
    FORMAT = pyaudio.paInt16
    CHANNELS = 2
    RATE = 44100
    RECORD_SECONDS = 1
    WAVE_OUTPUT_FILENAME = fileName

    p = pyaudio.PyAudio()

    stream = p.open(format=FORMAT,
                    channels=CHANNELS,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK)

    print("* recording")

    frames = []

    for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
        data = stream.read(CHUNK)
        frames.append(data)

    print("* done recording")

    stream.stop_stream()
    stream.close()
    p.terminate()

    wf = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(p.get_sample_size(FORMAT))
    wf.setframerate(RATE)
    wf.writeframes(b''.join(frames))
    wf.close()


if __name__ == "__main__":
    wp = WordPrediction()
    fileName1 = "test.wav"
    userInput(fileName1)
    keyword = wp.predict(fileName1)
    print("Predicted Word " , keyword)

    fileName2 = "test2.wav"
    userInput(fileName2)
    keyword2 = wp.predict(fileName2)
    print("Predicted Word " , keyword2)
    
    wp = WordPrediction()
    fileName3 = "test3.wav"
    userInput(fileName3)
    keyword3 = wp.predict(fileName3)
    print("Predicted Word " , keyword3)
    while(True):
        filef = "test3.wav"
        userInput(filef)
        key = wp.predict(filef)
        print("Predicted Word " , key)

    keyword4 = wp.predict("testData/Dog/D2.wav")
    print("Predicted Word " , keyword4)

   # keyword2 = wp.predict("test/up.wav")
   # print("Predicted Word " , keyword2)
    # fileName2 = "test2.wav"
    # userInput(fileName2)
    # keyword3 = wp.predict(fileName2)
    # print("Predicted Word " , keyword3)
    # fileName3 = "test3.wav"
    # userInput(fileName3)
    # keyword4 = wp.predict(fileName3)
    # print("Predicted Word " , keyword4)
