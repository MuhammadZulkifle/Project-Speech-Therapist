import json
import numpy as np
import tensorflow.keras as keras
from sklearn.model_selection import train_test_split

dataPath = "data.json"
savedPathModel = "model.h5"
EPOCHS = 40
learningRate = 0.0001
num_Keywords = 10

batchSize = 32
def loadData(dataPath):
    print("Loading Data...")
    with open(dataPath, "r") as fp:
        data  = json.load(fp)

    #Extract inputs and targets
    X = np.array(data["MFCCs"])
    Y = np.array(data["labels"])

    return X,Y

def getDataSplits(dataPath):
    #Load Dataset
    x,y = loadData(dataPath)

    #Split Test Train Dataset
    X_train , X_test , Y_train , Y_test = train_test_split(x,y,test_size = 0.1)
    X_train , X_validation , Y_train , Y_validation = train_test_split(X_train,Y_train,test_size = 0.1)

    #Converts inputs from 2D to 3D
    X_train = X_train[...,np.newaxis]
    X_validation = X_validation[...,np.newaxis]
    X_test = X_test[...,np.newaxis]

    return X_train, X_validation,X_test,Y_train,Y_validation,Y_test

    print("In Get data split ")

def build_model(inputShape, learningRate , error = "sparse_categorical_crossentropy"):
    print("Building Model")
    #Building Network
    model =  keras.Sequential()
    #Conv Layer 1
    model.add(keras.layers.Conv2D(64, (3,3), activation = "relu" , input_shape = inputShape, kernel_regularizer = keras.regularizers.L2(0.001)))
    model.add(keras.layers.BatchNormalization())
    model.add(keras.layers.MaxPool2D((2,2), strides = (2,2), padding ="same"))

    #Conv Layer 2
    model.add(keras.layers.Conv2D(32, (3,3), activation = "relu", kernel_regularizer = keras.regularizers.L2(0.001)))
    model.add(keras.layers.BatchNormalization())
    model.add(keras.layers.MaxPool2D((2,2), strides = (2,2), padding ="same"))
    
    #Conv Layer 3
    model.add(keras.layers.Conv2D(32, (2,2), activation = "relu", kernel_regularizer = keras.regularizers.L2(0.001)))
    model.add(keras.layers.BatchNormalization())
    model.add(keras.layers.MaxPool2D((2,2), strides = (2,2), padding ="same"))

    #flatten the output feed it into a dense layer
    model.add(keras.layers.Flatten())
    model.add(keras.layers.Dense(64, activation = "relu"))
    model.add(keras.layers.Dropout(0.3))

    #softmax classifier
    model.add(keras.layers.Dense(num_Keywords , activation = "softmax" ))

    #compiling the model
    optimizer = keras.optimizers.Adam(learning_rate = learningRate)
    model.compile(optimizer = optimizer , loss = error , metrics= ["accuracy"])

    #Printing the model
    model.summary()

    return model


def main():
    #load train,test, validation data 
    X_train,X_validation,X_test,Y_train,Y_validation,Y_test = getDataSplits(dataPath)

    #Build the CNN model
    inputShape = (X_train.shape[1],X_train.shape[2],X_train.shape[3]) # (segments , coefficient 13 , 1 )
    model = build_model(inputShape , learningRate)

    #Train  the model 
    model.fit(X_train, Y_train, epochs = EPOCHS , batch_size = batchSize ,
     validation_data = (X_validation, Y_validation) )

    #Evaluate the model
    test_error , test_accuracy = model.evaluate(X_test , Y_test)
    print("Test Error " , test_error , "Test Accuracy" , test_accuracy)

    #Save the model 
    model.save(savedPathModel)


if __name__ == "__main__":
    main()
