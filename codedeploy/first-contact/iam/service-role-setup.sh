#!/bin/bash

rolename=CodeDeployServiceRole

aws iam create-role --role-name $rolename --assume-role-policy-document file://service-role-trust.json

aws iam attach-role-policy --role-name $rolename --policy-arn arn:aws:iam::aws:policy/service-role/AWSCodeDeployRole

