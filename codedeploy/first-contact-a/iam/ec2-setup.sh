#!/bin/bash

rolename=CodeDeploy-EC2-Instance-Profile

aws iam create-role --role-name $rolename \
	--assume-role-policy-document file://CodeDeploy-EC2-Trust.json

aws iam put-role-policy --role-name $rolename \ 
	--policy-name CodeDeploy-EC2-Permissions \
	--policy-document file://CodeDeploy-EC2-Permissions.json

aws iam create-instance-profile \
	--instance-profile-name $rolename

aws iam add-role-to-instance-profile \
	--instance-profile-name $rolename \
	--role-name $rolename
