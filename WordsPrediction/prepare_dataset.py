import librosa
import os
import json

print("Bismillah")

datasetPath = "dataset"
jsonPath = "data.json"
samplesToConsider = 22050 #1 sec worth of sound(Samples in 1 sec (librosa))

def prepareDataset(datasetPath , jsonPath, n_mfcc = 13 , hop_length = 512 , n_fft = 2048 ):
    data ={
        "mappings" : [], # Words are mapped to indexes , On , Off etc
        "labels" : [], # at each index a mapped word . i.e. [0,0,1,1, .....]
        "MFCCs" : [],
        "files" : [] #file names i.e. dataset/down/1.wav etc
    }
    #loop through all the subdir of dataset
    for i,(dirpath, dirnames, filenames) in enumerate(os.walk(datasetPath)):
        #if it is not in root directory
        if(dirpath) is not datasetPath:
            category = dirpath.split('/')[-1]
            data["mappings"].append(category)
            print("Processing" , category )
            for f in filenames: #Loops all the files and extract MFCCs
                #Get File path of each audio file
                filePath = os.path.join(dirpath,f)

                #load audio file
                signal,sr = librosa.load(filePath)

                #Ensure the audio file isw at least 1 sec long
                if(len(signal)) >= samplesToConsider:
                    signal = signal[:samplesToConsider] #Enforce 1 sec Long audio file

                    MFCCs = librosa.feature.mfcc(signal, n_mfcc = n_mfcc , hop_length = hop_length , n_fft = n_fft )

                    data["labels"].append(i-1)
                    data["MFCCs"].append(MFCCs.T.tolist())
                    data["files"].append(filePath)
                    print(f" {filePath} : {i-1} ")

    #saving data in json file
    with open(jsonPath, "w") as fp:
        json.dump(data, fp, indent=4)

if __name__ == "__main__":
    prepareDataset(datasetPath, jsonPath)