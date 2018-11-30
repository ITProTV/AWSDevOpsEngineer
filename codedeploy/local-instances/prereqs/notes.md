## Prerequisites

- Install the CodeDeploy Agent
  - See `agent-install.sh`
- Provision an IAM User
  - Policy:
  ```json
   {
    "Version": "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
          "autoscaling:*",
          "codedeploy:*",
          "ec2:*",
          "lambda:*",
          "ecs:*",
          "elasticloadbalancing:*",
          "iam:AddRoleToInstanceProfile",
          "iam:CreateInstanceProfile",
          "iam:CreateRole",
          "iam:DeleteInstanceProfile",
          "iam:DeleteRole",
          "iam:DeleteRolePolicy",
          "iam:GetInstanceProfile",
          "iam:GetRole",
          "iam:GetRolePolicy",
          "iam:ListInstanceProfilesForRole",
          "iam:ListRolePolicies",
          "iam:ListRoles",
          "iam:PassRole",
          "iam:PutRolePolicy",
          "iam:RemoveRoleFromInstanceProfile", 
          "s3:*"
        ],
        "Resource" : "*"
      }    
     ]
   }
  ``` 
- Create the Service Role (May already have this)
  - Policy: AWSCodeDeployRole
- Create the Instance Profile
  - Name: CodeDeployInstanceProfile
  - Policy: S3 ReadOnly (Create Policy - CodeDeploy-Instance-Permissions)
  ```json
   {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:Get*",
                "s3:List*"
            ],
            "Resource": "*"
        }
    ]
  } 
  ```

