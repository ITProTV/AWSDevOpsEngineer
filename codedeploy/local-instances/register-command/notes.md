## Using the Register Command
- Step 1: Install and Configure the AWS CLI on the On-Premises Instance
  - Through yum, apt, or pip
  - Create an IAM User for the instance
    - Policy: 
```
	{
	  "Version": "2012-10-17",
	  "Statement" : [
	    {
	      "Effect" : "Allow",
	      "Action" : [
		"codedeploy:*",
		"iam:CreateAccessKey",
		"iam:CreateUser",
		"iam:DeleteAccessKey",
		"iam:DeleteUser",
		"iam:DeleteUserPolicy",
		"iam:ListAccessKeys",
		"iam:ListUserPolicies",
		"iam:PutUserPolicy",
		"iam:GetUser",
		"tag:GetTags",
		"tag:GetResources"
	      ],
	      "Resource" : "*"
	    },
	    {
	      "Effect" : "Allow",
	      "Action" : [
		"s3:Get*",
		"s3:List*"
	      ],
	      "Resource" : [
		"arn:aws:s3:::aws-codedeploy-us-east-2/*",
		"arn:aws:s3:::aws-codedeploy-us-east-1/*",
		"arn:aws:s3:::aws-codedeploy-us-west-1/*",
		"arn:aws:s3:::aws-codedeploy-us-west-2/*",
		"arn:aws:s3:::aws-codedeploy-ca-central-1/*",
		"arn:aws:s3:::aws-codedeploy-eu-west-1/*",
		"arn:aws:s3:::aws-codedeploy-eu-west-2/*",
		"arn:aws:s3:::aws-codedeploy-eu-west-3/*",
		"arn:aws:s3:::aws-codedeploy-eu-central-1/*",
		"arn:aws:s3:::aws-codedeploy-ap-northeast-1/*",
		"arn:aws:s3:::aws-codedeploy-ap-northeast-2/*",
		"arn:aws:s3:::aws-codedeploy-ap-southeast-1/*",
		"arn:aws:s3:::aws-codedeploy-ap-southeast-2/*",  
		"arn:aws:s3:::aws-codedeploy-ap-south-1/*",
		"arn:aws:s3:::aws-codedeploy-sa-east-1/*"
	      ]
	    }     
	  ]
	}
```

- Step 2: Call the register Command
  - Script:
  ```bash 
  aws deploy register --instance-name AssetTag1 \
  	--tags Key=Name,Value=CodeDeployDemo-OnPrem 
  ```
  - This will create a `codedeploy.onpremises.yml` file

- Step 3: Call the install Command
  - Script:
  ```bash 
    aws deploy install --override-config --config-file ./codedeploy.onpremises.yml \
    	--agent-installer s3://aws-codedeploy-us-east-1/latest/install
  ```  
  - Or move the codedeploy.onpremises.yml to /etc/codedeploy-agent/conf
- Step 4: Deploy Application Revisions to the On-Premises Instance 
- Step 5: Track Deployments to the On-Premises Instance

