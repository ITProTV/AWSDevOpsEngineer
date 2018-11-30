#/bin/bash
region="us-east-1"
bucket_name="aws-codedeploy-$region"
script_path="/tmp/installer"

sudo yum update -y
sudo yum install ruby wget -y
wget https://$bucket_name.s3.amazonaws.com/latest/install -O $script_path
sudo chmod +x $script_path
sudo $script_path auto
sudo systemctl enable --now codedeploy-agent



