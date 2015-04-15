#VIZIT
---
Make sure you move into a virtual environment before installing any of the below mentioned dependencies..

Get gulp and bower
```
npm install -g gulp bower
```
Install bower dependencies
```
bower install
```
Install node modules
```
npm install
```

Install pip modules
```
pip install -r pip_requirements.txt
```

Install Neo4j 
```
brew install neo4j
```

Start the Neo4j server by issuing the command
```
neo4j start
```

Clone the pyner repository from github
```
https://github.com/dat/pyner
```

Install it onto the virtual environment by issuing the command 

```
python setup.py install
```
---
####Development
[UPDATE] The application is now dependent on flask. To start the app run,
```
python run.py runserver
```

If documents are going to be imported, go into the corenlp-python folder and execute the following command in a separate terminal window:
```
java -mx1000m -cp stanford-ner.jar edu.stanford.nlp.ie.NERServer -loadClassifier classifiers/english.muc.7class.distsim.crf.ser.gz -port 8080 -outputFormat inlineXML &
```

Then goto http://127.0.0.1:8100/#/index/upload and select the input zip file. Uploading it will add the documents and entities to the Neo4j file.

Run server and load app (localhost:3000)
```
gulp serve
```
Run this command when adding/removing files in the src
```
gulp inject
```