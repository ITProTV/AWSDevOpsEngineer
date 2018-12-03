#!/bin/bash

folder_name=./
filename=$(date +%y-%h-%d-%H-%M)-aggregate
bucket_name="itprodevopsbucket-nova"
prefix="reports"

python seeder.py
files=$(ls $folder_name/*.txt)
cat $files > /tmp/$filename
rm $folder_name/*.txt
aws s3 cp /tmp/$filename s3://$bucket_name/$prefix/$filename

